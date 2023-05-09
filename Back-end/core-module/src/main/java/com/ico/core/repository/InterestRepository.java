package com.ico.core.repository;

import com.ico.core.entity.Interest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InterestRepository extends JpaRepository<Interest, Long> {
    Optional<Interest> findByNationIdAndCreditRating(Long nationId, Byte creditRating);
}
