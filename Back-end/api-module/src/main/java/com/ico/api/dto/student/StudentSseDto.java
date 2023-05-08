package com.ico.api.dto.student;

import com.ico.core.entity.Student;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * SSE를 사용한 반 입장 학생 목록 담을 dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class StudentSseDto {

    private Long id;

    private String name;

    private int number;

    @Builder
    public StudentSseDto(Long id, String name, int number) {
        this.id = id;
        this.name = name;
        this.number = number;
    }

    /**
     *
     * @param student
     * @return 학생 id, 이름, 반 번호
     */
    public StudentSseDto of(Student student) {
        return StudentSseDto.builder()
                .id(student.getId())
                .name(student.getName())
                .number(student.getNumber())
                .build();
    }
}
