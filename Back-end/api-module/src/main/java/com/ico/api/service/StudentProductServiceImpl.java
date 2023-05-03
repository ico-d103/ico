package com.ico.api.service;

import com.ico.api.dto.StudentProductProposalDto;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Student;
import com.ico.core.entity.StudentProduct;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.StudentProductRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

/**
 * @author 변윤경
 */
@Service
@RequiredArgsConstructor
@Transactional
public class StudentProductServiceImpl implements StudentProductService{
    private final StudentRepository studentRepo;
    private final NationRepository nationRepo;
    private final StudentProductRepository studentProductRepo;

    /**
     * 학생의 상품 판매 제안서를 학생 상품 테이블에 추가합니다.
     * @param proposal 판매제안서 양식
     */
    @Override
    public void createProduct(StudentProductProposalDto proposal) {
        Student student = studentRepo.findByIdentity(proposal.getIdentity())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Nation nation = nationRepo.findById(proposal.getNationId())
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        StudentProduct product = StudentProduct.builder()
                .student(student)
                .nation(nation)
                .title(proposal.getTitle())
                .amount(proposal.getAmount())
                .image(proposal.getImage())
                .detail(proposal.getDetail())
                .count(proposal.getCount())
                .is_assigned(false)
                .build();
        studentProductRepo.save(product);
    }
}