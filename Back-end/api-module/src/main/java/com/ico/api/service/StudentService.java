package com.ico.api.service;

import com.ico.api.dto.AccountDto;
import com.ico.api.dto.StudentSignUpRequestDto;

/**
 * Student Service
 *
 * @author 강교철
 */
public interface StudentService {

    /**
     * StudentSignUpRequestDto 를 받아 학생 회원가입
     *
     * @param requestDto
     * @return student.getId()
     */
    public Long signUp(StudentSignUpRequestDto requestDto);

    public void updateAccount(Long id, AccountDto accountDto);
}
