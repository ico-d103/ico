package com.ico.core.repository;

import com.ico.core.entity.TeacherProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * @author 변윤경
 */
public interface TeacherProductRepository extends JpaRepository<TeacherProduct, Long> {
    Optional<TeacherProduct> findByNationIdAndTitle(Long nationId, String title);

    List<TeacherProduct> findAllByNationId(Long nationId);

    Optional<TeacherProduct> findByIdAndNationId(Long id, Long nationId);

    /**
     * 품절 교사 상품 확인 repository
     *
     * @param pageable
     * @return
     */
    @Query("SELECT s FROM TeacherProduct s WHERE s.count = s.sold")
    Page<TeacherProduct> findAllByCountEqualsSold(Pageable pageable);
}
