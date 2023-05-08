package com.ico.api.dto.tax;

import com.ico.core.code.TaxType;
import com.ico.core.entity.Tax;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 국세 정보 조회 res dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class TaxResDto {

    private Long id;

    private String title;

    private int amount;

    private boolean type;

    @Builder
    public TaxResDto(Long id, String title, int amount, boolean type) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.type = type;
    }

    /**
     * 국세 목록 조회
     *
     * @param tax
     * @return
     */
    public TaxResDto of (Tax tax) {
        return TaxResDto.builder()
                .id(tax.getId())
                .title(tax.getTitle())
                .amount(tax.getAmount())
                .type(tax.getType() == TaxType.PERCENT)
                .build();
    }
}
