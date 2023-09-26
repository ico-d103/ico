package com.ico.api.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ico.core.exception.ErrorResponse;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * JWT Provider 를 사용
 *
 * @author 강교철
 * @author 서재건
 */
@RequiredArgsConstructor
@Component
@Slf4j
public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailService customUserDetailService;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        // HttpServletRequest 객체에서 JWT 토큰을 추출
        String token = jwtTokenProvider.parseJwt(request);
        // token이 없을 때
        if (token == null || token.trim().isEmpty()) {
            // 토큰이 없더라도 요청가능한 api uri(/api/teacher/** != /api/teacher)
            if (request.getRequestURI().equals("/api/login") || request.getRequestURI().equals("/api/student")
                    || request.getRequestURI().equals("/api/teacher") || request.getRequestURI().equals("/api/duplicated-id")
                    || request.getRequestURI().equals("/api/teacher/phone") || request.getRequestURI().equals("/api/teacher/reset-pw")
                    || request.getRequestURI().equals("/api/power") || request.getRequestURI().equals("/api/teacher/find-id")
                    || request.getRequestURI().equals("/api/teacher/verify")) {
                log.info("[doFilterInternal] : 토큰이 없는 uri : {}", request.getRequestURI());
                response.addHeader("Access-Control-Allow-Origin", "*");
                filterChain.doFilter(request, response);
                return;
            }
            // CustomError 던지기
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("UTF-8");
            ErrorResponse errorResponse = new ErrorResponse("25", "토큰이 없습니다.");
            objectMapper.writeValue(response.getWriter(), errorResponse);
            return;
        }
        try {
            // 유효성 검사
            if (!jwtTokenProvider.isValidate(token)) {
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                response.setCharacterEncoding("UTF-8");
                ErrorResponse errorResponse = new ErrorResponse("29", "토큰이 유효하지 않습니다.");
                objectMapper.writeValue(response.getWriter(), errorResponse);
                response.addHeader("Access-Control-Allow-Origin", "*");
                return;
            }
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

        } catch (ExpiredJwtException e){
            log.info("[doFilterInternal]에서 발생 : {}", e.getMessage());
            e.printStackTrace();
        }
        // HTTP 요청을 필터링한 후 다음 필터로 체인을 전달
        response.addHeader("Access-Control-Allow-Origin", "*");
        filterChain.doFilter(request, response);
    }
}
