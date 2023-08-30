package com.ico.api.service.bank;

import com.ico.api.dto.bank.DepositStudentResDto;
import com.ico.api.dto.bank.SavingProductReqDto;
import com.ico.api.dto.bank.SavingProductStudentResDto;
import com.ico.api.dto.bank.SavingProductTeacherResDto;
import com.ico.core.dto.SavingUpdateDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author 변윤경
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SavingProductServiceImpl implements SavingProductService{
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

    }

    @Override
    public void updateSaving(HttpServletRequest request, Long savingId, SavingUpdateDto dto) {

    }

    @Override
    public void deleteSaving(Long savingId) {

    }
}
