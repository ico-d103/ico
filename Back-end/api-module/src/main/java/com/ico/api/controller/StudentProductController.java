package com.ico.api.controller;

import com.ico.api.dto.StudentProductAllResDto;
import com.ico.api.dto.StudentProductProposalDto;
import com.ico.api.service.StudentProductService;
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
@RequestMapping("/api/student-product")
public class StudentProductController {
    private final StudentProductService studentProductService;

    /**
     * 학생의 판매 제안서 등록
     * 학생상품 테이블에 is_assigned = false로 추가됨
     *
     * @param proposal 판매제안서 양식
     *                 제품이름, 가격, 사진, 상세정보, 개수
     *
     * @return 상태 반환
     */
    @PostMapping("/student/proposal")
    public ResponseEntity<?> uploadProposal(@Valid @RequestBody StudentProductProposalDto proposal){
        studentProductService.createProduct(proposal);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 등록된 전체 학생 상품 목록 조회
     *
     * @return 학생상품목록
     */
    @GetMapping
    public ResponseEntity<List<StudentProductAllResDto>> findAllProduct(){
        return new ResponseEntity<>(studentProductService.findAllProduct(), HttpStatus.OK);
    }

}
