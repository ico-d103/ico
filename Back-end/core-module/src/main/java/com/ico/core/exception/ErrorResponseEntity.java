package com.ico.core.exception;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.ResponseEntity;

/**
 * 에러 코드 응답
 *
 * @author 서재건
 */
@Data
@Builder
public class ErrorResponseEntity {

    private int status;
    private String name;
    private String code;
    private String message;

    public static ResponseEntity<ErrorResponseEntity> toReponseEntity(ErrorCode e) {
        return ResponseEntity
                .status(e.getHttpStatus())
                .body(ErrorResponseEntity.builder()
                        .status(e.getHttpStatus().value())
                        .name(e.name())
                        .code(e.getCode())
                        .message(e.getMessage())
                        .build());
    }
}
