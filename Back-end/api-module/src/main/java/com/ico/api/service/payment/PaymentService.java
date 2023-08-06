package com.ico.api.service.payment;

import com.ico.api.dto.payment.PaymentSalaryReqDto;

import javax.servlet.http.HttpServletRequest;

/**
 * 월급 관련 Service
 *
 * @author 서재건
 */
public interface PaymentService {

    /**
     * 선택한 학생들의 월급 일괄 지급
     *
     * @param dto
     * @param request
     */
    void paySalary(PaymentSalaryReqDto dto, HttpServletRequest request);
}
