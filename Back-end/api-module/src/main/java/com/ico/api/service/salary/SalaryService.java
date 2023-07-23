package com.ico.api.service.salary;

import com.ico.api.dto.salary.SalaryPaymentReqDto;

import javax.servlet.http.HttpServletRequest;

/**
 * 월급 관련 Service
 *
 * @author 서재건
 */
public interface SalaryService {

    /**
     * 선택한 학생들의 월급 일괄 지급
     *
     * @param dto
     * @param request
     */
    void paySalary(SalaryPaymentReqDto dto, HttpServletRequest request);
}
