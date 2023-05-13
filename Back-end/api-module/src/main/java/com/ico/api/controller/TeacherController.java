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

    // TODO : 남은 횟수 보기 위해
    int cnt = 11;

    @PostMapping("/phone")
    @ResponseBody
    public ResponseEntity<?> certifiedPhone(@RequestBody Map<String, String> req) {
//      // TODO : 원래는 이거만 사용! 전송된 랜덤 코드만 보내줌!
//        return new ResponseEntity<>(teacherService.certifiedPhoneNum(req.get("phoneNum")), HttpStatus.OK);
//      // TODO : 몇번 남았는지 보기 위해 아래 코드 작성
        cnt--;
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("code", teacherService.certifiedPhoneNum(req.get("phoneNum")));
        resultMap.put("count", cnt + "번 남음");
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }
}
