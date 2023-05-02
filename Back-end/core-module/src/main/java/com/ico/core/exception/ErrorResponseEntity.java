package com.ico.core.exception;

import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;

/**
 * 에러 코드 응답
 *
 * @author 서재건
 */
@Slf4j
@Data
@Builder
public class ErrorResponseEntity {

    private String code;
    private String message;

    /**
     * CustomException Response 생성
     *
     * @param e
     * @return CustomException Response
     */
    public static ResponseEntity<ErrorResponseEntity> toReponseEntity(ErrorCode e) {
        return ResponseEntity
                .status(e.getHttpStatus())
                .body(ErrorResponseEntity.builder()
                        .code(e.getCode())
                        .message(e.getMessage())
                        .build());
    }

    /**
     * Validation Exception Response 생성
     * Validation 을 통과하지 못한 첫 번째 field에 대해서만 에러 코드 반환
     *
     * @param e
     * @return Validation Exception Response
     */
    public static ResponseEntity<ErrorResponseEntity> toReponseEntity(MethodArgumentNotValidException e) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponseEntity.builder()
                        // 에러 코드 in 에러 코드 명세서
                        .code(e.getBindingResult().getFieldErrors().get(0).getDefaultMessage())
                        .message("유효하지 않은 입력값입니다.")
                        .build());
    }

}
