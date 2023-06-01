package com.ico.core.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * @author 강교철
 */
@RequiredArgsConstructor
@Getter
public enum Role {
    STUDENT("ROLE_STUDENT"), TEACHER("ROLE_TEACHER"), ADMIN("ROLE_ADMIN");

    private final String description;
}
