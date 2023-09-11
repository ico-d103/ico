package com.ico.api.service.teacher;

import com.ico.api.dto.teacher.TeacherProductImgReqDto;
import com.ico.api.dto.teacherProduct.BuyTransactionResDto;
import com.ico.api.dto.teacherProduct.ProductQRReqDto;
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
 * @author 강교철
 */
public interface TeacherProductService {
    /**
     * 교사 상품 등록
     * 권한
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
     * 교사 상품 구매
     *
     * @param dto
     * @param request
     * @return (string) 상품id,상품id,...
     */
    String buyProduct(ProductQRReqDto dto, HttpServletRequest request);

    /**
     * 교사 상품 상세정보 조회(공통)
     *
     * @param request
     * @param id
     * @return
     */
    TeacherProductDetailResDto detailProduct(HttpServletRequest request, Long id);

    /**
     * 교사 상품 삭제
     * 권한
     * @param teacherProductId
     */
    void deleteTeacherProduct(Long teacherProductId, HttpServletRequest request);

    /**
     * QR 구매 내역 반환
     *
     * @param redisProductKey
     * @param request
     * @return
     */
    BuyTransactionResDto findBuyTransaction(String redisProductKey, HttpServletRequest request);

    /**
     * 교사 상품 수정
     * @param teacherProductId
     * @param request
     */
    void updateTeacherProduct(Long teacherProductId, HttpServletRequest request, TeacherProductReqDto product);

    /**
     * 교사 상품 이미지 수정
     * @param teacherProductId
     * @param request
     * @param dto
     * @param newImages
     */
    void updateProductImage(Long teacherProductId, HttpServletRequest request, TeacherProductImgReqDto dto, List<MultipartFile> newImages);
}
