package com.ico.api.dto.resume;

import com.ico.core.entity.Student;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResumeResDto {

    private Long id;

    private String name;

    private int number;

    @Builder
    public ResumeResDto(Long id, String name, int number) {
        this.id = id;
        this.name = name;
        this.number = number;
    }

    /**
     * 하나의 직업에 대해 신청한 학생 정보 반환
     *
     * @param student
     * @return
     */
    public ResumeResDto of(Student student) {
        return ResumeResDto.builder()
                .id(student.getId())
                .name(student.getName())
                .number(student.getNumber())
                .build();
    }
}
