package com.ico.api.dto.nation;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * 체크한 학생 일괄 신용 점수 부여
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CreditScoreAllReqDto {

    @NotEmpty(message = "514")
    private List<Long> studentIds;

    @NotNull(message = "428")
    private Boolean type;

}
