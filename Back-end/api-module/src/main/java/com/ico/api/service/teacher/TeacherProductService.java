package com.ico.api.service.teacher;

import com.ico.api.dto.teacherProduct.ProductQRReqDto;
import com.ico.api.dto.teacherProduct.ProductQRResDto;
import com.ico.api.dto.teacherProduct.TeacherProductAllResDto;
import com.ico.api.dto.teacherProduct.TeacherProductDetailResDto;
import com.ico.core.dto.TeacherProductReqDto;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 교사 상품 관련 Service
 *
 * @author 변윤경
 * @author 서재건
 */
public interface TeacherProductService {
    /**
     * 교사 상품 등록
     *
     * @param proposal 교사 상품
     */
    void createProduct(HttpServletRequest request, TeacherProductReqDto proposal, List<MultipartFile> files);

    /**
     * 등록된 교사 상품 목록을 조회합니다.
     *
     * @return 교사상품목록
     */
    List<TeacherProductAllResDto> findAllProduct(HttpServletRequest request);

    /**
     * 쿠폰 유형의 교사 상품을 구매합니다.
     *
     * @param id 상품 id
     */
    void buyProduct(HttpServletRequest request, Long id);

    /**
     * QR스캔을 통한 교사 상품 대여
     *
     * @param request
     * @param dto qr 시작 시간, 상품 id
     */
    ProductQRResDto rentalProduct(HttpServletRequest request, ProductQRReqDto dto);

    /**
     * 교사 상품 상세정보 조회
     *
     * @param request
     * @param id
     * @return
     */
    TeacherProductDetailResDto detailProduct(HttpServletRequest request, Long id);

    /**
     * 교사 상품 삭제
     *
     * @param teacherProductId
     */
    void deleteTeacherProduct(Long teacherProductId);
}
