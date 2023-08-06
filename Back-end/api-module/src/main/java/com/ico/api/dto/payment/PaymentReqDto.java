package com.ico.api.dto.payment;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * 선택한 학생들의 일괄 지급 처리하기 위한 Request Dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PaymentReqDto {

    @NotNull(message = "431")
    @NotEmpty(message = "431")
    private List<Long> studentIds;

}
