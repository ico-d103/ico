package com.ico.api.service.student;

import com.ico.api.dto.student.StudentProductAllResDto;
import com.ico.api.dto.student.StudentProductProposalDto;

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

    /**
     * 학생의 판매 제안서 승인
     *
     * @param id 학생 상품 id
     */
    void updateIsAssigned(Long id);

    /**
     * 학생 상품 삭제
     *
     * @param id 학생 상품 id
     */
    void deleteProduct(Long id);
}
