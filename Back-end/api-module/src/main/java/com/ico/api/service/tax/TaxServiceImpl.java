package com.ico.api.service.tax;

import com.ico.core.dto.TaxReqDto;
import com.ico.api.dto.tax.TaxResDto;
import com.ico.core.entity.Tax;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.TaxRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 국세 관련 Service 로직
 *
 * @author 서재건
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class TaxServiceImpl implements TaxService{

    private final TaxRepository taxRepository;

    @Override
    public List<TaxResDto> findAllTax() {
        // TODO: 로그인 구현 시 토큰에서 값 추출
        Long nationId = 1L;

        List<Tax> taxList = taxRepository.findAllByNationId(nationId);
        List<TaxResDto> dtoList = new ArrayList<>();
        for (Tax tax : taxList) {
            dtoList.add(new TaxResDto().of(tax));
        }
        return dtoList;
    }

    @Override
    public void updateTax(Long taxId, TaxReqDto dto) {
        Tax tax = taxRepository.findById(taxId)
                .orElseThrow(() -> new CustomException(ErrorCode.TAX_NOT_FOUND));

        tax.updateTax(dto);

        taxRepository.save(tax);
    }


}
