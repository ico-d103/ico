package com.ico.api.controller;

import com.ico.api.dto.AccountDto;
import com.ico.api.dto.TeacherSignUpRequestDto;
import com.ico.api.service.TeacherService;
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
 * Teacher Controller
 *
 * @author 강교철, 변윤경
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


}
