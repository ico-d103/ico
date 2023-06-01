package com.ico.api.controller;

import com.ico.api.dto.user.LoginDto;
import com.ico.api.dto.user.PasswordReqDto;
import com.ico.api.service.user.MemberService;
import com.ico.api.user.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Member Controller
 *
 * @author 강교철
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberController {

    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;

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
     *
     * @param req
     * @return ok
     */
    @PostMapping("/duplicated-id")
    public ResponseEntity<?> duplicated(@RequestBody Map<String, String> req) {
        String identity = req.get("identity");
        boolean isDuplicated = memberService.duplicated(identity);
        String message = isDuplicated ? "중복된 아이디입니다." : "사용가능한 아이디 입니다.";
        return new ResponseEntity<>(Map.of("isDuplicated", isDuplicated, "message", message), HttpStatus.OK);
    }

    /**
     * 교사와 학생의 정보가 업데이트 될 때 토큰을 업데이트 하는 것
     *
     * @param request
     * @return token
     */
    @PostMapping("/token")
    public ResponseEntity<?> updateToken(HttpServletRequest request) {
        return new ResponseEntity<>(jwtTokenProvider.updateTokenCookie(request), HttpStatus.OK);
    }

    /**
     * 토큰의 상태 반환
     *
     * @param request
     * @return status
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus(HttpServletRequest request) {
        return ResponseEntity.ok(memberService.returnStatus(request));
    }

    /**
     * 비밀번호 변경(공통)
     * @param request
     * @param dto
     * @return ok
     */
    @PutMapping("/change-pw")
    public ResponseEntity<HttpStatus> changePassword(HttpServletRequest request, @RequestBody PasswordReqDto dto) {
        memberService.changePassword(request, dto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 비밀번호 변경안하기(공통)
     * @param request
     * @return ok
     */
    @PutMapping("/not-change-pw")
    public ResponseEntity<HttpStatus> changePassword(HttpServletRequest request) {
        memberService.notChangePassword(request);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
