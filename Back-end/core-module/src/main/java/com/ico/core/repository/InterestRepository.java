package com.ico.core.repository;

import com.ico.core.entity.Interest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * @author 변윤경
 * @author 강교철
 */
public interface InterestRepository extends JpaRepository<Interest, Long> {
    Optional<Interest> findByNationIdAndCreditRating(Long nationId, Byte creditRating);

    List<Interest> findAllByNationIdOrderByCreditRating(Long nationId);

    List<Interest> findAllByNationId(Long nationId);
}
