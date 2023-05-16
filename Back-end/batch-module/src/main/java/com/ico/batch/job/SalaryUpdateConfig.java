package com.ico.batch.job;

import com.ico.core.entity.Student;
import com.ico.core.repository.StudentJobRepository;
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
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Sort;

import java.util.Collections;
import java.util.List;

/**
 * 매일 일급을 Student Salary에 더해주는 JobConfig
 *
 * @author 변윤경
 */
@Slf4j
@Configuration
@RequiredArgsConstructor
public class SalaryUpdateConfig {
    public final JobBuilderFactory jobBuilderFactory;
    public final StepBuilderFactory stepBuilderFactory;

    // Repository
    public final StudentRepository studentRepository;
    public final StudentJobRepository studentJobRepository;

    @Bean
    public Job salaryUpdateJob(Step salaryUpdateStep) {
        log.info(">>>>>> salaryUpdateJob");
        return jobBuilderFactory.get("salaryUpdateJob")
                .incrementer(new RunIdIncrementer())
                .start(salaryUpdateStep)
                .build();
    }

    @Bean
    @JobScope
    public Step salaryUpdateStep(RepositoryItemReader salaryUpdateReader, ItemProcessor salaryUpdateProcessor, ItemWriter salaryUpdateWriter) {
        log.info(">>>>>> salaryUpdateStep");
        return stepBuilderFactory.get("salaryUpdateStep")
                .<Student, Student>chunk(10)
                .reader(salaryUpdateReader)
                .processor(salaryUpdateProcessor)
                .writer(salaryUpdateWriter)
                .build();
    }

    @Bean
    @StepScope
    public RepositoryItemReader<Student> salaryUpdateReader() {
        log.info(">>>>>> salaryUpdateReader");
        return new RepositoryItemReaderBuilder<Student>()
                .name("salaryUpdateReader")
                .repository(studentRepository)
                .methodName("findByStudentJobIsNotNull")
                .arguments()
                .pageSize(10)
                .sorts(Collections.singletonMap("nationId", Sort.Direction.ASC))
                .build();
    }

    @Bean
    @StepScope
    public ItemProcessor<Student, Student> salaryUpdateProcessor() {
        log.info(">>>>>> salaryUpdateProcessor");
        return student -> {
            log.info("student name : {}", student.getName());
            int todaySalary = studentJobRepository.findById(student.getStudentJob().getId()).get().getWage();
            student.setSalary(student.getSalary() + todaySalary);
            return student;
        };
    }

    @Bean
    @StepScope
    public ItemWriter<Student> salaryUpdateWriter() {
        log.info(">>>>>> salaryUpdateWriter");
        return new ItemWriter<Student>() {
            @Override
            public void write(List<? extends Student> items) throws Exception {
                for (Student student : items) {
                    log.info("[SalaryUpdateWriter] 직업있는 학생 : {}", student.getName());
                }
            }
        };
    }

}