package com.ico.api.dto.job;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 교사가 선택한 학생들의 id 값을 담은 리스트 dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class JobResetReqDto {

    private List<Long> studentIds;

}
