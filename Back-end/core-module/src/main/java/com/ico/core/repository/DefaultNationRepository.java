package com.ico.core.repository;

import com.ico.core.data.DefaultNation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DefaultNationRepository extends MongoRepository<DefaultNation, String> {
}
