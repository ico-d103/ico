package com.ico.api.service.student;

import com.ico.api.dto.studentProduct.StudentProductAllResDto;
import com.ico.api.dto.studentProduct.StudentProductDetailResDto;
import com.ico.api.dto.studentProduct.StudentProductReqDto;
import com.ico.api.dto.teacherProduct.ProductQRReqDto;
import com.ico.api.dto.teacherProduct.ProductQRResDto;
import com.ico.api.service.S3UploadService;
import com.ico.api.service.inflation.ShopTransactionService;
import com.ico.api.service.transaction.TransactionService;
import com.ico.api.user.JwtTokenProvider;
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
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

/**
 * 학생 상품 Service
 *
 * @author 변윤경
 * @author 강교철
 * @author 서재건
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class StudentProductServiceImpl implements StudentProductService {
    private final TransactionService transactionService;
    private final StudentRepository studentRepository;
    private final NationRepository nationRepository;
    private final StudentProductRepository studentProductRepository;
    private final S3UploadService s3UploadService;
    private final JwtTokenProvider jwtTokenProvider;
    private final ShopTransactionService shopTransactionService;
    private final RedisTemplate<String, Object> redisTemplate;

    /**
     * 학생의 상품 판매 제안서를 학생 상품 테이블에 추가합니다.
     *
     * @param proposal 판매제안서 양식
     */
    @Override
    public void createProduct(HttpServletRequest request, List<MultipartFile> files, StudentProductReqDto proposal) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);


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
     *
     * @return 학생상품목록
     */
    @Transactional(readOnly = true)
    @Override
    public List<StudentProductAllResDto> findAllProduct(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        if (nationRepository.findById(nationId).isEmpty()) {
            throw new CustomException(ErrorCode.NATION_NOT_FOUND);
        }

        List<StudentProduct> productList = studentProductRepository.findAllByNationId(nationId);
        List<StudentProductAllResDto> resProductList = new ArrayList<>();

        for (StudentProduct product : productList) {
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
    public void updateIsAssigned(HttpServletRequest request, Long id) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

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
    public void deleteProduct(HttpServletRequest request, Long id) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

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
    public StudentProductDetailResDto detailProduct(HttpServletRequest request, Long id) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);

        StudentProduct product = studentProductRepository.findByIdAndNationId(id, nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_AUTHORIZATION_NATION));

        // 자신의 상품인지 체크
        boolean check = studentId.equals(product.getStudent().getId());

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
                .isSeller(check)
                .build();
    }

    /**
     * 학생 상품 구매
     *
     * @param request
     * @param dto
     * @return 상품 id
     */
    @Transactional
    @Override
    public Long buyProduct(HttpServletRequest request, ProductQRReqDto dto) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        StudentProduct product = studentProductRepository.findByIdAndNationId(dto.getId(), nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        // QR 코드 유효시간 검사
        long now = System.currentTimeMillis();
        log.info("[rentalProduct] : now_{}, qr_valid_{}", now, dto.getUnixTime() + (3 * 60 * 1000));
        if (dto.getUnixTime() + (3 * 60 * 1000) < now || dto.getUnixTime() > now) {
            throw new CustomException(ErrorCode.TIME_OUT_QR);
        }

        Student seller = product.getStudent();

        // 판매자 유효 검사
        if (studentRepository.findById(seller.getId()).isEmpty()) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }

        // 판매자와 구매자 일치 여부 확인
        if (seller.getId() == studentId) {
            throw new CustomException(ErrorCode.IS_SELLER);
        }

        // 잔액 확인
        if (product.getAmount() > student.getAccount()) {
            throw new CustomException(ErrorCode.LOW_BALANCE);
        }

        // 품절 상품 예외처리
        if (product.getSold() == product.getCount()) {
            throw new CustomException(ErrorCode.SOLD_OUT);
        }
        // 상품 판매 개수 수정
        product.setSold((byte) (product.getSold() + 1));
        studentProductRepository.save(product);

        // 잔액 수정
        student.setAccount(student.getAccount() - product.getAmount());
        studentRepository.save(student);

        // 거래 내역 기록
        transactionService.addTransaction(seller.getId(), student.getId(), product.getAmount(), product.getTitle());

        // 상점 거래 내역 기록
        shopTransactionService.addShopTransaction(nationId, product.getAmount());

        // Redis에 학생의 구매 시간 저장
        saveRedis(String.valueOf(studentId) + product.getId(), LocalDateTime.now().format(Formatter.dateTimeSeconds));

        return product.getId();
    }

    @Override
    public ProductQRResDto findBuyTransaction(Long studentProductId, HttpServletRequest request) {
        String studentId = String.valueOf(jwtTokenProvider.getId(jwtTokenProvider.parseJwt(request)));
        String key = studentId + studentProductId;
        // Redis에 학생id+상품id(key) 값이 존재하는 경우 날짜(value) 반환
        String dateTime = String.valueOf(Optional
                .ofNullable(redisTemplate.opsForValue().get(key))
                .orElseThrow(() -> new CustomException(ErrorCode.EXPIRE_BUY_TRANSACTION)));
        // 반환 후 삭제
        redisTemplate.delete(key);

        StudentProduct product = studentProductRepository.findById(studentProductId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        return ProductQRResDto.builder()
                .title(product.getTitle())
                .seller(product.getStudent().getName())
                .price(product.getAmount())
                .date(LocalDateTime.parse(dateTime, Formatter.dateTimeSeconds))
                .build();
    }

    /**
     * Redis 에 key : value 저장
     * 만료 시간 5분
     *
     * @param key 학생 id + 상품 id
     * @param value 구매 날짜 시간(yyyy.MM.dd-HH:mm:ss)
     */
    private void saveRedis(String key, String value) {
        redisTemplate.opsForValue().set(key, value, 5, TimeUnit.MINUTES);
    }
}
