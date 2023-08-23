package com.ico.api.service;

import com.ico.core.code.Password;
import com.ico.core.entity.Teacher;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
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

import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 문자 관련 서비스
 *
 * @author 강교철
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class CoolSMSService {

    private final TeacherRepository teacherRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${coolsms.apiKey}")
    private String apiKey;

    @Value("${coolsms.apiSecret}")
    private String apiSecret;

    @Value("${coolsms.fromPhoneNum}")
    private String fromPhoneNum;

    /**
     * 휴대폰 인증
     *
     * @param phoneNum
     * @return randomCode
     */
    public String certifiedPhoneNum(String phoneNum) {
        // 휴대폰 번호 유효성 검사
        validationPhoneNum(phoneNum);
        // 인증번호 생성 및 메시지에 포함
        String randomNum = String.format("%06d", new Random().nextInt(999999));
        Message message = createMessage(phoneNum);
        message.setText("[아이코 인증번호]\n입력하셔야할 인증번호는 [" + randomNum + "] 입니다.");

        // 메세지 전송
        sendMessage(message);

        return randomNum;
    }

    /**
     * 교사가 자신의 비밀번호 초기화
     * @param phoneNum
     * @return password
     */
    @Transactional
    public String findPassword(String phoneNum) {
        // 휴대폰 번호 유효성 검사
        validationPhoneNum(phoneNum);

        Teacher teacher = teacherRepository.findByPhoneNum(phoneNum)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEACHER_PHONE_NUMBER));

        Message message = createMessage(phoneNum);
        String password = randomPassword();
        message.setText("[아이코]\n변경된 비밀번호는 [" + password + "] 입니다.");

        // 메세지 전송
        sendMessage(message);

        teacher.setPassword(password);
        teacher.encodeTeacherPassword(passwordEncoder);
        // teacher 상태 바꾸기
        teacher.setPwStatus(Password.RESET);
        teacherRepository.save(teacher);

        return password;
    }

    /**
     * 휴대폰 번호 유효성 검사
     * @param phoneNum
     */
    public void validationPhoneNum(String phoneNum) {
        // 휴대폰 번호가 입력 되지않았을 때 에러(null 로 처리하면 coolsms에 에러 빼앗김)
        if (phoneNum.isBlank()) {
            throw new CustomException(ErrorCode.NOT_FOUND_PHONE_NUMBER);
        }
        // 하이픈이 있을 때와 휴대폰 번호 자리가 11개가 넘을 때 에러(정규식)
        Pattern pattern = Pattern.compile("^(?=.*-)|(?=.{12,})");
        Matcher matcher = pattern.matcher(phoneNum);
        if (matcher.find()) {
            throw new CustomException(ErrorCode.WRONG_PHONE_NUMBER);
        }
    }

    /**
     * 메세지 전송
     * @param message
     */
    public void sendMessage(Message message) {
        final DefaultMessageService messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
        messageService.sendOne(new SingleMessageSendingRequest(message));
    }

    /**
     * 랜덤 비밀번호 생성
     * @return
     */
    public String randomPassword() {
        // 8자리의 난수 코드 생성
        String randomNum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!";
        StringBuilder pwBuilder = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 8; i++) {
            int digit = random.nextInt(randomNum.length());
            pwBuilder.append(randomNum.charAt(digit));
        }
        return pwBuilder.toString();
    }

    /**
     * 메세지 생성 및 휴대폰 번호까지 넣기
     * @param phoneNum
     * @return
     */
    public Message createMessage(String phoneNum) {
        Message message = new Message();
        message.setFrom(fromPhoneNum);
        message.setTo(phoneNum);

        return message;
    }
}
