package com.ico.api.dto.nation;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * 월급일자 반환 ResDto
 *
 * @author 변윤경
 */
@Setter
@Getter
@NoArgsConstructor
public class PaydayResDto {
    List<Byte> paydays;

    @Builder
    public PaydayResDto(List<Byte> paydays) {
        this.paydays = paydays;
    }
}
