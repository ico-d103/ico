package com.ico.api.dto.student;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import java.util.List;

/**
 * 학생 추방 시 학생 ID 받는 Dto
 *
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class StudentDelReqDto {

    @NotEmpty(message = "46")
    private List<Long> studentIds;
}
