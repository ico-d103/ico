package com.ico.core.repository;

import com.ico.core.entity.TeacherProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * @author 변윤경
 */
public interface TeacherProductRepository extends JpaRepository<TeacherProduct, Long> {
    Optional<TeacherProduct> findByNationIdAndTitle(Long nationId, String title);

    List<TeacherProduct> findAllByNationId(Long nationId);
}
