package com.ico.api.service.teacher;

import com.ico.api.dto.teacherProduct.TeacherProductAllResDto;
import com.ico.api.service.S3UploadService;
import com.ico.api.service.transaction.TransactionService;
import com.ico.core.dto.TeacherProductReqDto;
import com.ico.core.entity.Coupon;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Student;
import com.ico.core.entity.TeacherProduct;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.CouponRepository;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.StudentRepository;
import com.ico.core.repository.TeacherProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @author 변윤경
 */
@Service
@RequiredArgsConstructor
@Transactional
public class TeacherProductServiceImpl implements TeacherProductService {
    private final NationRepository nationRepository;
    private final TeacherProductRepository teacherProductRepository;
    private final StudentRepository studentRepository;
    private final TransactionService transactionService;
    private final CouponRepository couponRepository;
    private final S3UploadService s3UploadService;
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");

    /**
     * 교사 상품 등록
     *
     * @param product 교사 상품
     */
    @Override
    public void createProduct(TeacherProductReqDto product, List<MultipartFile> files) {
        long nationId = 99L;
        // Todo : token 생성 이후 nation 바꾸기
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        // 같은 국가에 같은 선생님 상품 이름이 있는지 확인
        if (teacherProductRepository.findByNationIdAndTitle(nationId, product.getTitle()).isPresent()) {
            throw new CustomException(ErrorCode.ALREADY_EXIST_TITLE);
        }

        // 상품 이미지 s3에 등록하고 파일이름 저장하기
        StringBuilder images = new StringBuilder();
        for (MultipartFile file : files) {
            // 상품이미지를 등록하지 않았을 때
            if (file.isEmpty()) {
                throw new CustomException(ErrorCode.NO_PRODUCT_IMAGE);
            }
            images.append(s3UploadService.upload(file)).append(",");
        }

        TeacherProduct teacherProduct = TeacherProduct.builder()
                .nation(nation)
                .title(product.getTitle())
                .amount(product.getAmount())
                .image(String.valueOf(images))
                .detail(product.getDetail())
                .count(product.getCount())
                .rental(product.getRental())
                .sold((byte) 0)
                .date(LocalDateTime.now())
                .build();
        teacherProductRepository.save(teacherProduct);
    }

    /**
     * 등록된 교사 상품 목록을 조회합니다.
     *
     * @return 교사상품목록
     */
    @Override
    public List<TeacherProductAllResDto> findAllProduct() {
        //TODO : REQUSET
        long nationId = 99L;

        if (nationRepository.findById(nationId).isEmpty()) {
            throw new CustomException(ErrorCode.NATION_NOT_FOUND);
        }

        List<TeacherProduct> productList = teacherProductRepository.findAllByNationId(nationId);
        List<TeacherProductAllResDto> resProductList = new ArrayList<>();

        for (TeacherProduct product : productList) {
            List<String> images = List.of(product.getImage().split(","));
            List<String> imageRes = new ArrayList<>();
            for (String image : images) {
                imageRes.add(s3UploadService.getFileURL(image));
            }

            TeacherProductAllResDto resDto = TeacherProductAllResDto.builder()
                    .id(product.getId())
                    .title(product.getTitle())
                    .amount(product.getAmount())
                    .images(imageRes)
                    .count(product.getCount())
                    .sold(product.getSold())
                    .rental(product.getRental())
                    .date(product.getDate().format(formatter))
                    .build();

            resProductList.add(resDto);
        }

        return resProductList;
    }

    /**
     * 쿠폰 유형의 교사 상품을 구매합니다.
     *
     * @param id 상품 id
     */
    @Transactional
    @Override
    public void buyCoupon(Long id) {
        // 해당 국가인지 확인
        // TODO : REQUEST 변환
        long nationId = 99L;
        // TODO : REQUEST 변환
        long studentId = 1L;

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 타입이 일치하는지 확인
        TeacherProduct product = teacherProductRepository.findByIdAndNationId(id, nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_AUTHORIZATION_NATION));
        if (product.getRental()) {
            throw new CustomException(ErrorCode.NOT_COUPON);
        }

        // 재고 있는지 확인
        if (product.getCount() == product.getSold()) {
            throw new CustomException(ErrorCode.SOLD_OUT);
        }

        // 잔고가 충분한지 확인
        int amount = product.getAmount();
        int account = student.getAccount();
        if (amount > account) {
            throw new CustomException(ErrorCode.LOW_BALANCE);
        }

        // 상품 가격 지불
        student.setAccount(account - amount);

        // 거래 내역 추가
        transactionService.addTransactionWithdraw("교사 상점", studentId, amount, product.getTitle());

        // 재고 개수 수정
        product.setSold((byte) (product.getSold() + 1));

        // 인벤토리에 추가
        Optional<Coupon> couponOptional = couponRepository.findByTeacherProductIdAndStudentId(id, studentId);
        Coupon coupon;
        if (couponOptional.isPresent()) {
            coupon = couponOptional.get();
            coupon.setCount((byte) (coupon.getCount() + 1));
        } else {
            coupon = Coupon.builder()
                    .student(student)
                    .teacherProduct(product)
                    .title(product.getTitle())
                    .isAssigned(false)
                    .build();
        }
        couponRepository.save(coupon);
    }
}
