package com.ico.api.controller;

import com.ico.api.dto.studentProduct.StudentProductAllResDto;
import com.ico.api.dto.studentProduct.StudentProductDetailResDto;
import com.ico.api.dto.studentProduct.StudentProductReqDto;
import com.ico.api.dto.teacherProduct.ProductQRReqDto;
import com.ico.api.dto.teacherProduct.ProductQRResDto;
import com.ico.api.service.student.StudentProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

/**
 * @author 변윤경
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/student-product")
public class StudentProductController {
    private final StudentProductService studentProductService;

    /**
     * 학생의 판매 제안서 등록
     * 학생상품 테이블에 is_assigned = false로 추가됨
     *
     * @param proposal 판매제안서 양식
     *                 제품이름, 가격, 사진, 상세정보, 개수
     * @param files    제품의 이미지 파일들
     * @return httpstauts
     */
    @PostMapping(value = "/student/proposal", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<HttpStatus> uploadProposal(@RequestPart("files") List<MultipartFile> files, @Valid @RequestPart("proposal") StudentProductReqDto proposal, HttpServletRequest request) {
        studentProductService.createProduct(request, files, proposal);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 등록된 전체 학생 상품 목록 조회
     *
     * @return 학생상품목록
     */
    @GetMapping
    public ResponseEntity<List<StudentProductAllResDto>> findAllProduct(HttpServletRequest request) {
        return ResponseEntity.ok(studentProductService.findAllProduct(request));
    }


    /**
     * 판매 제안서 승인student_product
     *
     * @param studentProductId 학생 상품 id
     * @return httpstauts
     */
    @PostMapping("/teacher/{studentProductId}")
    public ResponseEntity<HttpStatus> approveProposal(HttpServletRequest request, @PathVariable Long studentProductId) {
        studentProductService.updateIsAssigned(request, studentProductId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 판매 제안서 거절, 학생 상품 삭제
     *
     * @param studentProductId 학생 상품 id
     * @return httpstauts
     */
    @DeleteMapping("/teacher/{studentProductId}")
    public ResponseEntity<HttpStatus> deleteProduct(HttpServletRequest request, @PathVariable Long studentProductId) {
        studentProductService.deleteProduct(request, studentProductId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 학생상품 상세보기
     *
     * @param studentProductId 학생 상품 id
     * @return 학생상품 상세 정보
     */
    @GetMapping("/{studentProductId}")
    public ResponseEntity<StudentProductDetailResDto> detailProduct(HttpServletRequest request, @PathVariable Long studentProductId){
        return ResponseEntity.ok(studentProductService.detailProduct(request, studentProductId));
    }

    /**
     *
     * @param request
     * @param dto 구매 상품 ID, QR 코드 시작 시간
     * @return
     */
    @PostMapping("/student/buy")
    public ResponseEntity<ProductQRResDto> buyProduct(HttpServletRequest request, @Valid @RequestBody ProductQRReqDto dto){
        return ResponseEntity.ok(studentProductService.buyProduct(request, dto));
    }
}
