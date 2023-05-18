package com.ico.core.data;

import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 나라의 기본 직업
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class Default_job {
    private String title;
    private String detail;
    private String image;
    private int wage;
    private int credit_rating;
    private int count;
    private int total;
    private String color;
}
