package com.ico.core.repository;

import com.ico.core.entity.StudentLicense;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

/**
 * @author 강교철
 */
public interface StudentLicenseRepository extends JpaRepository<StudentLicense, Long> {

    List<StudentLicense> findAllByStudentId(Long studentId);

    List<StudentLicense> findAllByNationLicenseId(Long nationLicenseId);

    List<StudentLicense> findAllByNationId(Long nationId);

    Optional<StudentLicense> findByIdAndNationId(Long studentLicenseId, Long nationId);
}
