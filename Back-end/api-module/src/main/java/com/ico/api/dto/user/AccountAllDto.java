package com.ico.api.dto.user;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * 선택한 학생들에게 미소 일괄 지급 및 차감 기능 Request Dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AccountAllDto {

    @NotBlank(message = "418")
    private String title;

    @NotNull(message = "420")
    private Integer amount;

    @NotEmpty(message = "514")
    private List<Long> studentIds;
}
