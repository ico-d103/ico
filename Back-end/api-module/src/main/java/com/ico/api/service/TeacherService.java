package com.ico.api.service;

import com.ico.api.dto.StudentListResDto;
import com.ico.api.dto.TeacherSignUpRequestDto;

import java.util.List;

/**
 * Teacher Service
 *
 * @author 강교철
 * @author 서재건
 */
public interface TeacherService {

    /**
     * TeacherSignUpRequestDto 를 받아 교사 회원가입
     *
     * @param requestDto
     * @return
     */
    public Long signUp(TeacherSignUpRequestDto requestDto);

    /**
     * 휴대폰 인증
     *
     * @param phoneNum
     */
    public void certifiedPhoneNum(String phoneNum);

    /**
     * 우리 반 학생 목록 조회
     *
     * @return
     */
    List<StudentListResDto> findAllStudent();
}
