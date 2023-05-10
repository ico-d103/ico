package com.ico.api.user;

import com.ico.api.dto.user.LoginDto;
import com.ico.core.code.Role;
import com.ico.core.entity.Student;
import com.ico.core.entity.Teacher;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.StudentRepository;
import com.ico.core.repository.TeacherRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.PostConstruct;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Jwt Provider
 *
 * @author 강교철
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtTokenProvider {

    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;

    /**
     * securityKey 를 application-login 에 넣어두고 @Value 로 꺼내오기
     */
    @Value("${spring.security.securityKey}")
    private String securityKey;

    /**
     * 토큰 유효기간 1달로 설정
     */
    private final long tokenValidTime = 1000 * 60 * 60 * 24 * 30L;

    /**
     * 객체 초기화
     */
    @PostConstruct
    private void init() {
        securityKey = Base64.getEncoder().encodeToString(securityKey.getBytes());
    }

    /**
     * Token 생성
     *
     * @param member
     * @return token
     */
    public String generateJwtToken(LoginDto member) {
        Date now = new Date();
        log.info("[generate token]time={}", LocalDateTime.now(ZoneId.of("Asia/Seoul")));
        return Jwts.builder()
                .setSubject(member.getIdentity())
                .setHeader(createHeader())
                .setClaims(createClaims(member)) // 클레임, 토큰에 포함될 정보
                .setExpiration(new Date(now.getTime() + tokenValidTime)) // 만료일
                .signWith(SignatureAlgorithm.HS256, securityKey)
                .compact();
    }

    /**
     * Header 생성
     *
     * @return header
     */
    private Map<String, Object> createHeader() {
        Map<String, Object> header = new HashMap<>();
        header.put("typ", "JWT");
        header.put("alg", "HS256"); // 해시 256 사용하여 암호화
        header.put("regDate", System.currentTimeMillis());
        return header;
    }

    /**
     * 정보 추가
     *
     * @param member
     * @return claims
     */
    private Map<String, Object> createClaims(LoginDto member) {
        Map<String, Object> claims = new HashMap<>();

        if (teacherRepository.findByIdentity(member.getIdentity()).isPresent()) {
            Teacher teacher = teacherRepository.findByIdentity(member.getIdentity()).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
            claims.put("id", teacher.getId());
            claims.put("identity", member.getIdentity());
            claims.put("role", teacher.getRole());

            if (teacher.getNation() != null) {
                claims.put("nation", teacher.getNation().getId());
            } else {
                claims.put("nation", null);
            }

        }
        else if (studentRepository.findByIdentity(member.getIdentity()).isPresent()) {
            Student student = studentRepository.findByIdentity(member.getIdentity()).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
            claims.put("id", student.getId());
            claims.put("identity", member.getIdentity());
            claims.put("role", student.getRole());

            if (student.getNation() != null) {
                claims.put("nation", student.getNation().getId());
            } else {
                claims.put("nation", null);
            }
        }
        else {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        return claims;
    }

    /**
     * 정보 저장
     *
     * @param token
     * @return
     */
    private Map<String, Object> createClaims(String token){
        Map<String, Object> claims = new HashMap<>();

            claims.put("id", getId(token));
            claims.put("identity", getIdentity(token));
            claims.put("role", getRole(token));
            claims.put("nation", getNation(token));

        return claims;
    }

    private Map<String, Object> createLongClaims() {
        Map<String, Object> claims = new HashMap<>();
        return claims;
    }

    /**
     * Token 정보 추출
     * ex) String nation = (String) jwtTokenProvider.getClaimsData(token).get("nation");
     * @param token
     * @return id, nation, identity, role
     */
    public Claims getClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(securityKey).build().parseClaimsJws(token).getBody();
    }

    /**
     * Token 에서 id 값 추출
     *
     * @param token
     * @return id
     */
    public Long getId(String token) {
        return ((Number) getClaims(token).get("id")).longValue();
    }

    /**
     * Token 에서 identity 값 추출
     *
     * @param token
     * @return identity
     */
    public String getIdentity(String token) {
        return (String) getClaims(token).get("identity");
    }

    /**
     * Token 에서 role 값 추출
     *
     * @param token
     * @return role
     */
    public Role getRole(String token) {
        String role = (String) getClaims(token).get("role");
        return Role.valueOf(role);
    }

    /**
     * Token 에서 nation 값 추출
     *
     * @param token
     * @return nation
     */
    public Long getNation(String token) {
        log.info("[jwt getNation] token : {}", token);
        Claims claims = getClaims(token);
        Object nationObj = claims.get("nation");
        if (nationObj instanceof Number) {
            log.info("[jwt getNation] nationObj == Number");
            log.info("[jwt getNation] longValue : {}", ((Number) nationObj).longValue());
            return ((Number) nationObj).longValue();
        } else {
            log.info("[jwt getNation] null 반환");
            return null;
        }
    }

    /**
     * 토큰 확인
     *
     * @param token
     * @return
     */
    public Boolean isValidate(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(securityKey).build().parseClaimsJws(token).getBody();
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token");
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token");
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token");
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty.");
        }
        return false;
    }

    /**
     * JWT 추출
     *
     * @param request
     * @return token
     */
    public String parseJwt(HttpServletRequest request){
        String headerAuth=null;     // 1. 변수 초기화

        // 2. 쿠키에서 JWT 추출
        Cookie[] cookies = request.getCookies();
        if(cookies!=null){
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("Authorization")) {
                    log.info("[parseJwt] 쿠키에서 Authorization 캐치");
                    log.info("[parseJwt] 쿠키에서 Authorization : {}", cookie.getValue());
                    headerAuth = cookie.getValue();
                    break;
                }
            }

            // 3. 쿠키에서 JWT를 추출할 수 있었다면 해당 값 반환
            if(headerAuth!=null){
                return headerAuth;
            }
        }

        // 4. 쿠키에서 JWT를 추출할 수 없으면 HTTP 헤더에서 추출
        headerAuth = request.getHeader("Authorization");
        return headerAuth;
    }

    /**
     * 학생의 반 입장, 교사의 반 생성시 마다 호출되어야 하는 TokenUpdate 메서드
     *
     * @param request
     * return token
     */
    public String updateTokenCookie(HttpServletRequest request) {
        String oldToken = parseJwt(request);

        // 기존 토큰이 있다면 새로운 토큰으로 교체합니다.
        if (oldToken != null) {
            String identity = getIdentity(oldToken);
            // 기존 토큰의 유효성을 검사합니다.
            if (isValidate(oldToken)) {
                // 토큰의 클레임 정보를 가져옵니다.
                Map<String, Object> claims = createClaims(oldToken);
                if (claims.get("identity").equals(identity)) {
                    // 새로운 토큰을 생성합니다.
                    LoginDto member = new LoginDto();
                    member.setIdentity(identity);
                    String newToken = generateJwtToken(member);

                    // 새로운 토큰으로 쿠키를 갱신합니다.
                    log.info("[updateTokenCookie] 쿠키 넣기 전의 새로운 토큰 생성 : {}", newToken);
                    HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
                    log.info("[updateTokenCookie] response 생성");
                    Cookie cookie = new Cookie("Authorization", newToken);
                    cookie.setPath("/");
                    cookie.setMaxAge((int) tokenValidTime / 1000);
                    response.addCookie(cookie);
                    log.info("[updateTokenCookie] response에 cookie 넣기 완료");
                    log.info("[updateTokenCookie] 새로바뀐 토큰!! " + newToken);
                    return newToken;
                }
            }
        }
        return  "예전 토큰!! " + oldToken;
    }
}
