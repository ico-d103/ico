package com.ico.api.controller;

import com.ico.api.dto.StudentListResDto;
import com.ico.api.dto.StudentResDto;
import com.ico.api.dto.TeacherSignUpRequestDto;
import com.ico.api.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


/**
 * Teacher Controller
 *
 * @author 강교철
 * @author 변윤경
 * @author 서재건
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/teacher")
public class TeacherController {

    private final TeacherService teacherService;

    /**
     * 교사 회원가입
     *
     * @param requestDto
     * @return id
     * @throws Exception
     */
    @PostMapping
    public ResponseEntity<?> teacherSignUp(@RequestBody TeacherSignUpRequestDto requestDto) throws Exception {
        teacherService.signUp(requestDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 우리 반 학생 목록 조회
     *
     * @return 학생 목록
     */
    @GetMapping("/nation")
    public ResponseEntity<List<StudentListResDto>> findAllStudent() {
        return ResponseEntity.ok(teacherService.findAllStudent());
    }

    /**
     * 학생 상세보기 조회
     *
     * @param studentId
     * @return
     */
    @GetMapping("/nation/{studentId}")
    public ResponseEntity<StudentResDto> findStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(teacherService.findStudent(studentId));
    }

}
