package com.ico.api.service;

import com.ico.api.dto.StudentProductAllResDto;
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
import java.util.ArrayList;
import java.util.List;

/**
 * @author 변윤경
 */
@Service
@RequiredArgsConstructor
@Transactional
public class StudentProductServiceImpl implements StudentProductService{
    private final StudentRepository studentRepository;
    private final NationRepository nationRepository;
    private final StudentProductRepository studentProductRepository;

    /**
     * 학생의 상품 판매 제안서를 학생 상품 테이블에 추가합니다.
     * @param proposal 판매제안서 양식
     */
    @Override
    public void createProduct(StudentProductProposalDto proposal) {
        Student student = studentRepository.findByIdentity(proposal.getIdentity())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Nation nation = nationRepository.findById(proposal.getNationId())
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
                .sold((byte) 0)
                .build();
        studentProductRepository.save(product);
    }

    /**
     * 등록된 학생 상품 목록을 조회합니다.
     * @return 학생상품목록
     */
    @Override
    public List<StudentProductAllResDto> findAllProduct() {
        List<StudentProduct> productList = studentProductRepository.findAllByNationId(1L);
        List<StudentProductAllResDto> resProductList = new ArrayList<>();
        for (StudentProduct product : productList){
            resProductList.add(new StudentProductAllResDto().of(product));
        }

        return resProductList;
    }
}
