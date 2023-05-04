package com.ico.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class AccountDto {
    @NotNull(message = "420")
    @Min(value = 1, message = "419")
    private int amount;

    @NotBlank(message = "418")
    private String title;

    @Builder
    public AccountDto(int amount, String title) {
        this.amount = amount;
        this.title = title;
    }

}
