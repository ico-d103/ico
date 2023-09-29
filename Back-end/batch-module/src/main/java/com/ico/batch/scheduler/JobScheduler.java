package com.ico.batch.scheduler;

import com.ico.batch.job.InflationConfig;
import com.ico.batch.service.InflationService;
import com.ico.core.repository.ShopTransactionRepository;
import com.ico.core.service.DepositSalaryService;
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
import java.util.Map;

/**
 * Job을 시간에 맞춰 실행하는 Sheduler
 *
 * @author 변윤경
 */
@Slf4j
@RequiredArgsConstructor
@Configuration
public class JobScheduler {
    private final JobLauncher jobLauncher;
    private final JobRegistry jobRegistry;
    private final DepositSalaryService depositSalaryService;
    private final ShopTransactionRepository shopTransactionRepository;
    private final InflationService inflationService;

    @Bean
    public JobRegistryBeanPostProcessor jobRegistryBeanPostProcessor() {
        JobRegistryBeanPostProcessor postProcessor = new JobRegistryBeanPostProcessor();
        postProcessor.setJobRegistry(jobRegistry);
        return postProcessor;
    }

    // 매일 저녁 6시에 일급 갱신
    @Scheduled(cron = "0 0 18 * * *")
    public void updateSalaryJobScheduled()
            throws JobInstanceAlreadyCompleteException, JobExecutionAlreadyRunningException, JobParametersInvalidException, JobRestartException {
        JobParameters jobParameters = new JobParameters(
                Collections.singletonMap("requestTime", new JobParameter(System.currentTimeMillis()))
        );
        try {
            jobLauncher.run(jobRegistry.getJob("salaryUpdateJob"), jobParameters);
        } catch (NoSuchJobException e) {
            log.info("salaryUpdateJob을 찾을 수 없습니다.");
            throw new RuntimeException(e);
        }
    }

    // 매일 8시에 월급일인 나라의 월급 지급
    @Scheduled(cron = "0 0 8 * * *")
    public void depositSalaryJobScheduled()
            throws JobInstanceAlreadyCompleteException, JobExecutionAlreadyRunningException, JobParametersInvalidException, JobRestartException {
        JobParameters jobParameters = new JobParameters(
                Collections.singletonMap("requestTime", new JobParameter(System.currentTimeMillis()))
        );

        try {
            log.info("### 시작");
            DepositSalaryService.nationTax = new HashMap<>();

            // 월급 입금 및 세금 자동 출금
            jobLauncher.run(jobRegistry.getJob("depositSalaryJob"), jobParameters);

            // 나라의 항목별 세금 입금 및 기록
            for (Map.Entry<Long, Map<String, Integer>> entry : DepositSalaryService.nationTax.entrySet()) {
                log.info("### key : {}, value : {}", entry.getKey(), entry.getValue());

                for (Map.Entry<String, Integer> subEntry : entry.getValue().entrySet()) {
                    log.info("### subKey : {}, subValue : {}", subEntry.getKey(), subEntry.getValue());
                    depositSalaryService.addTreasuryHistory(entry.getKey(), subEntry.getKey(), subEntry.getValue());
                }
            }

        } catch (NoSuchJobException e) {
            log.info("depositSalaryJob을 찾을 수 없습니다.");
            throw new RuntimeException(e);
        }
    }

    // 00시에 교사 품절 상품 삭제
    @Scheduled(cron = "0 0 0 * * *")
    public void soldOutTeacherProductJobScheduled()
            throws JobInstanceAlreadyCompleteException, JobExecutionAlreadyRunningException, JobParametersInvalidException, JobRestartException {
        JobParameters jobParameters = new JobParameters(
                Collections.singletonMap("requestTime", new JobParameter(System.currentTimeMillis()))
        );

        try {
            jobLauncher.run(jobRegistry.getJob("soldOutTeacherProductJob"), jobParameters);

        } catch (NoSuchJobException e) {
            log.info("soldOutTeacherProductJob을 찾을 수 없습니다.");
            throw new RuntimeException(e);
        }
    }

    /**
     * 매월 15일(원급 분기일) 07시에 인플레이션 계산
     */
    @Scheduled(cron = "0 0 7 15 * *")
    public void inflationJobScheduled()
            throws JobInstanceAlreadyCompleteException, JobExecutionAlreadyRunningException, JobParametersInvalidException, JobRestartException {
        JobParameters jobParameters = new JobParameters(
                Collections.singletonMap("requestTime", new JobParameter(System.currentTimeMillis()))
        );

        try {
            log.info("[inflationJobScheduled] 거래 현황 Job 시작");
            InflationConfig.map = new HashMap<>();

            jobLauncher.run(jobRegistry.getJob("inflationJob"), jobParameters);
            log.info("[inflationJobScheduled] 거래 현황 Job 정상 종료");

            inflationService.addInflation(InflationConfig.map);
            log.info("[inflationJobScheduled] 인플레이션 추가 완료");

            shopTransactionRepository.deleteAll();
            log.info("[inflationJobScheduled] 상점 거래 내역 전체 삭제 완료");
        } catch (NoSuchJobException e) {
            log.info("[inflationJobScheduled] inflationJob 을 찾을 수 없습니다.");
            throw new RuntimeException(e);
        }

    }
}
