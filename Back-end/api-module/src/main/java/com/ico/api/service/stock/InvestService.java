package com.ico.api.service.stock;

/**
 * @author 변윤경
 */
public interface InvestService {
    /**
     * 주식 매수
     *
     * @param price 현재 지수
     * @param amount 매수 금액
     */
    void buyStock(double price, int amount);

    /**
     * 주식 매도
     */
    void sellStock();
}
