package com.ico.api.controller;

import com.ico.api.dto.LoginDto;
import com.ico.api.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Member Controller
 *
 * @author 강교철
 */
@RestController
@RequiredArgsConstructor
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
}
