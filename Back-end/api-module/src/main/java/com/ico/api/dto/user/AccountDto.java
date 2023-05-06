package com.ico.api.dto.user;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @author 변윤경
 */
@Getter
@NoArgsConstructor
public class AccountDto {
    @NotNull(message = "420")
    private int amount;

    @NotBlank(message = "418")
    private String title;

    @Builder
    public AccountDto(int amount, String title) {
        this.amount = amount;
        this.title = title;
    }

}
