package com.ico.api.service;

import com.ico.api.dto.StudentProductProposalDto;

/**
 * @author 변윤경
 */

public interface StudentProductService {
    /**
     * @author 변윤경
     * 학생의 상품 판매 제안서를 학생 상품 테이블에 추가합니다.
     * @param proposal 판매제안서 양식
     */
    void createProduct(StudentProductProposalDto proposal);
}
