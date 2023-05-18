package com.ico.api.dto.student;

import com.ico.api.dto.transaction.TransactionColDto;
import com.ico.core.entity.Student;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

/**
 * 학생 상세보기 res dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class StudentResDto {

    private Long studentId;

    private String studentName;

    private boolean isFrozen;

    private int creditScore;

    private Map<String, List<TransactionColDto>> transactions;

    @Builder
    public StudentResDto(Long studentId, String studentName, boolean isFrozen, int creditScore, Map<String, List<TransactionColDto>> transactions) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.isFrozen = isFrozen;
        this.creditScore = creditScore;
        this.transactions = transactions;
    }

    /**
     * 학생과 거래내역을 매핑하는 method
     *
     * @param student
     * @param map
     * @return
     */
    public StudentResDto of(Student student, Map<String, List<TransactionColDto>> map) {
        return StudentResDto.builder()
                .studentId(student.getId())
                .studentName(student.getName())
                .isFrozen(student.isFrozen())
                .creditScore(student.getCreditScore())
                .transactions(map)
                .build();
    }
}
