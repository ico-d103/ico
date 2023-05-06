package com.ico.api.service;

import com.ico.api.dto.TeacherProductAllResDto;
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

    void buyCoupon(Long id);
}
