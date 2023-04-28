package com.ico.core.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 *
 * @author 서재건
 */
@ControllerAdvice
public class CustomExceptionHandler {

    /**
     * CustomException 처리하는 method
     *
     * @param e
     * @return
     */
    @ExceptionHandler(CustomException.class)
    ResponseEntity<ErrorResponseEntity> handleCustomException(CustomException e) {
        return ErrorResponseEntity.toReponseEntity(e.getErrorCode());
    }

    /**
     * Validation Exception 처리하는 method
     *
     * @param e
     * @return
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ErrorResponseEntity> handleValidationException(MethodArgumentNotValidException e) {
        return ErrorResponseEntity.toReponseEntity(e);
    }
}
