package com.ico.api.service.student;

import com.ico.api.dto.studentProduct.StudentProductAllResDto;
import com.ico.api.dto.studentProduct.StudentProductProposalDto;
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
import org.springframework.transaction.annotation.Transactional;

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
        long nationId = 99;
        long studentId = 1;

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        StudentProduct product = StudentProduct.builder()
                .student(student)
                .nation(nation)
                .title(proposal.getTitle())
                .amount(proposal.getAmount())
                .image(proposal.getImage())
                .detail(proposal.getDetail())
                .count(proposal.getCount())
                .build();
        studentProductRepository.save(product);
    }

    /**
     * 등록된 학생 상품 목록을 조회합니다.
     * @return 학생상품목록
     */
    @Transactional(readOnly = true)
    @Override
    public List<StudentProductAllResDto> findAllProduct() {
        long nationId = 99;

        if (nationRepository.findById(nationId).isEmpty()){
            throw new CustomException(ErrorCode.NATION_NOT_FOUND);
        }

        List<StudentProduct> productList = studentProductRepository.findAllByNationId(nationId);
        List<StudentProductAllResDto> resProductList = new ArrayList<>();
        for (StudentProduct product : productList){
            resProductList.add(new StudentProductAllResDto().of(product));
        }

        return resProductList;
    }

    /**
     * 판매 제안서 승인
     *
     * @param id 학생 상품 id
     */
    @Override
    public void updateIsAssigned(Long id) {
        // TODO : 교사의 국가 ID 가지고 오기
        long nationId = 99L;
        StudentProduct product = studentProductRepository.findByIdAndNationId(id, nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.PROPOSAL_NOT_FOND));
        product.setAssigned(true);
        studentProductRepository.save(product);
    }

    /**
     * 학생 상품 삭제
     *
     * @param id 학생 상품 id
     */
    @Override
    public void deleteProduct(Long id) {
        // TODO : 교사의 국가 ID 가지고 오기
        long nationId = 99L;

        StudentProduct product = studentProductRepository.findByIdAndNationId(id, nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.PROPOSAL_NOT_FOND));
        studentProductRepository.delete(product);
    }
}
