package com.ico.api.service;

import com.ico.api.dto.AccountDto;
import com.ico.api.dto.TeacherSignUpRequestDto;

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
     * @return
     * @throws Exception
     */
    public Long signUp(TeacherSignUpRequestDto requestDto) throws Exception;

    /**
     * 휴대폰 인증
     *
     * @param phoneNum
     */
    public void certifiedPhoneNum(String phoneNum);
}
