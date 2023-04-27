package com.ico.core.repository;

import com.ico.core.entity.Immigration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImmigrationRepository extends JpaRepository<Immigration, Long> {
}
