package com.ico.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

/**
 * 나라 생성시 입력받을 DTO
 *
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class NationReqDto {

    String school;
    int grade;
    int room;
    String title;
    String currency;
//    LocalTime trading_start;
//    LocalTime trading_end;

}
