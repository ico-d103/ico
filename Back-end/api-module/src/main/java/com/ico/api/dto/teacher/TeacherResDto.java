package com.ico.api.dto.teacher;

import com.ico.core.entity.Teacher;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 교사 정보 조회
 *
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class TeacherResDto {

    String identity;
    String phoneNum;

    @Builder
    public TeacherResDto(String identity, String phoneNum) {
        this.identity = identity;
        this.phoneNum = phoneNum;
    }
}
