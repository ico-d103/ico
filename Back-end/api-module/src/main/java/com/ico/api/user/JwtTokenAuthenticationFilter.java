package com.ico.api.user;

import com.ico.core.code.Role;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * JWT Provider 를 사용
 *
 * @author 강교철
 */
@RequiredArgsConstructor
@Component
@Slf4j
public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailService customUserDetailService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String token = "";
        try {
            // HttpServletRequest 객체에서 JWT 토큰을 추출
            token = jwtTokenProvider.parseJwt(request);
            log.info("request: {}", request.getHeader("Authorization"));
            log.info("token: {}", token);

            // 추출된 JWT 토큰이 null이 아닌 경우, 해당 토큰에서 identity 값을 가져오기
            if (token != null) {
                String identity = jwtTokenProvider.getIdentity(token);
                log.info("identity: {}", identity);
                CustomUserDetails userDetails = customUserDetailService.loadUserByUsername(identity);
                log.info("userDetail.getAuthorities: {}", userDetails.getAuthorities());

                // 가져온 사용자 정보를 사용하여 UsernamePasswordAuthenticationToken 객체를 생성하고, SecurityContext에 이를 설정
                Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContext context = SecurityContextHolder.getContext();
                context.setAuthentication(authentication);
                SecurityContextHolder.setContext(context);
                log.info("SecurityContextHolder 저장 완료");
            } else {
                // 로그인 전 일 경우에는 토큰이 없어도 요청 처리 가능
                if (request.getRequestURI().startsWith("/api/login") || request.getRequestURI().startsWith("/api/student")
                        || request.getRequestURI().startsWith("/api/teacher") || request.getRequestURI().startsWith("/api/duplicated-id")) {
                    filterChain.doFilter(request, response);
                    return;
                }
                // 그 외의 경우에는 예외를 발생시킴
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "토큰이 없습니다.");
            }
        } catch (ExpiredJwtException e){
            log.info("[doFilterInternal]에서 발생 : {}", e.getMessage());
            e.printStackTrace();
        }
        // HTTP 요청을 필터링한 후 다음 필터로 체인을 전달
        filterChain.doFilter(request, response);
    }
}
