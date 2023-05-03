package com.ico.core.repository;

import com.ico.core.entity.TeacherProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeacherProductRepository extends JpaRepository<TeacherProduct, Long> {
    Optional<TeacherProduct> findByNationIdAndTitle(Long nationId, String title);
}
