package com.ico.api.service.tax;

import com.ico.core.entity.Nation;

/**
 * @author 강교철
 */
public interface TaxRequestService {

    /**
     * tax 생성
     * @param nation
     */
    void createTax(Nation nation);
}
