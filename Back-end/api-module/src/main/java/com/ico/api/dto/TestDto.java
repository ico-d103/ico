package com.ico.api.dto;


import javax.validation.constraints.NotNull;

/**
 * Test dto
 *
 * @author 서재건
 */
public class TestDto {

    // message에는 에러 코드 명세서에 선언한 에러 코드를 대입한다.
    @NotNull(message = "15")
    private String title;

}
