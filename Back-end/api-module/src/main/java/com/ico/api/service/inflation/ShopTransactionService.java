package com.ico.api.service.inflation;

/**
 * 상점 거래내역 Service
 *
 * @author 서재건
 */
public interface ShopTransactionService {

    /**
     * 상점에서 발생하는 거래 내역 기록
     *
     * @param nationId
     * @param amount
     */
    void addShopTransaction(Long nationId, int amount);

}
