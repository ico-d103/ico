package com.ico.api.service.teacher;

import com.ico.api.dto.user.TeacherSignUpRequestDto;
import com.ico.api.service.S3UploadService;
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
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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

    @Override
    @Transactional
    public Long signUp(TeacherSignUpRequestDto requestDto, MultipartFile file) {
        // 교사 회원가입
        Teacher teacher = Teacher.builder()
                .identity(requestDto.getIdentity())
                .password(requestDto.getPassword())
                .name(requestDto.getName())
                .status(Status.WAITING)
                .role(Role.TEACHER)
                .phoneNum(requestDto.getPhoneNum())
                .build();

        if (teacherRepository.findByIdentity(requestDto.getIdentity()).isPresent()
                || studentRepository.findByIdentity(requestDto.getIdentity()).isPresent()) {
            throw new CustomException(ErrorCode.DUPLICATED_ID);
        }

        if (!requestDto.getPassword().equals(requestDto.getCheckedPassword())) {
            throw new CustomException(ErrorCode.PASSWORD_WRONG);
        }

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

        return teacher.getId();
    }

    @Value("${coolsms.apiKey}")
    private String apiKey;

    @Value("${coolsms.apiSecret}")
    private String apiSecret;

    @Value("${coolsms.fromPhoneNum}")
    private String fromPhoneNum;

    @Override
    public String certifiedPhoneNum(String phoneNum) {
        // 휴대폰 번호가 입력 되지않았을 때 에러(null 로 처리하면 coolsms에 에러 빼앗김)
        if (phoneNum.isBlank()) {
            throw new CustomException(ErrorCode.NOT_FOUND_PHONE_NUMBER);
        }
        // 하이픈이 있을 때와 휴대폰 번호 자리가 11개가 넘을 때 에러
        if (phoneNum.contains("-") || phoneNum.length() > 11) {
            throw new CustomException(ErrorCode.WRONG_PHONE_NUMBER);
        }
        // 인증번호 생성 및 메시지에 포함
        String randomNum = String.format("%06d", new Random().nextInt(999999));
        log.info(phoneNum);
        Message message = new Message();
        message.setFrom(fromPhoneNum);
        message.setTo(phoneNum);
        message.setText("[아이코 인증번호]\n입력하셔야할 인증번호는 [" + randomNum + "] 입니다.");

        // 메세지 전송
        final DefaultMessageService messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
        messageService.sendOne(new SingleMessageSendingRequest(message));

        return randomNum;
    }

    @Override
    @Transactional
    public void certifiedImage(HttpServletRequest request, MultipartFile file) {
        String token = jwtTokenProvider.parseJwt(request);
        Long teacherId = jwtTokenProvider.getId(token);
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
            throw new CustomException(ErrorCode.NOT_EQUAL_NATION);
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
}
