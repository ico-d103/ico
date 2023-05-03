package com.ico.api.service;

import com.ico.core.entity.Nation;
import com.ico.core.entity.TeacherProduct;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.TeacherProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * @author 변윤경
 */
@Service
@RequiredArgsConstructor
@Transactional
public class TeacherProductServiceImpl implements TeacherProductService{
    private final NationRepository nationRepository;
    private final TeacherProductRepository teacherProductRepository;

    /**
     * 교사 상품 등록
     * @param proposal 교사 상품
     */
    @Override
    public void createProduct(TeacherProduct proposal) {
        // Todo : token 생성 이후 nation 바꾸기
        Nation nation = nationRepository.findById(1L)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        // 같은 국가에 같은 선생님 상품 이름이 있는지 확인
        if(teacherProductRepository.existsByNationIdAndTitle(1L, proposal.getTitle())){
            throw new CustomException(ErrorCode.ALREADY_EXIST_TITLE);
        }

        TeacherProduct product = TeacherProduct.builder()
                .nation(nation)
                .title(proposal.getTitle())
                .amount(proposal.getAmount())
                .image(proposal.getImage())
                .detail(proposal.getDetail())
                .count(proposal.getCount())
                .type(proposal.getType())
                .build();
        teacherProductRepository.save(product);
    }
}
