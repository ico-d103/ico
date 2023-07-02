package com.ico.api.controller;

import com.ico.api.dto.stock.IssueStudentResDto;
import com.ico.api.dto.stock.IssueTeacherResDto;
import com.ico.api.dto.stock.IssueUploadReqDto;
import com.ico.api.service.stock.IssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

/**
 *
 * @author 변윤경
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/issue")
public class IssueController {
    private final IssueService issueService;



//    /**
//     * 교사의 투자 이슈 조회
//     * @return 투자 이슈 정보, 투자 종목 정보(거래가능시간, 이름)
//     */
//    @GetMapping("/teacher/{stockId}")
//    public ResponseEntity<IssueTeacherResDto> stockIssueTeacher(HttpServletRequest request){
//        return ResponseEntity.ok(issueService.getIssueTeacher(request));
//    }
//
//    /**
//     * 투자 이슈 등록
//     * @param dto 지수, 내일의 이슈
//     * @return Httpstatus
//     */
//    @PostMapping("/teacher/upload")
//    public ResponseEntity<HttpStatus> uploadIssue(HttpServletRequest request, @Valid @RequestBody IssueUploadReqDto dto){
//        issueService.uploadIssue(request, dto);
//        return ResponseEntity.ok(HttpStatus.OK);
//    }
//
//    /**
//     * 학생의 투자이슈 조회
//     * @return 투자 이슈
//     */
//    @GetMapping("/student")
//    public ResponseEntity<IssueStudentResDto> stockIssueStudent(HttpServletRequest request){
//        return ResponseEntity.ok(issueService.getIssueStudent(request));
//    }
//
//    /**
//     * 투자 종목 삭제
//     *
//     * @param request
//     * @return
//     */
//    @DeleteMapping("/teacher")
//    public ResponseEntity<HttpStatus> deleteStock(HttpServletRequest request){
//        issueService.deleteStock(request);
//        return ResponseEntity.ok(HttpStatus.OK);
//    }

}
