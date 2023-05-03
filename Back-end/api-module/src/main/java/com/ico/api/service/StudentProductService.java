package com.ico.api.service;

import com.ico.api.dto.StudentProductAllResDto;
import com.ico.api.dto.StudentProductProposalDto;

import java.util.List;

/**
 * @author 변윤경
 */
public interface StudentProductService {

    /**
     * 학생의 상품 판매 제안서를 학생 상품 테이블에 추가합니다.
     * @param proposal 판매제안서 양식
     */
    void createProduct(StudentProductProposalDto proposal);

    /**
     * 등록된 학생 상품 목록을 조회합니다.
     * @return 학생 상품 목록
     */
    List<StudentProductAllResDto> findAllProduct();
}
