package com.ico.api.service;

import com.ico.core.entity.StudentProduct;
import org.springframework.web.bind.annotation.RequestParam;

public interface StudentProductService {
    void createProduct(String identity, Long nationId, String title, int amount, String image, String detail, byte count);
}
