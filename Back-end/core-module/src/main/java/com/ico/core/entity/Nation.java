package com.ico.core.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ico.core.dto.StockReqDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Nation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String school;

    private byte grade;

    private byte room;

    @Column(unique = true)
    private String title;

    @Column(unique = true)
    private String code;

    /**
     * 화폐 이름
     */
    private String currency;

    /**
     * 국고
     */
    @ColumnDefault("0")
    private int treasury;

    private String stock;

    private LocalTime trading_start;

    private LocalTime trading_end;

    @ColumnDefault("20")
    private byte credit_up;

    @ColumnDefault("50")
    private byte credit_down;

    /**
     * 주식 종목 수정 시 처리하는 메소드
     * @param dto 종목 정보
     */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public void updateStock(StockReqDto dto){
        this.stock = dto.getStock();
        this.trading_start = dto.getTradingStart();
        this.trading_end = dto.getTradingEnd();
    }
}