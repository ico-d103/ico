package com.ico.api.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

/**
 * Test dto
 *
 * @author 서재건
 */
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestDto {

    // message에는 에러 코드 명세서에 선언한 에러 코드를 대입한다.
    @NotNull(message = "15")
    private String title;

}
