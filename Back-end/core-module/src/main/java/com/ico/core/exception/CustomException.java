package com.ico.core.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 *
 * @author 서재건
 */
@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException{
    ErrorCode errorCode;
}
