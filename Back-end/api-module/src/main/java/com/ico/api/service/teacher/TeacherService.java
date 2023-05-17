package com.ico.api.service.teacher;

import com.ico.api.dto.user.TeacherSignUpRequestDto;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Teacher Service
 *
 * @author 강교철
 */
public interface TeacherService {

    /**
     * TeacherSignUpRequestDto 를 받아 교사 회원가입
     *
     * @param requestDto
     * @return id
     */
    Long signUp(TeacherSignUpRequestDto requestDto, MultipartFile file) throws IOException;

    /**
     * 휴대폰 인증
     *
     * @param phoneNum
     * @return randomCode
     */
    String certifiedPhoneNum(String phoneNum);

}
