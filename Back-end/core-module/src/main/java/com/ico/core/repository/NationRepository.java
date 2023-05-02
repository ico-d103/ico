package com.ico.core.repository;

import com.ico.core.entity.Nation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NationRepository extends JpaRepository<Nation, Long> {
    /**
     * @author 변윤경
     * @param nationId must not be {@literal null}.
     * @return 해당 국가 idx 반환
     */

    Optional<Nation> findById(Long nationId);
}
