package com.ico.api.service.bank;

import com.ico.api.dto.bank.DepositStudentResDto;
import com.ico.api.dto.bank.SavingProductReqDto;
import com.ico.api.dto.bank.SavingProductStudentResDto;
import com.ico.api.dto.bank.SavingProductTeacherResDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.dto.SavingUpdateDto;
import com.ico.core.entity.Nation;
import com.ico.core.entity.SavingProduct;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.SavingProductRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.List;

/**
 * @author 변윤경
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SavingProductServiceImpl implements SavingProductService{
    private final JwtTokenProvider jwtTokenProvider;
    private final NationRepository nationRepository;
    private final StudentRepository studentRepository;
    private final SavingProductRepository savingProductRepository;


    @Override
    public List<SavingProductTeacherResDto> findAllSavingTeacher(HttpServletRequest request) {
        return null;
    }

    @Override
    public SavingProductStudentResDto findAllSavingStudent(HttpServletRequest request) {
        return null;
    }

    @Override
    public DepositStudentResDto getDepositDetail(HttpServletRequest request, String depositId) {
        return null;
    }

    @Override
    public void addSaving(HttpServletRequest request, SavingProductReqDto dto) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        List<Byte> interest = dto.getInterest();

        // 이자율 리스트 값이 10개보다 많거나 적을 때
        if (interest.size() != 10) {
            throw new CustomException(ErrorCode.BAD_UPDATE_INTEREST);
        }

        // 이자율이 0미만 인지 확인
        if (Collections.min(interest) < 0 ) {
            throw new CustomException(ErrorCode.LOWER_INTEREST);
        }

        // 이자율이 신용등급이 낮을수록 낮아지는지 확인
        if (!isDescending(interest)) {
            throw new CustomException(ErrorCode.INTEREST_NOT_DESCENDING);
        }

        SavingProduct savingProduct = SavingProduct.builder()
                .nation(nation)
                .title(dto.getTitle())
                .count(dto.getCount())
                .amount(dto.getAmount())
                .grade_1(interest.get(0))
                .grade_2(interest.get(1))
                .grade_3(interest.get(2))
                .grade_4(interest.get(3))
                .grade_5(interest.get(4))
                .grade_6(interest.get(5))
                .grade_7(interest.get(6))
                .grade_8(interest.get(7))
                .grade_9(interest.get(8))
                .grade_10(interest.get(9))
                .build();

        savingProductRepository.save(savingProduct);
    }

    @Override
    public void updateSaving(HttpServletRequest request, Long savingId, SavingUpdateDto dto) {

    }

    @Override
    public void deleteSaving(Long savingId) {

    }

    /**
     * 신용등급이 낮아질수록 이자율이 낮아지는지 체크(내림차순 체크)
     *
     * @param list 입력받은 수정 이자율
     * @return boolean
     */
    private boolean isDescending(List<Byte> list) {
        for (int i = 1; i < list.size(); i++) {
            if(list.get(i-1) < list.get(i)) {
                return false;
            }
        }
        return true;
    }
}

