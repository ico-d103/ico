package com.ico.core.repository;

import com.ico.core.entity.Nation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author 변윤경
 */
public interface NationRepository extends JpaRepository<Nation, Long> {
    Optional<Nation> findById(Long nationId);
}
