package com.ico.api.service.teacher;

import com.ico.api.dto.teacherProduct.TeacherProductAllResDto;
import com.ico.core.entity.TeacherProduct;

import java.util.List;

/**
 * @author 변윤경
 */
public interface TeacherProductService {
    /**
     * 교사 상품 등록
     * @param proposal 교사 상품
     */
    void createProduct(TeacherProduct proposal);

    /**
     * 등록된 교사 상품 목록을 조회합니다.
     * @return 교사상품목록
     */
    List<TeacherProductAllResDto> findAllProduct();

    /**
     * 쿠폰 유형의 교사 상품을 구매합니다.
     * @param id 상품 id
     */
    void buyCoupon(Long id);
}
