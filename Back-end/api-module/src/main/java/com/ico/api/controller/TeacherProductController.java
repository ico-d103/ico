package com.ico.api.controller;

import com.ico.api.service.TeacherProductService;
import com.ico.core.entity.TeacherProduct;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * @author 변윤경
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/teacher-product")
public class TeacherProductController {
    private final TeacherProductService teacherProductService;

    /**
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

}
