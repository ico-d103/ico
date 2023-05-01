package com.ico.api.controller;

import com.ico.api.dto.TeacherSignUpRequestDto;
import com.ico.api.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TeacherController {

    private final TeacherService teacherService;

    @PostMapping("/teacher")
    public ResponseEntity<?> teacherSignUp(@RequestBody TeacherSignUpRequestDto requestDto) throws Exception {
        return new ResponseEntity<>(teacherService.signUp(requestDto), HttpStatus.OK);
    }
}
