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

    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "13", "해당하는 회원이 없습니다."),

    INVALID_FILE_EXTENSION(HttpStatus.BAD_REQUEST, "16", "파일 변환 중 에러가 발생 했습니다."),

    JOB_NOT_FOUND(HttpStatus.NOT_FOUND, "15", "해당하는 직업이 없습니다."),

    ALREADY_ASSIGNED(HttpStatus.BAD_REQUEST, "409", "이미 배정된 직업입니다."),
    ;

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
