package com.ico.api.dto.resume;

import com.ico.core.entity.Student;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResumeResDto {

    private String resumeId;

    private String name;

    private int number;

    @Builder
    public ResumeResDto(String resumeId, String name, int number) {
        this.resumeId = resumeId;
        this.name = name;
        this.number = number;
    }

    /**
     * 하나의 직업에 대해 신청한 학생 정보 반환
     *
     * @param student
     * @return
     */
    public ResumeResDto of(String resumeId, Student student) {
        return ResumeResDto.builder()
                .resumeId(resumeId)
                .name(student.getName())
                .number(student.getNumber())
                .build();
    }
}
