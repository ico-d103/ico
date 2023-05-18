package com.ico.core.exception;

import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.List;

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
        List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
        FieldError fieldError = fieldErrors.get(fieldErrors.size()-1);  // 가장 첫 번째 에러 필드
        String fieldName = fieldError.getField();   // 필드명
        Object rejectedValue = fieldError.getRejectedValue();   // 입력값

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponseEntity.builder()
                        // 에러 코드 in 에러 코드 명세서
                        .code(fieldError.getDefaultMessage())
                        .message(fieldName + " 필드의 입력값[ " + rejectedValue + " ]이 유효하지 않습니다.")
                        .build());
    }

    /**
     * max file size를 넘겼을 때 에러 코드 반환
     *
     * @param e
     * @return
     */
    public static ResponseEntity<ErrorResponseEntity> toReponseEntity(MaxUploadSizeExceededException e) {
        return ResponseEntity
                .status(HttpStatus.BAD_GATEWAY)
                        .body(ErrorResponseEntity.builder()
                                .code("34")
                                .message("업로드 가능한 최대 사진 크기는 " + e.getMaxUploadSize() + "MB 입니다.")
                                .build());
    }

}
