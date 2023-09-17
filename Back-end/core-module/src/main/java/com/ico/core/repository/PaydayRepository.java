package com.ico.core.repository;

import com.ico.core.entity.Payday;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * 월급일자 Repository
 *
 * @author 변윤경
 */
public interface PaydayRepository extends JpaRepository<Payday, Long> {
    List<Payday> findAllByNationIdOrderByDate(Long nationId);

    Optional<Payday> findByNationIdAndDate(Long nationId, Byte date);
}
