package com.ico.api.service.student;

import com.ico.api.dto.studentProduct.StudentProductAllResDto;
import com.ico.api.dto.studentProduct.StudentProductDetailResDto;
import com.ico.api.dto.studentProduct.StudentProductReqDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @author 변윤경
 */
public interface StudentProductService {

    /**
     * 학생의 상품 판매 제안서를 학생 상품 테이블에 추가합니다.
     * @param proposal 판매제안서 양식
     */
    void createProduct(List<MultipartFile> files, StudentProductReqDto proposal);

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

    /**
     * 학생상품 상세보기
     *
     * @param id 상품 아이디
     * @return 상품디테일 정보
     */
    StudentProductDetailResDto detailProduct(Long id);

    /**
     * 학생 상품 구매
     *
     * @param studentProductId 상품 id
     */
    void buyProduct(Long studentProductId);
}
