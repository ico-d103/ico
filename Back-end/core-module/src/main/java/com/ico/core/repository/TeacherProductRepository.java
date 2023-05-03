package com.ico.core.repository;

import com.ico.core.entity.Nation;
import com.ico.core.entity.TeacherProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherProductRepository extends JpaRepository<TeacherProduct, Long> {
    boolean existsByNationAndTitle(Nation nation, String title);
}
