package com.ico.api.controller;

import com.ico.api.dto.StudentSignUpRequestDto;
import com.ico.api.service.StudentService;
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
public class StudentController {

    private final StudentService studentService;

    @PostMapping("/student")
    public ResponseEntity<?> studentSignUp(@RequestBody StudentSignUpRequestDto requestDto) throws Exception {

        return new ResponseEntity<>(studentService.signUp(requestDto), HttpStatus.OK);
    }
}
