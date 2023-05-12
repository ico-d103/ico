package com.ico.api.service.student;

import com.ico.api.dto.studentProduct.StudentProductAllResDto;
import com.ico.api.dto.studentProduct.StudentProductDetailResDto;
import com.ico.api.dto.studentProduct.StudentProductReqDto;
import com.ico.api.service.S3UploadService;
import com.ico.api.util.Formatter;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Student;
import com.ico.core.entity.StudentProduct;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.StudentProductRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * 학생 상품 Service
 *
 * @author 변윤경
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class StudentProductServiceImpl implements StudentProductService{
    private final StudentRepository studentRepository;
    private final NationRepository nationRepository;
    private final StudentProductRepository studentProductRepository;
    private final S3UploadService s3UploadService;

    /**
     * 학생의 상품 판매 제안서를 학생 상품 테이블에 추가합니다.
     * @param proposal 판매제안서 양식
     */
    @Override
    public void createProduct(List<MultipartFile> files, StudentProductReqDto proposal) {
        // TODO : REQUEST 변환
        long nationId = 99;
        // TODO : REQUEST 변환
        long studentId = 1;

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        StudentProduct studentProduct = StudentProduct.builder()
                .student(student)
                .nation(nation)
                .title(proposal.getTitle())
                .amount(proposal.getAmount())
                .images(s3UploadService.saveImageURLs(files))
                .detail(proposal.getDetail())
                .count(proposal.getCount())
                .date(LocalDateTime.now())
                .build();

        studentProductRepository.save(studentProduct);
    }

    /**
     * 등록된 학생 상품 목록을 조회합니다.
     * @return 학생상품목록
     */
    @Transactional(readOnly = true)
    @Override
    public List<StudentProductAllResDto> findAllProduct() {
        // TODO : REQUEST 변환
        long nationId = 99;

        if (nationRepository.findById(nationId).isEmpty()){
            throw new CustomException(ErrorCode.NATION_NOT_FOUND);
        }

        List<StudentProduct> productList = studentProductRepository.findAllByNationId(nationId);
        List<StudentProductAllResDto> resProductList = new ArrayList<>();

        for (StudentProduct product : productList){
            StudentProductAllResDto resDto = StudentProductAllResDto.builder()
                    .id(product.getId())
                    .title(product.getTitle())
                    .amount(product.getAmount())
                    .images(s3UploadService.getImageURLs(product.getImages()))
                    .count(product.getCount())
                    .isAssigned(product.isAssigned())
                    .sold(product.getSold())
                    .name(product.getStudent().getName())
                    .date(product.getDate().format(Formatter.date))
                    .build();

            resProductList.add(resDto);
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
        // TODO : REQUEST 변환
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
        // TODO : REQUEST 변환
        long nationId = 99L;

        StudentProduct product = studentProductRepository.findByIdAndNationId(id, nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));
        studentProductRepository.delete(product);
    }

    /**
     * 학생상품 상세보기
     *
     * @param id 상품 아이디
     * @return 학생 상품 상세 정보
     */
    @Override
    public StudentProductDetailResDto detailProduct(Long id) {
        long nationId = 99;

        StudentProduct product = studentProductRepository.findByIdAndNationId(id, nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_AUTHORIZATION_NATION));

        return StudentProductDetailResDto.builder()
                .id(id)
                .title(product.getTitle())
                .amount(product.getAmount())
                .images(s3UploadService.getImageURLs(product.getImages()))
                .detail(product.getDetail())
                .count(product.getCount())
                .isAssigned(product.isAssigned())
                .sold(product.getSold())
                .date(product.getDate().format(Formatter.date))
                .build();
    }

}
