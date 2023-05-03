package com.ico.core.repository;

import com.ico.core.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findAllByNationId(Long nationId);
}
