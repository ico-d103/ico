package com.ico.api.service.stock;

import com.ico.api.dto.stock.StockResTeacherDto;

/**
 * @author 변윤경
 */
public interface StockService {

    /**
     * 교사 투자 이슈 목록 조회
     *
     * @return 교사화면의 투자 이슈 정보
     */
    StockResTeacherDto getIssueTeacher();

}
