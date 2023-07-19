package com.ico.core.repository;

import com.ico.core.entity.Power;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * 직업 권한 관련
 *
 * @author 강교철
 */
public interface PowerRepository extends JpaRepository<Power, Long> {

    List<Power> findAllByIdIn(List<Long> powerIds);
}
