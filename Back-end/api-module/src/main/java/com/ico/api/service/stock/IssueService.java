package com.ico.api.service.stock;

import com.ico.api.dto.stock.IssueStudentResDto;
import com.ico.api.dto.stock.IssueTeacherResDto;
import com.ico.api.dto.stock.IssueUploadReqDto;

import javax.servlet.http.HttpServletRequest;

/**
 * @author 변윤경
 */
public interface IssueService {

    /**
     * 교사 투자 이슈 목록 조회
     *
     * @return 교사화면의 투자 이슈 정보
     */
    IssueTeacherResDto getIssueTeacher(HttpServletRequest request, Long stockId);

    /**
     * 학생 투자 이슈 목록 조회
     * @return 학생화면의 투자 이슈 정보
     */
    IssueStudentResDto getIssueStudent(HttpServletRequest request, Long stockId);

    /**
     * 투자 이슈 등록
     * @param dto 변동률, 이슈, 오늘의 가격
     */
    void uploadIssue(HttpServletRequest request, IssueUploadReqDto dto, Long stockId);

}
