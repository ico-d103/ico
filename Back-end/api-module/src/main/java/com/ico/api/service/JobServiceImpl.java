package com.ico.api.service;

import com.ico.core.entity.Job;
import com.ico.core.repository.JobRepository;

public class JobServiceImpl implements JobService{

    JobRepository jobRepository;

    @Override
    public void insertJob() {
        Job job = Job.builder()
                .color("빨강")
                .title("소방관")
                .image("소방관 일러스트")
                .detail("이 분은 소방관")
                .creditRating((byte) 5)
                .wage(2000)
                .build();

        jobRepository.save(job);
    }
}
