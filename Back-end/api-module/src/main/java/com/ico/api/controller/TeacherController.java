package com.ico.api.controller;

import com.ico.api.dto.user.TeacherSignUpRequestDto;
import com.ico.api.service.teacher.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


/**
 * Teacher Controller
 *
 * @author 강교철
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
     */
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<HttpStatus> teacherSignUp(@RequestBody TeacherSignUpRequestDto requestDto,
                                                    @RequestParam("file") MultipartFile file) throws IOException {
        teacherService.signUp(requestDto, file);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
