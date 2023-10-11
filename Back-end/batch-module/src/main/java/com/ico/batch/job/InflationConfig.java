package com.ico.batch.job;

import com.ico.core.entity.ShopTransaction;
import com.ico.core.entity.Student;
import com.ico.core.repository.ShopTransactionRepository;
import com.ico.core.repository.StudentRepository;
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
import java.util.List;
import java.util.Map;

/**
 * 15일(분기일)에 거래 현황 등록
 *
 * @author 서재건
 */
@Slf4j
@RequiredArgsConstructor
@Component
public class InflationConfig {

    public final JobBuilderFactory jobBuilderFactory;
    public final StepBuilderFactory stepBuilderFactory;

    public final ShopTransactionRepository shopTransactionRepository;

    public final StudentRepository studentRepository;

    public static Map<Long, Long[]> map;

    /**
     * 상점 총 거래액과 학생 계좌 총합을 계산하여 inflation 생성
     *
     * @param shopTransactionStep 상점 거래에서 총 거래액 추출
     * @param studentAmountStep 학생 계좌 총합 추출
     * @return
     */
    @Bean
    public Job inflationJob(Step shopTransactionStep, Step studentAmountStep) {
        log.info("[inflationJob] start");
        return jobBuilderFactory.get("inflationJob")
                .incrementer(new RunIdIncrementer())
                .start(shopTransactionStep)
                .next(studentAmountStep)
                .build();
    }

    @Bean
    @JobScope
    public Step shopTransactionStep(RepositoryItemReader<ShopTransaction> shopTransactionReader, ItemWriter<ShopTransaction> shopTransactionWriter) {
        log.info("[shopTransactionStep] start");
        return stepBuilderFactory.get("shopTransactionStep")
                .<ShopTransaction, ShopTransaction>chunk(10)
                .reader(shopTransactionReader)
                .writer(shopTransactionWriter)
                .build();
    }

    @Bean
    @StepScope
    public RepositoryItemReader<ShopTransaction> shopTransactionReader() {
        log.info("[shopTransactionReader] start");
        return new RepositoryItemReaderBuilder<ShopTransaction>()
                .name("shopTransactionReader")
                .repository(shopTransactionRepository)
                .methodName("findAll")
                .pageSize(10)
                .sorts(Collections.singletonMap("_id", Sort.Direction.ASC))
                .build();
    }

    @Bean
    @StepScope
    public ItemWriter<ShopTransaction> shopTransactionWriter() {
        log.info("[shopTransactionWriter] start");
        return new ItemWriter<ShopTransaction>() {
            @Override
            public void write(List<? extends ShopTransaction> items) throws Exception {
                for (ShopTransaction shopTransaction : items) {
                    map.compute(shopTransaction.getNationId(), (key, value) -> {
                        if (value == null) {
                            value = new Long[] { 0L, 0L };
                        }
                        value[0] += shopTransaction.getAmount();
                        return value;
                    });
                }
            }
        };
    }

    @Bean
    @JobScope
    public Step studentAmountStep(RepositoryItemReader<Student> studentReader, ItemProcessor<Student, Student> studentProcessor, ItemWriter<Student> studentWriter) {
        log.info("[studentAmountStep] start");
        return stepBuilderFactory.get("studentAmountStep")
                .<Student, Student>chunk(10)
                .reader(studentReader)
                .processor(studentProcessor)
                .writer(studentWriter)
                .build();
    }

    @Bean
    @StepScope
    public RepositoryItemReader<Student> studentReader() {
        log.info("[studentReader] start");
        return new RepositoryItemReaderBuilder<Student>()
                .name("studentItemReader")
                .repository(studentRepository)
                .methodName("findAll")
                .pageSize(10)
                .sorts(Collections.singletonMap("id", Sort.Direction.ASC))
                .build();
    }

    @Bean
    @StepScope
    public ItemProcessor<Student, Student> studentProcessor() {
        log.info("[studentProcessor] start");
        return student -> {
            if (student.getNation() == null) {
                return null;
            }
            return student;
        };
    }

    @Bean
    @StepScope
    public ItemWriter<Student> studentWriter() {
        log.info("[studentWriter] start");
        return new ItemWriter<Student>() {
            @Override
            public void write(List<? extends Student> items) throws Exception {
                for (Student student : items) {
                    Long nationId = student.getNation().getId();
                    map.compute(nationId, (key, value) -> {
                        if (value == null) {
                            value = new Long[] { 0L, 0L };
                        }
                        value[1] += student.getAccount();
                        return value;
                    });
                }
            }
        };
    }

}
