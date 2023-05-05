package com.ico.api.controller;

import com.ico.api.dto.AccountDto;
import com.ico.api.dto.StudentListResDto;
import com.ico.api.dto.StudentResDto;
import com.ico.api.dto.StudentSignUpRequestDto;
import com.ico.api.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

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

    /**
     * 우리 반 학생 목록 조회
     *
     * @return 학생 목록
     */
    @GetMapping("/teacher")
    public ResponseEntity<List<StudentListResDto>> findAllStudent() {
        return ResponseEntity.ok(studentService.findAllStudent());
    }

    /**
     * 학생 상세보기 조회
     *
     * @param studentId
     * @return
     */
    @GetMapping("/teacher/{studentId}")
    public ResponseEntity<StudentResDto> findStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentService.findStudent(studentId));
    }

}
