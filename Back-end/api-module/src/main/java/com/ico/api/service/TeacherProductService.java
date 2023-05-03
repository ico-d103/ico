package com.ico.api.service;

import com.ico.core.entity.TeacherProduct;

/**
 * @author 변윤경
 */
public interface TeacherProductService {
    /**
     * 교사 상품 등록
     * @param proposal 교사 상품
     */
    void createProduct(TeacherProduct proposal);
}
