package com.ico.core.repository;

import com.ico.core.entity.Tax;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaxRepository extends JpaRepository<Tax, Long> {

    List<Tax> findAllByNationId(Long nationId);
}
