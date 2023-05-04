package com.ico.api.controller;

import com.ico.api.dto.LoginDto;
import com.ico.api.service.MemberService;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Member Controller
 *
 * @author 강교철
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class MemberController {

    private final MemberService memberService;

    /**
     * Login
     *
     * @param member
     * @return token
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto member) {
        return new ResponseEntity<>(memberService.login(member), HttpStatus.OK);
    }

    /**
     * 아이디 중복 확인
     * @param req
     * @return ok
     */
    @PostMapping("/duplicated-id")
    public ResponseEntity<?> duplicated(@RequestBody Map<String, String> req) {
        String identity = req.get("identity");
        boolean isDuplicated = memberService.duplicated(identity);
        String message = isDuplicated ? "중복된 아이디입니다." : "사용가능한 아이디 입니다.";
        return ResponseEntity.ok().body(message);
    }

}
