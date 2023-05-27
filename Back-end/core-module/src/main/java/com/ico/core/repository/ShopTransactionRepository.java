package com.ico.core.repository;

import com.ico.core.document.ShopTransaction;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;


/**
 * 상점 거래내역 Repository
 *
 * @author 서재건
 */
@Repository
public interface ShopTransactionRepository extends MongoRepository<ShopTransaction, String> {

    @NotNull
    List<ShopTransaction> findAll();

    List<ShopTransaction> findAllByNationIdAndDateGreaterThanEqualAndDateLessThan(Long nationId, LocalDateTime before, LocalDateTime now);
}
