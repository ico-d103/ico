package com.ico.api.controller;

import com.ico.api.dto.user.TeacherSignUpRequestDto;
import com.ico.api.service.teacher.TeacherService;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


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
    public ResponseEntity<HttpStatus> teacherSignUp(@Valid @RequestPart("dto")  TeacherSignUpRequestDto requestDto,
                                                    @RequestPart("file") MultipartFile file) throws IOException {
        teacherService.signUp(requestDto, file);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("/phone")
    @ResponseBody
    public ResponseEntity<?> certifiedPhone(@RequestBody Map<String, String> req) {
        return new ResponseEntity<>(teacherService.certifiedPhoneNum(req.get("phoneNum")), HttpStatus.OK);
    }
}
