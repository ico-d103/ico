package com.ico.core.repository;

import com.ico.core.entity.Immigration;
import org.springframework.data.jpa.repository.JpaRepository;


/**
 * @author 강교철
 */
public interface ImmigrationRepository extends JpaRepository<Immigration, Long> {

    Immigration findByStudentId(Long studentId);
}
