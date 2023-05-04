package com.ico.api.controller;

import com.ico.api.dto.TeacherProductAllResDto;
import com.ico.api.service.TeacherProductService;
import com.ico.core.entity.TeacherProduct;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

/**
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
     * @param proposal 상품 양식
     *                제품이름, 가격, 사진 , 상세정보, 개수, 유형(쿠폰, 대여)
     * @return status
     */
    @PostMapping("/teacher")
    public ResponseEntity<HttpStatus> uploadProposal(@Valid @RequestBody TeacherProduct proposal){
        teacherProductService.createProduct(proposal);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 등록된 전체 교사 상품 목록 조회
     *
     * @return 교사 상품 목록
     */
    @GetMapping
    public ResponseEntity<List<TeacherProductAllResDto>> findAllProduct(){
        return new ResponseEntity<>(teacherProductService.findAllProduct(), HttpStatus.OK);
    }


}
