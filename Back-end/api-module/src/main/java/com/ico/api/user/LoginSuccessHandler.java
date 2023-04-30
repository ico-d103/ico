package com.ico.api.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ico.api.dto.LoginDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        log.info("[login]time={}", LocalDateTime.now(ZoneId.of("Asia/Seoul")));

        String token = jwtTokenProvider.generateJwtToken((LoginDto) authentication.getPrincipal());
        log.info("[token]{}", token);

        Cookie cookie = new Cookie("Authentication", token);
//        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24 * 30);
        response.addCookie(cookie);

//        Map<String, Object> result = new HashMap<>();
//        result.put("success", true);
//        result.put("message", "Login Success!");
//        result.put("data", authentication.getPrincipal());
//
//        response.getWriter().write(objectMapper.writeValueAsString(result));


//        String serverName = request.getRemoteHost();
//        if (serverName != null && (serverName.equals("k8d103.p.ssafy.io"))) {
//            response.setStatus(302);
//            response.setHeader("Location", "/index?token=" + token);
//        }else{
//            response.setStatus(302);
//            response.setHeader("Location", "http://localhost:3000/index?token=" + token);
//        }
    }
}