package com.ico.api.controller;

import com.ico.api.dto.bank.DepositProductStudentResDto;
import com.ico.api.dto.bank.DepositProductTeacherResDto;
import com.ico.api.dto.bank.DepositProductReqDto;
import com.ico.api.dto.bank.DepositStudentResDto;
import com.ico.api.service.bank.DepositProductService;
import com.ico.core.dto.DepositUpdatetDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 예금 상품 Controller
 *
 * @author 변윤경
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/deposit-product")
public class DepositProductController {
    private final DepositProductService depositProductService;


    /**
     * 선생님의 전체 예금 상품 목록 조회
     *
     * @param request
     * @return
     */
    @GetMapping("/teacher/all")
    public ResponseEntity<List<DepositProductTeacherResDto>> findAllDepositTeacher(HttpServletRequest request){
        return ResponseEntity.ok(depositProductService.findAllDepositTeacher(request));
    }

    /**
     * 학생의 예금 상품 페이지
     *
     * @param request
     * @return
     */
    @GetMapping("/student")
    public ResponseEntity<DepositProductStudentResDto> findAllDepositStudent(HttpServletRequest request){
        return ResponseEntity.ok(depositProductService.findAllDepositStudent(request));
    }

    /**
     * 학생의 예금 신청 디테일 조회
     *
     * @param request
     * @return
     */
    @GetMapping("/student/{depositId}")
    public ResponseEntity<DepositStudentResDto> getDepositDetail(HttpServletRequest request, @PathVariable String depositId){
        return ResponseEntity.ok(depositProductService.getDepositDetail(request, depositId));
    }

    /**
     * 예금 상품 추가
     *
     * @param request
     * @param deposit
     * @return
     */
    @PostMapping("/teacher")
    public ResponseEntity<HttpStatus> addDeposit(HttpServletRequest request, @RequestBody DepositProductReqDto deposit){
        depositProductService.addDeposit(request, deposit);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 예금 상품 수정
     *
     * @param request
     * @param deposit
     * @param depositProductId
     * @return
     */
    @PutMapping("/teacher/{depositProductId}")
    public ResponseEntity<HttpStatus> updateDeposit(HttpServletRequest request, @RequestBody DepositUpdatetDto deposit, @PathVariable Long depositProductId){
        depositProductService.updateDeposit(request, depositProductId, deposit);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 예금 상품 삭제
     *
     * @param depositProductId
     * @return
     */
    @DeleteMapping("/teacher/{depositProductId}")
    public ResponseEntity<HttpStatus> deleteDeposit(@PathVariable Long depositProductId){
        depositProductService.deleteDeposit(depositProductId);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
