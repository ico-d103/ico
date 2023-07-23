package com.ico.api.dto.salary;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * 선택한 학생들의 월급 일괄 지급을 위한 Request Dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SalaryPaymentReqDto {

    @NotNull(message = "431")
    @NotEmpty(message = "431")
    private List<Long> studentIds;

}
