package com.ico.api.dto.job;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 교사가 전체 직업 조회할 때 사용하는 res Dto
 *
 * @author 서재건
 */
@Getter
@NoArgsConstructor
public class JobAllResDto {

    private int restJobCount;

    private List<JobAllColDto> jobList;

    @Builder
    public JobAllResDto(int restJobCount, List<JobAllColDto> jobList) {
        this.restJobCount = restJobCount;
        this.jobList = jobList;
    }

    /**
     * 교사의 전체 직업 조회 res dto 반환
     *
     * @param restJobCount
     * @param jobList
     * @return
     */
    public JobAllResDto of(int restJobCount, List<JobAllColDto> jobList) {
        return JobAllResDto.builder()
                .restJobCount(restJobCount)
                .jobList(jobList)
                .build();
    }
}
