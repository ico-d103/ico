package com.ico.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

/**
 * Redis 인증 코드 관련 코드
 *
 * @author 강교철
 */
@Service
@RequiredArgsConstructor
public class VerificationCodeService {

    private final RedisTemplate<String, String> redisTemplate;

    /**
     * 인증코드 redis에 저장
     * @param phoneNum
     * @param code
     */
    public void saveVerificationCode(String phoneNum, String code) {
        // 인증 코드 3분간 유효
        redisTemplate.opsForValue().set(phoneNum, code, 3, TimeUnit.MINUTES);
    }

    /**
     * redis에 저장된 인증코드를 가져오기
     * @param phoneNum
     * @return code
     */
    public String getVerificationCode(String phoneNum) {
        return redisTemplate.opsForValue().get(phoneNum);
    }
}
