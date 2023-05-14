package com.ico.api.service.job;

import com.ico.core.entity.Job;
import com.ico.core.entity.JobRequest;
import com.ico.core.entity.Nation;
import com.ico.core.repository.JobRepository;
import com.ico.core.repository.JobRequestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author 강교철
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class JobRequestServiceImpl implements JobRequestService{

    private final JobRequestRepository jobRequestRepository;
    private final JobRepository jobRepository;


    @Override
    public void saveJob(Nation nation) {
        List<JobRequest> jobs = jobRequestRepository.findAll();
        for (JobRequest job : jobs) {
            Job result = Job.builder()
                    .nation(nation)
                    .title(job.getTitle())
                    .detail(job.getDetail())
                    .image(job.getImage())
                    .wage(job.getWage())
                    .creditRating(job.getCreditRating())
                    .count((byte) 0)
                    .total((byte) 0)
                    .color(job.getColor())
                    .build();
            jobRepository.save(result);
            log.info("job 생성");
        }
    }
}
