package com.ico.api.controller;

import com.ico.api.dto.coolsms.PhoneNumReqDto;
import com.ico.api.dto.teacher.TeacherResDto;
import com.ico.api.dto.user.TeacherSignUpRequestDto;
import com.ico.api.service.CoolSMSService;
import com.ico.api.service.teacher.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
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
    private final CoolSMSService smsService;

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

    /**
     * 휴대폰 인증
     * @param dto
     * @return ok
     */
    @PostMapping("/phone")
    @ResponseBody
    public ResponseEntity<?> certifiedPhone(@Valid @RequestBody PhoneNumReqDto dto) {
        return new ResponseEntity<>(smsService.certifiedPhoneNum(dto.getPhoneNum()), HttpStatus.OK);
    }

    /**
     * 회원가입 후 교사인증서 반려 당했을 때 or 다시 교사인증서를 보낼 때
     * @param request
     * @param file
     * @return ok
     */
    @PostMapping(value = "/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<HttpStatus> certifiedImage(HttpServletRequest request, @RequestPart("file") MultipartFile file) {
        teacherService.certifiedImage(request, file);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 교사가 학생의 비밀번호를 초기화
     * @param studentId
     * @param request
     * @return random password
     */
    @PutMapping("/teacher/{studentId}")     // token 이 있을 때 3번째에 teacher 이어야지 role 통과 가능
    public ResponseEntity<String> resetStudentPassword(@PathVariable Long studentId, HttpServletRequest request) {
        return ResponseEntity.ok(teacherService.resetStudentPassword(studentId, request));
    }

    /**
     * 교사가 자신의 아이디와 휴대폰 번호 조회
     * @param request
     * @return
     */
    @GetMapping("/teacher")
    public ResponseEntity<TeacherResDto> getTeacher(HttpServletRequest request) {
        return ResponseEntity.ok(teacherService.getTeacher(request));
    }

    /**
     * 교사 자신의 비밀번호 초기화
     * @param dto
     * @return ok
     */
    @PostMapping("/reset-pw")
    public ResponseEntity<String> resetTeacherPassword(@Valid @RequestBody PhoneNumReqDto dto) {
        return ResponseEntity.ok(smsService.findPassword(dto.getPhoneNum()));
    }

    /**
     * 교사 휴대폰 번호 수정 시 인증번호 받기
     * @param request
     * @param dto
     * @return
     */
    @PostMapping("/teacher/phone-num")
    public ResponseEntity<String> updateCheckPhoneNum(HttpServletRequest request, @Valid @RequestBody PhoneNumReqDto dto) {
        return ResponseEntity.ok(teacherService.updateCheckPhoneNum(request, dto));
    }

    /**
     * 인증됐다면 휴대폰 번호 업데이트
     * @param request
     * @param dto
     * @return
     */
    @PutMapping("/teacher/phone-num")
    public ResponseEntity<HttpStatus> updatePhoneNum(HttpServletRequest request, @Valid @RequestBody PhoneNumReqDto dto) {
        teacherService.updatePhoneNum(request, dto);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
