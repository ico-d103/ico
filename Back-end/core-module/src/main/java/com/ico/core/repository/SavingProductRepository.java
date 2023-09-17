package com.ico.core.repository;

import com.ico.core.entity.SavingProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * 적금 상품 관련 Repository
 *
 * @author 변윤경
 */
public interface SavingProductRepository extends JpaRepository<SavingProduct, Long> {
    /**
     * 나라의 모든 적금 상품 조회
     *
     * @param nationId
     * @return
     */
    List<SavingProduct> findAllByNationId(Long nationId);

    /**
     * id로 적금 상품 찾기
     *
     * @param id
     * @param nationId
     * @return
     */
    Optional<SavingProduct> findByIdAndNationId(Long id, Long nationId);
}
