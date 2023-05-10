package com.ico.api.dto.nation;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * 신용등급 평점 부여 req dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CreditScoreReqDto {

    @NotNull(message = "428")
    private Boolean type;
}
