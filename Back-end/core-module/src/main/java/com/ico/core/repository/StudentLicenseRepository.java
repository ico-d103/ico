package com.ico.core.repository;

import com.ico.core.entity.NationLicense;
import com.ico.core.entity.StudentLicense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author 강교철
 */
public interface StudentLicenseRepository extends JpaRepository<StudentLicense, Long> {

    List<StudentLicense> findAllByStudentId(Long studentId);
}
