package com.ico.api.service.teacher;

import com.ico.api.dto.coolsms.PhoneNumAndCodeReqDto;
import com.ico.api.dto.coolsms.PhoneNumReqDto;
import com.ico.api.dto.teacher.TeacherResDto;
import com.ico.api.dto.user.TeacherSignUpRequestDto;
import com.ico.api.service.CoolSMSService;
import com.ico.api.service.S3UploadService;
import com.ico.api.service.VerificationCodeService;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.code.Password;
import com.ico.core.code.Role;
import com.ico.core.code.Status;
import com.ico.core.entity.Certification;
import com.ico.core.entity.Student;
import com.ico.core.entity.Teacher;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.CertificationRepository;
import com.ico.core.repository.StudentRepository;
import com.ico.core.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;
import java.util.Random;

/**
 * Teacher ServiceImpl
 *
 * @author 강교철
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final CertificationRepository certificationRepository;
    private final S3UploadService s3;
    private final CoolSMSService smsService;
    private final VerificationCodeService codeService;

    @Override
    @Transactional
    public Long signUp(TeacherSignUpRequestDto requestDto, MultipartFile file) {
        // 아이디 중복 체크
        if (teacherRepository.findByIdentity(requestDto.getIdentity()).isPresent()
                || studentRepository.findByIdentity(requestDto.getIdentity()).isPresent()) {
            throw new CustomException(ErrorCode.DUPLICATED_ID);
        }
        // 비밀번호와 다시 입력한 비밀번호 일치 여부 체크
        if (!requestDto.getPassword().equals(requestDto.getCheckedPassword())) {
            throw new CustomException(ErrorCode.PASSWORD_WRONG);
        }
        // 핸드폰 번호 중복 체크
        if (teacherRepository.existsByPhoneNum(requestDto.getPhoneNum())) {
            throw new CustomException(ErrorCode.DUPLICATED_PHONE_NUM);
        }
        // 교사 회원가입
        Teacher teacher = Teacher.builder()
                .identity(requestDto.getIdentity())
                .password(requestDto.getPassword())
                .name(requestDto.getName())
                .status(Status.WAITING)
                .role(Role.TEACHER)
                .phoneNum(requestDto.getPhoneNum())
                .pwStatus(Password.OK)
                .build();

        teacher.encodeTeacherPassword(passwordEncoder);
        teacherRepository.save(teacher);

        // 교사 인증서 저장
        if (file.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_IMAGE);
        }
        String image = s3.upload(file);
        Certification certification = Certification.builder()
                .teacher(teacher)
                .image(image)
                .build();
        certificationRepository.save(certification);

        // 교사 인증서 저장 후 관리자에게 문자를 보내 빠르게 인증할 수 있도록 하기
        smsService.informAdmin();

        return teacher.getId();
    }

    @Override
    @Transactional
    public void certifiedImage(HttpServletRequest request, MultipartFile file) {
        Long teacherId = jwtTokenProvider.getId(jwtTokenProvider.parseJwt(request));
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Optional<Certification> optionalCertification = certificationRepository.findByTeacherId(teacherId);
        // 교사인증서를 보낸 사람이 요청하면 전에 보낸 교사인증서를 삭제해줌
        if (optionalCertification.isPresent()) {
            // S3 서버에서 파일 삭제
            s3.deleteFile(optionalCertification.get().getImage());

            // 승인 상태 변경
            teacher.setStatus(Status.WAITING);
            teacherRepository.save(teacher);

            // Certification 삭제
            certificationRepository.delete(optionalCertification.get());
        }
        // 교사 인증서 저장
        if (file.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_IMAGE);
        }
        String image = s3.upload(file);
        Certification certification = Certification.builder()
                .teacher(teacher)
                .image(image)
                .build();
        certificationRepository.save(certification);
    }

    @Override
    public String resetStudentPassword(Long studentId, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        // 같은 반의 학생인지 체크
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        boolean isNation = jwtTokenProvider.getNation(token).equals(student.getNation().getId());
        if (!isNation) {
            throw new CustomException(ErrorCode.NOT_EQUAL_NATION_TEACHER_STUDENT);
        }
        // 8자리의 난수 코드 생성
        String randomNum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!";
        StringBuilder pwBuilder = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 8; i++) {
            int digit = random.nextInt(randomNum.length());
            pwBuilder.append(randomNum.charAt(digit));
        }
        String password = pwBuilder.toString();
        // 학생의 패스워드 수정
        student.setPassword(password);
        // 암호화
        student.encodeStudentPassword(passwordEncoder);
        student.setPwStatus(Password.RESET);
        studentRepository.save(student);

        return password;
    }

    @Override
    public TeacherResDto getTeacher(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Teacher teacher = teacherRepository.findById(jwtTokenProvider.getId(token))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        return TeacherResDto.builder()
                .identity(teacher.getIdentity())
                .phoneNum(teacher.getPhoneNum())
                .build();
    }

    @Override
    public String updateCheckPhoneNum(HttpServletRequest request, PhoneNumReqDto dto) {
        Long teacherId = jwtTokenProvider.getId(jwtTokenProvider.parseJwt(request));
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        // 전에 있던 휴대폰 번호와 동일할 때
        if (teacher.getPhoneNum().equals(dto.getPhoneNum())) {
            throw new CustomException(ErrorCode.DUPLICATED_PHONE_NUM);
        }
        return smsService.certifiedPhoneNum(dto.getPhoneNum());
    }

    @Override
    public void updatePhoneNum(HttpServletRequest request, PhoneNumReqDto dto) {
        // 핸드폰 번호 중복 체크
        if (teacherRepository.existsByPhoneNum(dto.getPhoneNum())) {
            throw new CustomException(ErrorCode.DUPLICATED_PHONE_NUM);
        }

        Long teacherId = jwtTokenProvider.getId(jwtTokenProvider.parseJwt(request));
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        teacher.setPhoneNum(dto.getPhoneNum());
        teacherRepository.save(teacher);
    }

    @Override
    public String getTeacherId(String phoneNum) {
        Teacher teacher = teacherRepository.findByPhoneNum(phoneNum)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        return teacher.getIdentity();
    }

    @Override
    public boolean verificationCode(PhoneNumAndCodeReqDto dto) {
        String savedCode = codeService.getVerificationCode(dto.getPhoneNum());
        return savedCode != null && savedCode.equals(dto.getCode());
    }
}
