package com.ico.batch.scheduler;

import com.ico.batch.service.DepositSalaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.configuration.JobRegistry;
import org.springframework.batch.core.configuration.support.JobRegistryBeanPostProcessor;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.launch.NoSuchJobException;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.Collections;
import java.util.HashMap;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class JobScheduler {
    private final JobLauncher jobLauncher;
    private final JobRegistry jobRegistry;
    private final DepositSalaryService depositSalaryService;

    @Bean
    public JobRegistryBeanPostProcessor jobRegistryBeanPostProcessor(){
        JobRegistryBeanPostProcessor postProcessor = new JobRegistryBeanPostProcessor();
        postProcessor.setJobRegistry(jobRegistry);
        return postProcessor;
    }

    @Scheduled(cron = "0/3 * * * * ?")
    public void updateSalaryJobScheduled()
    throws JobInstanceAlreadyCompleteException, JobExecutionAlreadyRunningException, JobParametersInvalidException, JobRestartException {
        JobParameters jobParameters = new JobParameters(
                Collections.singletonMap("requestTime", new JobParameter(System.currentTimeMillis()))
        );
        try{
            jobLauncher.run(jobRegistry.getJob("salaryUpdateJob"), jobParameters);
        }catch (NoSuchJobException e){
            log.info("salaryUpdateJob을 찾을 수 없습니다.");
            throw new RuntimeException(e);
        }
    }

    @Scheduled(cron = "0/7 * * * * ?")
    public void depositSalaryJobScheduled()
            throws JobInstanceAlreadyCompleteException, JobExecutionAlreadyRunningException, JobParametersInvalidException, JobRestartException {
        JobParameters jobParameters = new JobParameters(
                Collections.singletonMap("requestTime", new JobParameter(System.currentTimeMillis()))
        );

        try{
            jobLauncher.run(jobRegistry.getJob("depositSalaryJob"), jobParameters);

        }catch (NoSuchJobException e){
            log.info("depositSalaryJob을 찾을 수 없습니다.");
            throw new RuntimeException(e);
        }
    }
}
