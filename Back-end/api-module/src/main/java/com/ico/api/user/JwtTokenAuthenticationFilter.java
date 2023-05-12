package com.ico.api.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ico.core.exception.ErrorResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.DispatcherType;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebFilter;
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
@WebFilter(urlPatterns = {"/api/teacher", "/api/student", "/api/login", "api/duplicated-id"},
        filterName = "JwtTokenAuthenticationFilter",
        dispatcherTypes = {DispatcherType.REQUEST, DispatcherType.FORWARD})
public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailService customUserDetailService;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String token = jwtTokenProvider.parseJwt(request);
        if (token == null || token.trim().isEmpty()) {
            if (request.getRequestURI().startsWith("/api/login") || request.getRequestURI().startsWith("/api/student")
                    || request.getRequestURI().startsWith("/api/teacher") || request.getRequestURI().startsWith("/api/duplicated-id")) {
                filterChain.doFilter(request, response);
                return;
            }
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("UTF-8");
            ErrorResponse errorResponse = new ErrorResponse("25", "토큰이 없습니다.");
            objectMapper.writeValue(response.getWriter(), errorResponse);
            return;
        }
        try {
            // HttpServletRequest 객체에서 JWT 토큰을 추출
            log.info("request: {}", request.getHeader("Authorization"));
            log.info("token: {}", token);

            // 추출된 JWT 토큰이 null이 아닌 경우, 해당 토큰에서 identity 값을 가져오기
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

        } catch (IllegalArgumentException ex) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("UTF-8");
            ResponseEntity<Object> errorResponse = ResponseEntity.badRequest().body(new ErrorResponse("25", "토큰이 없습니다."));
            objectMapper.writeValue(response.getWriter(), errorResponse);
            return;
        }
        // HTTP 요청을 필터링한 후 다음 필터로 체인을 전달
        filterChain.doFilter(request, response);
    }
}
