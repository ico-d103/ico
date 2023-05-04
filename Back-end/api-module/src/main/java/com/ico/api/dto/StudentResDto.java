package com.ico.api.dto;

import com.ico.core.entity.Student;
import com.ico.core.entity.Transaction;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * 학생 상세보기 res dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class StudentResDto {

    private Long studentId;

    private boolean isFrozen;

    private int creditScore;

    private List<TransactionColDto> transactions;

    @Builder
    public StudentResDto(Long studentId, boolean isFrozen, int creditScore, List<TransactionColDto> transactions) {
        this.studentId = studentId;
        this.isFrozen = isFrozen;
        this.creditScore = creditScore;
        this.transactions = transactions;
    }

    /**
     * 학생과 거래내역을 매핑하는 method
     *
     * @param student
     * @param transactions
     * @return
     */
    public StudentResDto of(Student student, List<Transaction> transactions) {
        List<TransactionColDto> dto = new ArrayList<>();
        for (Transaction transaction : transactions) {
            dto.add(new TransactionColDto().of(transaction, String.valueOf(student.getId())));
        }

        return StudentResDto.builder()
                .studentId(student.getId())
                .isFrozen(student.isFrozen())
                .creditScore(student.getCreditScore())
                .transactions(dto)
                .build();
    }
}
