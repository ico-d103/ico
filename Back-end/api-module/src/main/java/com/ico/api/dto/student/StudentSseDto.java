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

    private Long immigrationId;

    private String name;

    private int number;

    @Builder
    public StudentSseDto(Long immigrationId, String name, int number) {
        this.immigrationId = immigrationId;
        this.name = name;
        this.number = number;
    }

    /**
     *
     * @param student
     * @return 학생 id, 이름, 반 번호
     */
    public StudentSseDto of(Student student, Long immigrationId) {
        return StudentSseDto.builder()
                .immigrationId(immigrationId)
                .name(student.getName())
                .number(student.getNumber())
                .build();
    }
}
