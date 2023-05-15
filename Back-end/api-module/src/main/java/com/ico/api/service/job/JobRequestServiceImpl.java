package com.ico.api.service.job;

import com.ico.core.entity.JobRequest;
import com.ico.core.entity.Nation;
import com.ico.core.entity.StudentJob;
import com.ico.core.repository.JobRequestRepository;
import com.ico.core.repository.StudentJobRepository;
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
    private final StudentJobRepository jobRepository;


    @Override
    public void createJob(Nation nation) {
        List<JobRequest> jobs = jobRequestRepository.findAll();

        for (JobRequest job : jobs) {
            StudentJob result = StudentJob.builder()
                    .nation(nation)
                    .title(job.getTitle())
                    .detail(job.getDetail())
                    .image(job.getImage())
                    .wage(job.getWage())
                    .creditRating((byte) 6)
                    .count((byte) 0)
                    .total((byte) 0)
                    .color(job.getColor())
                    .build();
            jobRepository.save(result);
            log.info("job 생성");
        }
    }
}
