package com.ico.api.controller;

import com.ico.api.dto.stock.StockStudentResDto;
import com.ico.api.dto.stock.StockTeacherResDto;
import com.ico.api.dto.stock.StockUploadReqDto;
import com.ico.api.service.stock.StockService;
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
@RequestMapping("/api/stock")
public class StockController {
    private final StockService stockService;

    /**
     * 교사의 투자 이슈 조회
     * @return 투자 이슈 정보, 투자 종목 정보(거래가능시간, 이름)
     */
    @GetMapping("/teacher")
    public ResponseEntity<StockTeacherResDto> stockIssueTeacher(HttpServletRequest request){
        return ResponseEntity.ok(stockService.getIssueTeacher(request));
    }

    /**
     * 투자 이슈 등록
     * @param dto 지수, 내일의 이슈
     * @return Httpstatus
     */
    @PostMapping("/teacher/upload")
    public ResponseEntity<HttpStatus> uploadIssue(HttpServletRequest request, @Valid @RequestBody StockUploadReqDto dto){
        stockService.uploadIssue(request, dto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 학생의 투자이슈 조회
     * @return 투자 이슈
     */
    @GetMapping("/student")
    public ResponseEntity<StockStudentResDto> stockIssueStudent(HttpServletRequest request){
        return ResponseEntity.ok(stockService.getIssueStudent(request));
    }

    /**
     * 투자 종목 삭제
     *
     * @param request
     * @return
     */
    @DeleteMapping("/teacher")
    public ResponseEntity<HttpStatus> deleteStock(HttpServletRequest request){
        stockService.deleteStock(request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
