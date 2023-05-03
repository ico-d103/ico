package com.ico.api.user;

import com.ico.api.dto.LoginDto;
import com.ico.core.entity.Student;
import com.ico.core.entity.Teacher;
import com.ico.core.repository.StudentRepository;
import com.ico.core.repository.TeacherRepository;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtTokenProvider {

    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;

    private String securityKey = "as09df8h0e8fhs0d8fhs08fh0sd8fhse08fhs0ef8hse08fhse08fhse0f8hq08f";

    private long tokenValidTime = 1000 * 60 * 60 * 24 * 30L;

    private final CustomUserDetailService userDetailService;
    @PostConstruct
    private void init() {
        securityKey = Base64.getEncoder().encodeToString(securityKey.getBytes());
    }

    public String generateJwtToken(LoginDto member) {
        Date now = new Date();
        log.info("[generate token]time={}", LocalDateTime.now(ZoneId.of("Asia/Seoul")));
        return Jwts.builder()
                .setSubject(member.getIdentity()) // 보통 username
                .setHeader(createHeader())
                .setClaims(createClaims(member)) // 클레임, 토큰에 포함될 정보
                .setExpiration(new Date(now.getTime() + tokenValidTime)) // 만료일
                .signWith(SignatureAlgorithm.HS256, securityKey)
                .compact();
    }

    private Map<String, Object> createHeader() {
        Map<String, Object> header = new HashMap<>();
        header.put("typ", "JWT");
        header.put("alg", "HS256"); // 해시 256 사용하여 암호화
        header.put("regDate", System.currentTimeMillis());
        return header;
    }

    private Map<String, Object> createClaims(LoginDto member) {
        Map<String, Object> claims = new HashMap<>();

        if (teacherRepository.findTeacherByIdentity(member.getIdentity()).isPresent()) {        // 안돼면 .isEmpty 사용하기
            Teacher teacher = teacherRepository.findTeacherByIdentity(member.getIdentity()).orElse(null);
            claims.put("id", teacher.getId());
            claims.put("identity", member.getIdentity());
            claims.put("name", teacher.getName());
            claims.put("role", teacher.getRole());
            claims.put("nation", teacher.getNation());

        }
        else {
            Student student = studentRepository.findByIdentity(member.getIdentity()).orElse(null);
            claims.put("id", student.getId());
            claims.put("identity", member.getIdentity());
            claims.put("name", student.getName());
            claims.put("role", student.getRole());
            claims.put("nation", student.getNation());
        }

        return claims;
    }

    private Map<String, Object> createClaims(String token){
        Map<String, Object> claims = new HashMap<>();

            claims.put("id", getId(token));
            claims.put("identity", getIdentity(token));
            claims.put("name", getName(token));
            claims.put("role", getRole(token));
            claims.put("nation", getNation(token));

        return claims;
    }

    private Map<String, Object> createLongClaims() {
        Map<String, Object> claims = new HashMap<>();
        return claims;
    }

    public Claims getClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(securityKey).build().parseClaimsJws(token).getBody();
    }

    private Object getId(String token) {
        return getClaims(token).get("id");
    }

    private Object getIdentity(String token) {
        return getClaims(token).get("identity");
    }

    private Object getName(String token) {
        return getClaims(token).get("name");
    }

    private Object getRole(String token) {
        return getClaims(token).get("role");
    }

    private Object getNation(String token) {
        return getClaims(token).get("nation");
    }

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

    public String parseJwt(HttpServletRequest request){
        String headerAuth=null;

        Cookie[] cookies = request.getCookies();
        if(cookies!=null){
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("Authentication")) {
                    headerAuth = cookie.getValue();
                    break;
                }
            }

            if(headerAuth!=null){
                return headerAuth;
            }
        }

        headerAuth = request.getHeader("Authentication");
        return headerAuth;
    }

}