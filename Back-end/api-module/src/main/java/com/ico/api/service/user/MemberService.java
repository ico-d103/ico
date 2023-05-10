package com.ico.api.service.user;

import com.ico.api.dto.user.LoginDto;

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
    Map<String, String> login(LoginDto members);

    /**
     * 아이디 중복 체크
     *
     * @param identity
     */
    boolean duplicated(String identity);
}
