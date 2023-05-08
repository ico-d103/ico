package com.ico.core.repository;

import com.ico.core.entity.Immigration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


/**
 * 입국 심사 관련 repository
 *
 * @author 강교철
 * @author 서재건
 */
public interface ImmigrationRepository extends JpaRepository<Immigration, Long> {

    Immigration findByStudentId(Long studentId);

    List<Immigration> findAllByNationId(Long nationId);
}
