package com.ico.api.service.student;

import com.ico.api.dto.studentProduct.StudentProductAllResDto;
import com.ico.api.dto.studentProduct.StudentProductDetailResDto;
import com.ico.api.dto.studentProduct.StudentProductReqDto;
import com.ico.api.dto.teacherProduct.ProductQRReqDto;
import com.ico.api.dto.teacherProduct.ProductQRResDto;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author 변윤경
 * @author 강교철
 * @author 서재건
 */
public interface StudentProductService {

    /**
     * 학생의 상품 판매 제안서를 학생 상품 테이블에 추가합니다.
     * @param proposal 판매제안서 양식
     */
    void createProduct(HttpServletRequest request, List<MultipartFile> files, StudentProductReqDto proposal);

    /**
     * 등록된 학생 상품 목록을 조회합니다.
     * @return 학생 상품 목록
     */
    List<StudentProductAllResDto> findAllProduct(HttpServletRequest request);

    /**
     * 학생의 판매 제안서 승인
     *
     * @param id 학생 상품 id
     */
    void updateIsAssigned(HttpServletRequest request, Long id);

    /**
     * 학생 상품 삭제
     *
     * @param id 학생 상품 id
     */
    void deleteProduct(HttpServletRequest request, Long id);

    /**
     * 학생상품 상세보기
     *
     * @param id 상품 아이디
     * @return 상품디테일 정보 and isSeller
     */
    StudentProductDetailResDto detailProduct(HttpServletRequest request, Long id);

    /**
     * 학생 상품 구매
     *
     * @param request
     * @param dto
     */
    ProductQRResDto buyProduct(HttpServletRequest request, ProductQRReqDto dto);
}
