package com.ico.core.repository;

import com.ico.core.entity.Certification;
import com.ico.core.entity.TeacherProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CertificationRepository extends JpaRepository<Certification, Long> {

    Page<Certification> findAll(Pageable pageable);

    Optional<Certification> findByTeacherId(Long teacherId);

}
