package com.ico.api.service;

import com.ico.api.dto.StudentSignUpRequestDto;

public interface StudentService {

    public Long signUp(StudentSignUpRequestDto requestDto) throws Exception;

}
