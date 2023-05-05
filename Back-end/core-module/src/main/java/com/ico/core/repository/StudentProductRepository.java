package com.ico.core.repository;

import com.ico.core.entity.StudentProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author 변윤경
 */
public interface StudentProductRepository extends JpaRepository<StudentProduct, Long> {
    List<StudentProduct> findAllByNationId(Long nationId);

    StudentProduct findByIdAndNationId(Long id, Long nationId);

}
