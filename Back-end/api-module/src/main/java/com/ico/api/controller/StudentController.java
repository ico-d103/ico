package com.ico.api.controller;

import com.ico.api.dto.nation.CreditScoreReqDto;
import com.ico.api.dto.student.StudentAllResDto;
import com.ico.api.dto.student.StudentListResDto;
import com.ico.api.dto.student.StudentMyPageResDto;
import com.ico.api.dto.student.StudentResDto;
import com.ico.api.dto.user.AccountDto;
import com.ico.api.dto.user.StudentSignUpRequestDto;
import com.ico.api.service.student.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;

/**
 * Student Controller
 *
 * @author 강교철
 * @author 서재건
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
    public ResponseEntity<HttpStatus> studentSignUp(@Valid @RequestBody StudentSignUpRequestDto requestDto) {
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
    public ResponseEntity<HttpStatus> teacherUpdateAccount(@PathVariable Long studentId, @Valid @RequestBody AccountDto accountDto) {
        studentService.teacherUpdateAccount(studentId, accountDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 우리 반 학생 목록 조회
     *
     * @return 학생 목록
     */
    @GetMapping("/teacher")
    public ResponseEntity<List<StudentListResDto>> findAllStudent(HttpServletRequest request) {
        return ResponseEntity.ok(studentService.findAllStudent(request));
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

    /**
     * 학생 내 정보 조회
     *
     * @param request
     * @return
     */
    @GetMapping("/student/my-page")
    public ResponseEntity<StudentMyPageResDto> findStudentMyPage(HttpServletRequest request) {
        return ResponseEntity.ok(studentService.findStudentMyPage(request));
    }

    /**
     * 신용등급 평점 부여
     *
     * @param studentId
     * @param request
     * @return
     */
    @PostMapping("/teacher/{studentId}/credit-score")
    public ResponseEntity<HttpStatus> postCreditScore(@PathVariable Long studentId, @Valid @RequestBody CreditScoreReqDto dto, HttpServletRequest request) {
        studentService.postCreditScore(studentId, dto, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 학생의 계좌 정지
     *
     * @param studentId
     * @return
     */
    @PutMapping("/teacher/{studentId}/suspend-account")
    public ResponseEntity<HttpStatus> suspendAccount(@PathVariable Long studentId) {
        studentService.suspendAccount(studentId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 학생의 계좌 정지 해제
     *
     * @param studentId
     * @return
     */
    @PutMapping("/teacher/{studentId}/release-account")
    public ResponseEntity<HttpStatus> releaseAccount(@PathVariable Long studentId) {
        studentService.releaseAccount(studentId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 학생의 반 친구 목록 조회
     *
     * @return
     */
    @GetMapping("/student")
    public ResponseEntity<List<StudentAllResDto>> findListStudent(HttpServletRequest request) {
        return ResponseEntity.ok(studentService.findListStudent(request));
    }

    /**
     * 학생의 신용등급 조회
     *
     * @param request
     * @return
     */
    @GetMapping("/student/credit-rating")
    public ResponseEntity<Byte> findStudentCreditRating(HttpServletRequest request) {
        return ResponseEntity.ok(studentService.findStudentCreditRating(request));
    }

    /**
     * 신용등급 평점 일괄 부여
     *
     * @param dto
     * @param request
     * @return
     */
    @PostMapping("/teacher/credit-score")
    public ResponseEntity<HttpStatus> postAllCreditScore(@Valid @RequestBody CreditScoreReqDto dto, HttpServletRequest request) {
        studentService.postAllCreditScore(dto, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 학생의 자산을 조회
     * @param request
     * @return
     */
    @GetMapping("/account")
    public ResponseEntity<Map<String, String>> getAccount(HttpServletRequest request) {
        return ResponseEntity.ok(studentService.findAccount(request));
    }
}
