package com.ico.api.controller;

import com.ico.api.dto.AccountDto;
import com.ico.api.dto.StudentSignUpRequestDto;
import com.ico.api.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * Student Controller
 *
 * @author 강교철
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/student")
public class StudentController {

    private final StudentService studentService;

    /**
     * 학생 회원가입
     *
     * @param requestDto
     * @return id
     * @throws Exception
     */
    @PostMapping
    public ResponseEntity<?> studentSignUp(@RequestBody StudentSignUpRequestDto requestDto) throws Exception {
        studentService.signUp(requestDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 교사의 학생의 계좌의 잔액 관리(지급/차감)
     *
     * @param studentId 학생 idx
     * @param accountDto 금액, 사유
     * @return status
     */
    @PostMapping("/teacher/{studentId}/account")
    public ResponseEntity<HttpStatus> teacherUpdateAccount(@PathVariable Long studentId, @Valid @RequestBody AccountDto accountDto){
        studentService.teacherUpdateAccount(studentId, accountDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
