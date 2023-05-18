package com.ico.batch.job;

import com.ico.core.entity.TeacherProduct;
import com.ico.core.repository.TeacherProductRepository;
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
 * 품절 교사 상품 일괄 삭제 JobConfig
 *
 * @author 변윤경
 */
@Slf4j
@Configuration
@RequiredArgsConstructor
public class SoldOutTeacherProductConfig {
    public final JobBuilderFactory jobBuilderFactory;
    public final StepBuilderFactory stepBuilderFactory;

    // Repository
    public final TeacherProductRepository teacherProductRepository;

    @Bean
    public Job soldOutTeacherProductJob(Step soldOutTeacherProductStep) {
        log.info(">>>>>> soldOutTeacherProductJob");
        return jobBuilderFactory.get("soldOutTeacherProductJob")
                .incrementer(new RunIdIncrementer())
                .start(soldOutTeacherProductStep)
                .build();
    }

    @Bean
    @JobScope
    public Step soldOutTeacherProductStep(RepositoryItemReader soldOutTeacherProductReader, ItemProcessor soldOutTeacherProductProcessor, ItemWriter soldOutTeacherProductWriter) {
        log.info(">>>>>> soldOutTeacherProductStep");
        return stepBuilderFactory.get("soldOutTeacherProductStep")
                .<TeacherProduct, TeacherProduct>chunk(10)
                .reader(soldOutTeacherProductReader)
                .processor(soldOutTeacherProductProcessor)
                .writer(soldOutTeacherProductWriter)
                .build();
    }

    @Bean
    @StepScope
    public RepositoryItemReader<TeacherProduct> soldOutTeacherProductReader() {
        log.info(">>>>>> soldOutTeacherProductReader");
        return new RepositoryItemReaderBuilder<TeacherProduct>()
                .name("soldOutTeacherProductReader")
                .repository(teacherProductRepository)
                .methodName("findAllByCountEqualsSold")
                .arguments()
                .pageSize(10)
                .sorts(Collections.singletonMap("id", Sort.Direction.ASC))
                .build();
    }

    @Bean
    @StepScope
    public ItemProcessor<TeacherProduct, TeacherProduct> soldOutTeacherProductProcessor() {
        log.info(">>>>>> soldOutTeacherProductProcessor");
        return product -> {
            log.info("** teacherProduct name : {}", product.getTitle());
            teacherProductRepository.delete(product);
            return product;
        };
    }


    @Bean
    @StepScope
    public ItemWriter<TeacherProduct> soldOutTeacherProductWriter() {
        return new ItemWriter<TeacherProduct>() {
            @Override
            public void write(List<? extends TeacherProduct> items) throws Exception {
                for (TeacherProduct product : items) {
                    log.info("** [soldOutTeacherProductWriter] 품절된 상품 : {}", product.getTitle());
                }
            }
        };
    }
}
