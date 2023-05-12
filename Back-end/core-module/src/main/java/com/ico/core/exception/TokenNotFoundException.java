package com.ico.core.exception;


public class TokenNotFoundException extends RuntimeException {
    private final String code;

    public TokenNotFoundException(String code, String message) {
        super(message);
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}