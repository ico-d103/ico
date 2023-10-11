package com.ico.api.service.inflation;

import com.ico.core.entity.ShopTransaction;
import com.ico.core.repository.ShopTransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;


/**
 * 상점 거래내역 Service 로직
 *
 * @author 서재건
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ShopTransactionServiceImpl implements ShopTransactionService {

    private final ShopTransactionRepository shopTransactionRepository;

    private final MongoTemplate mongoTemplate;

    @Override
    public void addShopTransaction(Long nationId, int amount) {
        ShopTransaction shopTransaction = ShopTransaction.builder()
                .nationId(nationId)
                .amount(amount)
                .build();
        shopTransactionRepository.save(shopTransaction);
    }

}
