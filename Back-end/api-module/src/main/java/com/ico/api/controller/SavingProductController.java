package com.ico.api.controller;

import com.ico.api.dto.bank.SavingProductReqDto;
import com.ico.api.dto.bank.SavingProductStudentResDto;
import com.ico.api.dto.bank.SavingProductTeacherResDto;
import com.ico.api.dto.bank.SavingStudentResDto;
import com.ico.api.service.bank.SavingProductService;
import com.ico.core.dto.SavingUpdateDto;
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
import javax.validation.Valid;
import java.util.List;

/**
 * 적금 상품 Controller
 *
 * @author 변윤경
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/saving-product")
public class SavingProductController {
    private final SavingProductService savingProductService;

    /**
     * 교사의 적금 관련 정보 조회
     * - 적금 상품 내역
     * - 적금 별 가입 학생
     * @param request
     * @return
     */
    @GetMapping("/teacher/all")
    public ResponseEntity<List<SavingProductTeacherResDto>> findAllSavingTeacher(HttpServletRequest request){
        return ResponseEntity.ok(savingProductService.findAllSavingTeacher(request));
    }

    /**
     * 학생의 적금 관련 정보 조회
     * - 적금 상품 내역
     * - 진행중인 적금 내역
     * @param request
     * @return
     */
    @GetMapping("/student")
    public ResponseEntity<SavingProductStudentResDto> findAllSavingStudent(HttpServletRequest request){
        return ResponseEntity.ok(savingProductService.findAllSavingStudent(request));
    }

    /**
     * 헉생의 적금 신청 관련 디테일 조회
     * @param request
     * @param savingId
     * @return
     */
    @GetMapping("/student/{savingId}")
    public ResponseEntity<SavingStudentResDto> getSavingDetail(HttpServletRequest request, @PathVariable String savingId){
        return ResponseEntity.ok(savingProductService.getSavingDetail(request, savingId));
    }

    /**
     * 적금 상품 등록
     * @param request
     * @param saving
     * @return
     */
    @PostMapping("/teacher")
    public ResponseEntity<HttpStatus> addSaving(HttpServletRequest request, @Valid @RequestBody SavingProductReqDto saving){
        savingProductService.addSaving(request, saving);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 적금 상품 수정
     *
     * @param request
     * @param saving
     * @param savingProductId
     * @return
     */
    @PutMapping("/teacher/{savingProductId}")
    public ResponseEntity<HttpStatus> updateSaving(HttpServletRequest request,  @Valid @RequestBody SavingUpdateDto dto, @PathVariable Long savingProductId){
        savingProductService.updateSaving(request, savingProductId, dto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 적금 상품 삭제
     * @param savingProductId
     * @return
     */
    @DeleteMapping("/teacher/{savingProductId}")
    public ResponseEntity<HttpStatus> deleteSaving(@PathVariable Long savingProductId){
        savingProductService.deleteSaving(savingProductId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
