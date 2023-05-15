package com.ico.core.data;

import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 나라의 기본 예금 이자율
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class Default_interest {
    private int credit_rating;
    private int short_period;
    private int long_period;
}
