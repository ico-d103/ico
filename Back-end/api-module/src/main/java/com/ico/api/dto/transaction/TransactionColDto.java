package com.ico.api.dto.transaction;

import com.ico.core.entity.Transaction;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 학생 상세보기에서 transaction column 에 담을 거래내역 dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class TransactionColDto {

    private String title;

    private int amount;

    @Builder
    public TransactionColDto(String title, int amount) {
        this.title = title;
        this.amount = amount;
    }

    /**
     * 학생 상세보기 transaction column 에서 사용할 양식으로 변환
     *
     * @param transaction
     * @param userId 학생 or 교사 Id
     * @return
     */
    public TransactionColDto of (Transaction transaction, String userId) {
        return TransactionColDto.builder()
                .title(transaction.getTitle())
                .amount(transaction.getFrom().equals(userId) ? -1 * transaction.getAmount() : transaction.getAmount())
                .build();
    }
}
