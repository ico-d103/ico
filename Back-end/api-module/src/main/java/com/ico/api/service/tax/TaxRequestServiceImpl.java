package com.ico.api.service.tax;

import com.ico.core.entity.Nation;
import com.ico.core.entity.Tax;
import com.ico.core.entity.TaxRequest;
import com.ico.core.repository.TaxRepository;
import com.ico.core.repository.TaxRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author 강교철
 */
@Service
@RequiredArgsConstructor
public class TaxRequestServiceImpl implements TaxRequestService{

    private final TaxRequestRepository taxRequestRepository;
    private final TaxRepository taxRepository;

    @Override
    public void createTax(Nation nation) {
        List<TaxRequest> taxs = taxRequestRepository.findAll();

        for (TaxRequest tax : taxs) {
            Tax result = Tax.builder()
                    .nation(nation)
                    .title(tax.getTitle())
                    .detail(tax.getDetail())
                    .amount(tax.getAmount())
                    .type(tax.getType())
                    .build();
            taxRepository.save(result);
        }
    }
}
