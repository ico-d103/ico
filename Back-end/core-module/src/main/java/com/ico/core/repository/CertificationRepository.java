package com.ico.core.repository;

import com.ico.core.entity.Certification;
import com.ico.core.entity.TeacherProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificationRepository extends JpaRepository<Certification, Long> {

}
