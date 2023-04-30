package com.ico.api.service;

import com.ico.api.dto.TeacherSignUpRequestDto;

public interface TeacherService {

    public Long signUp(TeacherSignUpRequestDto requestDto) throws Exception;
    public void certifiedPhoneNum(String phoneNum);
}
