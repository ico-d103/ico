package com.ico.api.service.teacher;

import com.ico.api.dto.teacherProduct.TeacherProductAllResDto;
import com.ico.core.entity.Nation;
import com.ico.core.entity.TeacherProduct;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.TeacherProductRepository;
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
public class TeacherProductServiceImpl implements TeacherProductService{
    private final NationRepository nationRepository;
    private final TeacherProductRepository teacherProductRepository;

    /**
     * 교사 상품 등록
     * @param proposal 교사 상품
     */
    @Override
    public void createProduct(TeacherProduct proposal) {
        long nationId = 1L;
        // Todo : token 생성 이후 nation 바꾸기
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        // 같은 국가에 같은 선생님 상품 이름이 있는지 확인
        if(teacherProductRepository.findByNationIdAndTitle(nationId, proposal.getTitle()).isPresent()){
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
                .sold((byte) 0)
                .build();
        teacherProductRepository.save(product);
    }

    /**
     * 등록된 교사 상품 목록을 조회합니다.
     * @return 교사상품목록
     */
    @Override
    public List<TeacherProductAllResDto> findAllProduct() {
        long nationId = 1L;

        if (nationRepository.findById(nationId).isEmpty()){
            throw new CustomException(ErrorCode.NATION_NOT_FOUND);
        }

        List<TeacherProduct> productList = teacherProductRepository.findAllByNationId(nationId);
        List<TeacherProductAllResDto> resProductList = new ArrayList<>();
        for (TeacherProduct product : productList){
            resProductList.add(new TeacherProductAllResDto().of(product));
        }

        return resProductList;
    }
}
