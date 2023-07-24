package com.ico.core.repository;

import com.ico.core.entity.JobLicense;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 직업 자격증 관련
 *
 * @author 강교철
 */
public interface JobLicenseRepository extends JpaRepository<JobLicense, Long> {
}
