package com.ico.api.member;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Base64;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private String secretKey = "iCo";

    private long tokenValidTime = 1000 * 60 * 60 * 24 * 30L;

//    private final UserDetailService userDetailService;
    @PostConstruct
    private void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }
}
