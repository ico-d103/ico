package com.ico.core.repository;

import com.ico.core.entity.Nation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * @author 변윤경
 * @author 강교철
 */
public interface NationRepository extends JpaRepository<Nation, Long> {
    Optional<Nation> findById(Long nationId);

    Nation findByCode(String code);

}
