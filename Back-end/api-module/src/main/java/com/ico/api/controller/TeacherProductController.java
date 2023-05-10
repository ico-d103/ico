package com.ico.api.controller;

import com.ico.api.dto.teacherProduct.TeacherProductAllResDto;
import com.ico.api.service.teacher.TeacherProductService;
import com.ico.core.dto.TeacherProductReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

/**
 * 교사 상품 Controller
 *
 * @author 변윤경
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/teacher-product")
public class TeacherProductController {
    private final TeacherProductService teacherProductService;

    /**
     * 판매 제안서 등록
     *
     * @param product 상품 양식
     *                 제품이름, 가격, 사진 , 상세정보, 개수, 유형(쿠폰, 대여)
     * @return status
     */
    @PostMapping("/teacher")
    public ResponseEntity<HttpStatus> uploadProduct(@Valid @RequestBody TeacherProductReqDto product) {
        teacherProductService.createProduct(product);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 등록된 전체 교사 상품 목록 조회
     *
     * @return 교사 상품 목록
     */
    @GetMapping
    public ResponseEntity<List<TeacherProductAllResDto>> findAllProduct() {
        return ResponseEntity.ok(teacherProductService.findAllProduct());
    }

    /**
     * 쿠폰유형 교사상품 구매
     *
     * @param teacherProductId 상품 ID
     * @return Httpstatus
     */
    @PostMapping("/student/{teacherProductId}/coupon")
    public ResponseEntity<HttpStatus> buyCoupon(@PathVariable Long teacherProductId) {
        teacherProductService.buyCoupon(teacherProductId);
        return ResponseEntity.ok(HttpStatus.OK);
    }


}
