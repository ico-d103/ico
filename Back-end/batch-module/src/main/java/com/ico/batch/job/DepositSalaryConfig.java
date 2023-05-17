package com.ico.batch.job;

import com.ico.batch.service.DepositSalaryService;
import com.ico.core.code.TaxType;
import com.ico.core.entity.Student;
import com.ico.core.entity.Tax;
import com.ico.core.repository.StudentRepository;
import com.ico.core.repository.TaxRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.data.RepositoryItemReader;
import org.springframework.batch.item.data.builder.RepositoryItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 15일에 월급 일괄 지금하는 JobConfig
 *
 * @author 변윤경
 */
@Slf4j
@RequiredArgsConstructor
@Component
public class DepositSalaryConfig {
    public final JobBuilderFactory jobBuilderFactory;
    public final StepBuilderFactory stepBuilderFactory;

    // Service
    public final DepositSalaryService depositSalaryService;

    // Repository
    public final StudentRepository studentRepository;
    public final TaxRepository taxRepository;


    @Bean
    public Job depositSalaryJob(Step depositSalaryStep) {
        log.info(">>>>>> depositSalaryJob");
        return jobBuilderFactory.get("depositSalaryJob")
                .incrementer(new RunIdIncrementer())
                .start(depositSalaryStep)
                .build();
    }

    @Bean
    @JobScope
    public Step depositSalaryStep(RepositoryItemReader depositSalaryReader, ItemProcessor depositSalaryProcessor, ItemWriter depositSalaryWriter) {
        log.info(">>>>>> depositSalaryStep");
        return stepBuilderFactory.get("depositSalaryStep")
                .<Student, Student>chunk(10)
                .reader(depositSalaryReader)
                .processor(depositSalaryProcessor)
                .writer(depositSalaryWriter)
                .build();
    }

    @Bean
    @StepScope
    public RepositoryItemReader<Student> depositSalaryReader() {
        log.info(">>>>>> depositSalaryReader");
        return new RepositoryItemReaderBuilder<Student>()
                .name("depositSalaryReader")
                .repository(studentRepository)
                .methodName("findBySalaryGreaterThan")
                .arguments(0)
                .pageSize(10)
                .sorts(Collections.singletonMap("nationId", Sort.Direction.ASC))
                .build();
    }

    @Bean
    @StepScope
    public ItemProcessor<Student, Student> depositSalaryProcessor() {
        log.info(">>>>>> depositSalaryProcessor");
        return student -> {
            long nationId = student.getNation().getId();
            long studentId = student.getId();

            log.info("student name : {}", student.getName());

            // 거래 내역 기록
            depositSalaryService.addTransactionDeposit(studentId, student.getSalary());

            // 세금 출금 내역 기록
            int totalTax = 0;
            // 나라의 세금 항목들
            List<Tax> taxes = taxRepository.findAllByNationId(nationId);
            for (Tax tax : taxes) {
                int amount;
                if (tax.getType() == TaxType.PERCENT) {
                    amount = student.getSalary() * tax.getAmount() / 100;
                } else {
                    amount = tax.getAmount();
                }

                // 세금 항목별 금액에 학생의 세금 더하기
                log.info("title : {}, amount : {}, type : {}", tax.getTitle(), amount, tax.getType());
                DepositSalaryService.addTax((HashMap<Long, Map<String, Integer>>) DepositSalaryService.nationTax, nationId, amount, tax.getTitle());

                // 학생의 총 세금 계산
                totalTax += amount;

                // 세금 기록
                depositSalaryService.addTransactionWithdraw(studentId, amount, tax.getTitle());
            }

            // 세후 월급 계산
            log.info("{}의 세후 월급 : {}", student.getName(), student.getSalary() - totalTax);
            int afterTax = student.getSalary() - totalTax;

            // 잔고 수정(세후 월급 입금)
            student.setAccount(student.getAccount() + afterTax);

            // 일급 누적액 0으로 초기화
            student.setSalary(0);
            return student;
        };
    }

    @Bean
    @StepScope
    public ItemWriter<Student> depositSalaryWriter() {
        log.info(">>>>>> depositSalaryWriter");
        return new ItemWriter<Student>() {
            @Override
            public void write(List<? extends Student> items) throws Exception {
                for (Student student : items) {
                    log.info("[depositSalaryWriter] 월급을 받을 학생 : {}", student.getName());
                }
            }
        };
    }
}
