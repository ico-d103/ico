package com.ico.api.service.teacher;

import com.ico.api.dto.user.TeacherSignUpRequestDto;
import com.ico.api.service.S3UploadService;
import com.ico.core.code.Role;
import com.ico.core.code.Status;
import com.ico.core.entity.Certification;
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
            String image = s3.upload(file);
            log.info(image);
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
}
