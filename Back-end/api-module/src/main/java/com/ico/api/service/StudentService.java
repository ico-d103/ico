package com.ico.api.service;

import com.ico.api.dto.AccountDto;
import com.ico.api.dto.StudentListResDto;
import com.ico.api.dto.StudentResDto;
import com.ico.api.dto.StudentSignUpRequestDto;

import java.util.List;

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

    public void teacherUpdateAccount(Long id, AccountDto accountDto);

    /**
     * 우리 반 학생 목록 조회
     *
     * @return
     */
    List<StudentListResDto> findAllStudent();

    /**
     * 학생 상세보기 조회
     *
     * @return
     */
    StudentResDto findStudent(Long studentId);

}
