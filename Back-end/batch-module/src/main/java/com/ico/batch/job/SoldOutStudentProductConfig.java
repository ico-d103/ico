package com.ico.batch.job;

import com.ico.core.entity.StudentProduct;
import com.ico.core.repository.StudentProductRepository;
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
 * 품절 학생 상품 일괄 삭제 JobConfig
 *
 * @author 변윤경
 */
@Slf4j
@Configuration
@RequiredArgsConstructor
public class SoldOutStudentProductConfig {
    public final JobBuilderFactory jobBuilderFactory;
    public final StepBuilderFactory stepBuilderFactory;

    // Repository
    public final StudentProductRepository studentProductRepository;

    @Bean
    public Job soldOutStudentProductJob(Step soldOutStudentProductStep) {
        log.info(">>>>>> soldOutStudentProductJob");
        return jobBuilderFactory.get("soldOutStudentProductJob")
                .incrementer(new RunIdIncrementer())
                .start(soldOutStudentProductStep)
                .build();
    }

    @Bean
    @JobScope
    public Step soldOutStudentProductStep(RepositoryItemReader soldOutStudentProductReader, ItemProcessor soldOutStudentProductProcessor, ItemWriter soldOutStudentProductWriter) {
        log.info(">>>>>> soldOutStudentProductStep");
        return stepBuilderFactory.get("soldOutStudentProductStep")
                .<StudentProduct, StudentProduct>chunk(10)
                .reader(soldOutStudentProductReader)
                .processor(soldOutStudentProductProcessor)
                .writer(soldOutStudentProductWriter)
                .build();
    }

    @Bean
    @StepScope
    public RepositoryItemReader<StudentProduct> soldOutStudentProductReader() {
        log.info(">>>>>> soldOutStudentProductReader");
        return new RepositoryItemReaderBuilder<StudentProduct>()
                .name("soldOutStudentProductReader")
                .repository(studentProductRepository)
                .methodName("findAllByCountEqualsSold")
                .arguments()
                .pageSize(10)
                .sorts(Collections.singletonMap("id", Sort.Direction.ASC))
                .build();
    }

    @Bean
    @StepScope
    public ItemProcessor<StudentProduct, StudentProduct> soldOutStudentProductProcessor() {
        log.info(">>>>>> soldOutStudentProductProcessor");
        return product -> {
            log.info("*** studentProduct name : {}", product.getTitle());
            studentProductRepository.delete(product);
            return product;
        };
    }


    @Bean
    @StepScope
    public ItemWriter<StudentProduct> soldOutStudentProductWriter() {
        return new ItemWriter<StudentProduct>() {
            @Override
            public void write(List<? extends StudentProduct> items) throws Exception {
                for (StudentProduct product : items) {
                    log.info("*** [soldOutStudentProductWriter] 품절된 상품 : {}", product.getTitle());
                }
            }
        };
    }
}
