package com.ico.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * 학생들의 판매제안서 등록 dto
 *
 * @author 변윤경
 */

@Getter
@Setter
@AllArgsConstructor
public class StudentProductProposalDto {
    String identity;
    Long nationId;
    String title;
    int amount;
    String image;
    String detail;
    byte count;

}
