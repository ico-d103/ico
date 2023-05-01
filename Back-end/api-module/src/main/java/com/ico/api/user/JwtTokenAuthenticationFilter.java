package com.ico.api.user;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Component
@Slf4j
public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailService principalOAuth2UserService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String token = "";
        try {
            // HttpServletRequest 객체에서 JWT 토큰을 추출
            token = jwtTokenProvider.parseJwt(request);
            log.info("request: {}", request.getHeader("Authentication"));
            log.info("=============== token: {}", token);

            // 추출된 JWT 토큰이 null이 아닌 경우, 해당 토큰에서 identity 값을 가져오기
            if (token != null) {
                String identity = (String) jwtTokenProvider.getIdentity(token);
                log.info("identity: {}", identity);
                UserDetails userDetails = principalOAuth2UserService.loadUserByUsername(identity);
                log.info("userDetail.getAuthorities: {}", userDetails.getAuthorities());

                // 가져온 사용자 정보를 사용하여 UsernamePasswordAuthenticationToken 객체를 생성하고, SecurityContext에 이를 설정
                Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContext context = SecurityContextHolder.getContext();
                context.setAuthentication(authentication);
                SecurityContextHolder.setContext(context);
            }
        } catch (ExpiredJwtException e) {
            e.printStackTrace();
        }
        // HTTP 요청을 필터링한 후 다음 필터로 체인을 전달
        filterChain.doFilter(request, response);
    }
}
