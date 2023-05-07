package com.ico.core.repository;

import com.ico.core.entity.Nation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * @author 변윤경
 * @author 강교철
 */
public interface NationRepository extends JpaRepository<Nation, Long> {
    Optional<Nation> findById(Long nationId);

    Optional<Nation> findByCode(String code);

    Optional<Nation> findByTitle(String title);

}
