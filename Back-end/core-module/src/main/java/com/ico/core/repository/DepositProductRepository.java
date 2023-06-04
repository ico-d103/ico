package com.ico.core.repository;

import com.ico.core.entity.DepositProduct;
import com.ico.core.entity.Nation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * 예금 상품 관련 Repository
 *
 * @author 변윤경
 */
public interface DepositProductRepository extends JpaRepository<DepositProduct, Long> {
    /**
     * 나라의 모든 예금 상품 조회
     *
     * @param nationId
     * @return
     */
    List<DepositProduct> findAllByNationId(Long nationId);

    /**
     * id로 예금 상품 찾기
     *
     * @param id must not be {@literal null}.
     * @return
     */
    Optional<DepositProduct> findByIdAndNationId(Long id, Long nationId);
}
