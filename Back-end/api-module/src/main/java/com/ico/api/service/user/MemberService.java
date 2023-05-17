package com.ico.api.service.user;

import com.ico.api.dto.user.LoginDto;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Member Service
 *
 * @author 강교철
 */
public interface MemberService {

    /**
     * LoginDto 로 아이디와 비밀번호를 받은 후 검사를 하고 jwtProvider 를 호출
     *
     * @param members
     * @return generateJwtToken
     */
    String login(LoginDto members);

    /**
     * 아이디 중복 체크
     *
     * @param identity
     */
    boolean duplicated(String identity);

    /**
     * 토큰의 값의 상태 반환
     * @param request
     * @return status
     */
    Map<String, Object> returnStatus(HttpServletRequest request);
}
