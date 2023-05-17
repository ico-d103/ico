package com.ico.api.service.stock;

import com.ico.api.dto.stock.StockStudentResDto;
import com.ico.api.dto.stock.StockTeacherResDto;
import com.ico.api.dto.stock.StockUploadReqDto;

import javax.servlet.http.HttpServletRequest;

/**
 * @author 변윤경
 */
public interface StockService {

    /**
     * 교사 투자 이슈 목록 조회
     *
     * @return 교사화면의 투자 이슈 정보
     */
    StockTeacherResDto getIssueTeacher(HttpServletRequest request);

    /**
     * 학생 투자 이슈 목록 조회
     * @return 학생화면의 투자 이슈 정보
     */
    StockStudentResDto getIssueStudent(HttpServletRequest request);

    /**
     * 투자 이슈 등록
     * @param dto 변동률, 이슈, 오늘의 가격
     */
    void uploadIssue(HttpServletRequest request, StockUploadReqDto dto);

    /**
     * 투자 종목 삭제
     *
     * @param request
     */
    void deleteStock(HttpServletRequest request);

}
