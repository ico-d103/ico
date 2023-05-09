package com.ico.api.dto.tax;

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

    private String detail;

    private int amount;

    private int type;

    @Builder
    public TaxResDto(Long id, String title, String detail, int amount, int type) {
        this.id = id;
        this.title = title;
        this.detail = detail;
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
                .detail(tax.getDetail())
                .amount(tax.getAmount())
                .type(tax.getType().ordinal())
                .build();
    }
}
