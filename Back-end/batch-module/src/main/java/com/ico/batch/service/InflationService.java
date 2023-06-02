package com.ico.batch.service;

import com.ico.core.document.Inflation;
import com.ico.core.repository.InflationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * 상점 거래 내역 Service
 *
 * @author 서재건
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class InflationService {

    private final InflationRepository inflationRepository;

    /**
     * 상점 총 거래액, 학셍 계좌 총합으로 inflation 추가
     *
     * @param map key : nationId, value : {상점 총 거래액, 학셍 계좌 총합}
     */
    public void addInflation(Map<Long, Long[]> map) {
        for (Long nationId : map.keySet()) {
            Long[] total = map.get(nationId);
            Inflation inflation = Inflation.builder()
                    .nationId(nationId)
                    .totalAmount(total[0])
                    .totalAccount(total[1])
                    .build();
            inflationRepository.insert(inflation);
        }
    }

}
