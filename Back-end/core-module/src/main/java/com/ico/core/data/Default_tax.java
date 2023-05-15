package com.ico.core.data;

import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 나라의 기본 세금
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class Default_tax {
    private String title;
    private String detail;
    private int amount;
    private String type;
}
