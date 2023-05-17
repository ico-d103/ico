package com.ico.api.user;

import com.ico.api.dto.user.LoginDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;

/**
 * 로그인이 성공했을 때
 *
 * @author 강교철
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 로그인 성공 후의 일들
     *
     * @param request the request which caused the successful authentication
     * @param response the response
     * @param authentication the <tt>Authentication</tt> object which was created during
     * the authentication process.
     * @throws IOException
     */
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        // 1. 로그인 성공 로그 출력
        log.info("[login]time={}", LocalDateTime.now(ZoneId.of("Asia/Seoul")));

        // 2. JWT 토큰 생성
        String token = jwtTokenProvider.generateJwtToken((LoginDto) authentication.getPrincipal());
        log.info("[token]{}", token);

        // 3. JWT 토큰을 쿠키에 저장
        Cookie cookie = new Cookie("Authorization", token);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24 * 30);
        response.addCookie(cookie);

        // 4. 서버 이름 확인 및 리다이렉트 처리(학생과 교사의 반 내용이 있을 때와 없을 때의 리다이렉트 주소 설정하기)
        String serverName = request.getRemoteHost();
        if (serverName != null && (serverName.equals("k8d103.p.ssafy.io"))) {
            // 4-1. 서버 이름이 'k8d103.p.ssafy.io'일 경우, 해당 URL로 리다이렉트
            response.setStatus(302);
            response.setHeader("Location", "/index?token=" + token);
        }else{
            // 4-2. 서버 이름이 'k8d103.p.ssafy.io'가 아닐 경우, 로컬호스트로 리다이렉트
            response.setStatus(302);
            response.setHeader("Location", "http://localhost:3000/index?token=" + token);
        }
    }
}