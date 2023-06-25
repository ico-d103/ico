package com.ico.api.service.bank;

import com.ico.api.dto.bank.DepositProductReqDto;
import com.ico.api.dto.bank.DepositProductStudentResDto;
import com.ico.api.dto.bank.DepositProductTeacherResDto;
import com.ico.api.dto.bank.DepositStudentResDto;
import com.ico.core.dto.DepositUpdatetDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 예금 상품 Service
 *
 * @author 변윤경
 */
public interface DepositProductService {

    /**
     * 교사의 예금 상품 조회
     *
     * @param request
     * @return
     */
    List<DepositProductTeacherResDto> findAllDepositTeacher(HttpServletRequest request);


    /**
     * 학생의 예금 상품 조회
     *
     * @param request
     * @return
     */
    DepositProductStudentResDto findAllDepositStudent(HttpServletRequest request);

    /**
     * 학생의 예금 상품 디테일 조회
     *
     * @param request
     * @return
     */
    DepositStudentResDto getDepositDetail(HttpServletRequest request, String depositId);

    /**
     * 예금 상품 추가
     *
     * @param request
     * @param dto
     */
    void addDeposit(HttpServletRequest request, DepositProductReqDto dto);

    /**
     * 예금 상품 수정
     *
     * @param request
     * @param depositId
     * @param dto
     */
    void updateDeposit(HttpServletRequest request, Long depositId, DepositUpdatetDto dto);

    /**
     * 예금 상품 삭제
     *
     * @param depositId
     */
    void deleteDeposit(Long depositId);

}
