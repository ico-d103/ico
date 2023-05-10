package com.ico.api.service.teacher;

import com.ico.api.dto.user.TeacherSignUpRequestDto;
import com.ico.api.s3.S3Uploader;
import com.ico.core.code.Role;
import com.ico.core.entity.Certification;
import com.ico.core.entity.Teacher;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.CertificationRepository;
import com.ico.core.repository.StudentRepository;
import com.ico.core.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Teacher ServiceImpl
 *
 * @author 강교철
 * @author 서재건
 */
@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final CertificationRepository certificationRepository;
    private final S3Uploader s3Uploader;

    @Override
    @Transactional
    public Long signUp(TeacherSignUpRequestDto requestDto, MultipartFile file) throws IOException {
        // 교사 회원가입
        Teacher teacher = Teacher.builder()
                .identity(requestDto.getIdentity())
                .password(requestDto.getPassword())
                .name(requestDto.getName())
                .isAssigned(false)
                .role(Role.TEACHER)
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
        if (!file.isEmpty()) {
            String image = s3Uploader.upload(file, "certification");
            Certification certification = Certification.builder()
                    .teacher(teacher)
                    .image(image)
                    .build();
            certificationRepository.save(certification);
        }
        else {
            throw new CustomException(ErrorCode.NOT_FOUND_IMAGE);
        }

        return teacher.getId();
    }

    @Override
    public void certifiedPhoneNum(String phoneNum) {
//        TODO : PhoneNum 인증할 때 사용할 것
//        String api_key = "NCSCQN2HADECWPGN";
//        String api_secret = "XWRCSV8OFGHBAUQ8NOGUTF2VXKYB8ZCV";
//        Message coolsms = new Message(api_key, api_secret);       // 여기 오류
//
//        Random rand  = new Random();
//        String numStr = "";
//        for(int i=0; i<4; i++) {
//            String ran = Integer.toString(rand.nextInt(10));
//            numStr += ran;
//        }
//
//        // 4 params(to, from, type, text) are mandatory. must be filled
//        HashMap<String, String> params = new HashMap<String, String>();
//        params.put("to", phoneNum);    // 수신전화번호
//        params.put("from", "01037822170");    // 발신전화번호. 테스트시에는 발신,수신 둘다 본인 번호로 하면 됨
//        params.put("type", "SMS");
//        params.put("text", "아이코 휴대폰인증 테스트 메시지 : 인증번호는 [" + numStr + "] 입니다.");
//
//        try {
//            coolsms.send(params);         // 여기도 오류
//        } catch (Exception e) {
//            System.out.println(e.getMessage());
//        }
//        네이버로 다시 구현하기
    }
}
