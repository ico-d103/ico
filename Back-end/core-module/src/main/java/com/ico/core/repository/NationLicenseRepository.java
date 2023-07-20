package com.ico.core.repository;

import com.ico.core.entity.NationLicense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * @author 강교철
 */
public interface NationLicenseRepository extends JpaRepository<NationLicense, Long> {

    List<NationLicense> findAllByNationId(Long nationId);
    Optional<NationLicense> findBySubjectAndNationId(String subject, Long nationId);
    Optional<NationLicense> findByNationIdAndId(Long nationId, Long nationLicenseId);
}
