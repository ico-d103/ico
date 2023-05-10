package com.ico.api.service.stock;

import com.ico.api.dto.stock.StockStudentResDto;
import com.ico.api.dto.stock.StockTeacherResDto;
import com.ico.api.dto.stock.StockUploadReqDto;

/**
 * @author 변윤경
 */
public interface StockService {

    /**
     * 교사 투자 이슈 목록 조회
     *
     * @return 교사화면의 투자 이슈 정보
     */
    StockTeacherResDto getIssueTeacher();

    /**
     * 학생 투자 이슈 목록 조회
     * @return 학생화면의 투자 이슈 정보
     */
    StockStudentResDto getIssueStudent();

    /**
     * 투자 이슈 등록
     * @param dto
     */
    void uploadIssue(StockUploadReqDto dto);

}
