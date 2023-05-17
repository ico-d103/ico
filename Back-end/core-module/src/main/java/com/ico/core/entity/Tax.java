package com.ico.core.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ico.core.code.TaxType;
import com.ico.core.dto.TaxReqDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * 세금
 *
 * @author 서재건
 */
@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Tax {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_id")
    private Nation nation;

    private String title;

    private String detail;

    private int amount;

    @Enumerated(EnumType.ORDINAL)
    private TaxType type;

    @Builder
    public Tax(Long id, Nation nation, String title, String detail, int amount, TaxType type) {
        this.id = id;
        this.nation = nation;
        this.title = title;
        this.detail = detail;
        this.amount = amount;
        this.type = type;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public void updateTax(TaxReqDto dto) {
        this.title = dto.getTitle();
        this.detail = dto.getDetail();
        this.amount = dto.getAmount();
        // validation 으로 반드시 0 또는 1만 받음
        this.type = dto.getType() == 0 ? TaxType.PERCENT : TaxType.INT;
    }
}
