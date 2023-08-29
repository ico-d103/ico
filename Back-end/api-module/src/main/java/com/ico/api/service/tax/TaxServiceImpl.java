package com.ico.api.service.tax;

import com.ico.api.user.JwtTokenProvider;
import com.ico.core.code.Role;
import com.ico.core.code.TaxType;
import com.ico.core.dto.TaxReqDto;
import com.ico.api.dto.tax.TaxResDto;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Student;
import com.ico.core.entity.Tax;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.StudentRepository;
import com.ico.core.repository.TaxRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * 국세 관련 Service 로직
 *
 * @author 서재건
 * @author 강교철
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class TaxServiceImpl implements TaxService{

    private final TaxRepository taxRepository;

    private final NationRepository nationRepository;

    private final JwtTokenProvider jwtTokenProvider;
    private final StudentRepository studentRepository;

    @Override
    public List<TaxResDto> findAllTax(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        List<Tax> taxList = taxRepository.findAllByNationId(nationId);
        List<TaxResDto> dtoList = new ArrayList<>();
        for (Tax tax : taxList) {
            dtoList.add(new TaxResDto().of(tax));
        }
        return dtoList;
    }

    @Override
    public void updateTax(Long taxId, TaxReqDto dto, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        checkRoleAndTaxPower(token);
        Long nationId = jwtTokenProvider.getNation(token);

        Tax tax = taxRepository.findByIdAndNationId(taxId, nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.TAX_NOT_FOUND));

        tax.updateTax(dto);

        taxRepository.save(tax);
    }

    @Override
    public void addTax(TaxReqDto dto, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        checkRoleAndTaxPower(token);
        Long nationId = jwtTokenProvider.getNation(token);

        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));
        Tax tax = Tax.builder()
                .nation(nation)
                .title(dto.getTitle())
                .detail(dto.getDetail())
                .amount(dto.getAmount())
                .type(dto.getType() == 0 ? TaxType.PERCENT : TaxType.INT)
                .build();

        taxRepository.save(tax);
    }

    @Override
    public void deleteTax(Long taxId, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        checkRoleAndTaxPower(token);
        Long nationId = jwtTokenProvider.getNation(token);

        Tax tax = taxRepository.findByIdAndNationId(taxId, nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.TAX_NOT_FOUND));
        taxRepository.delete(tax);
    }

    /**
     * 학생이 요청할 때는 권한 확인
     *
     * @param token
     */
    private void checkRoleAndTaxPower(String token) {
        Role role = jwtTokenProvider.getRole(token);

        if (role == Role.STUDENT) {
            Student student = studentRepository.findById(jwtTokenProvider.getId(token))
                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
            String emPowered = student.getEmpowered();
            // 권한이 없거나 비어있다면 Error
            if (emPowered == null || emPowered.trim().isEmpty() || !emPowered.contains("2")) {
                throw new CustomException(ErrorCode.WRONG_ROLE);
            }
        }
    }
}
