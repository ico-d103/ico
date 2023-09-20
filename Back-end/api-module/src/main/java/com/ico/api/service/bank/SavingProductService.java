package com.ico.api.service.bank;

import com.ico.api.dto.bank.SavingProductReqDto;
import com.ico.api.dto.bank.SavingProductStudentResDto;
import com.ico.api.dto.bank.SavingProductTeacherResDto;
import com.ico.api.dto.bank.SavingStudentResDto;
import com.ico.core.dto.SavingUpdateDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 적금 상품 Service
 *
 * @author 변윤경
 */
public interface SavingProductService {

    /**
     * 교사의 적금 상품 조회
     *
     * @param request
     * @return
     */
    List<SavingProductTeacherResDto> findAllSavingTeacher(HttpServletRequest request);


    /**
     * 학생의 적금 상품 조회
     *
     * @param request
     * @return
     */
    SavingProductStudentResDto findAllSavingStudent(HttpServletRequest request);

    /**
     * 학생의 적금 상품 디테일 조회
     * @param request
     * @param savingId
     * @return
     */
    SavingStudentResDto getSavingDetail(HttpServletRequest request, String savingId);

    /**
     * 적금 상품 추가
     *
     * @param request
     * @param dto
     */
    void addSaving(HttpServletRequest request, SavingProductReqDto dto);

    /**
     * 적금 상품 수정
     *
     * @param request
     * @param savingProductId
     * @param dto
     */
    void updateSaving(HttpServletRequest request, Long savingProductId, SavingUpdateDto dto);

    /**
     * 적금 상품 삭제
     *
     * @param savingProductId
     */
    void deleteSaving(Long savingProductId);
}
