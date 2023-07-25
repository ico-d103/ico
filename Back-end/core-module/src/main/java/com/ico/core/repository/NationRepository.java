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

    /**
     * 나라 이름 중복 체크
     * 있다면 조회를 멈추고 true 반환
     * @param title
     * @return
     */
    boolean existsByTitle(String title);

}
