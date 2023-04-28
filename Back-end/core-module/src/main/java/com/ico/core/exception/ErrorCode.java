package com.ico.core.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * 에러 코드 Enum
 *
 * @author 서재건
 */
@Getter
@AllArgsConstructor
public enum ErrorCode{

    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "ACCOUNT-001", "사용자를 찾을 수 없습니다."),

    // TODO: security 필터 에러 처리 알아보고 다시 정의
    INTER_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "ERROR-001", "서버에서 오류가 발생했습니다."),

    FAIL_AUTHENTICATION(HttpStatus.UNAUTHORIZED, "ERROR-002", "인증되지 않은 요청입니다."),

    FAIL_AUTHORIZATION(HttpStatus.FORBIDDEN, "ERROR-003", "권한이 없는 요청입니다."),

    INVALID_PASSWORD(HttpStatus.BAD_REQUEST, "ACCOUNT-002", "비밀번호가 일치하지 않습니다."),

    HAS_USER(HttpStatus.BAD_REQUEST, "ACCOUNT-003", "이미 등록된 회원입니다."),
    ;

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
