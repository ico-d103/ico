package com.ico.core.repository;

import com.ico.core.entity.StudentProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * @author 변윤경
 */
public interface StudentProductRepository extends JpaRepository<StudentProduct, Long> {
    List<StudentProduct> findAllByNationId(Long nationId);

    Optional<StudentProduct> findByIdAndNationId(Long id, Long nationId);

    /**
     * 품절 학생 상품 확인 repository
     *
     * @param pageable
     * @return
     */
    @Query("SELECT s FROM StudentProduct s WHERE s.count = s.sold")
    Page<StudentProduct> findAllByCountEqualsSold(Pageable pageable);

}
