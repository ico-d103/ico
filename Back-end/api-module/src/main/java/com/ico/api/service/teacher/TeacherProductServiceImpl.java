package com.ico.api.service.teacher;

import com.ico.api.dto.teacher.TeacherProductImgReqDto;
import com.ico.api.dto.teacherProduct.ProductQRReqDto;
import com.ico.api.dto.teacherProduct.ProductQRResDto;
import com.ico.api.dto.teacherProduct.ProductQRColDto;
import com.ico.api.dto.teacherProduct.TeacherProductAllResDto;
import com.ico.api.dto.teacherProduct.TeacherProductDetailResDto;
import com.ico.api.service.S3UploadService;
import com.ico.api.service.inflation.ShopTransactionService;
import com.ico.api.service.transaction.TransactionService;
import com.ico.api.user.JwtTokenProvider;
import com.ico.api.util.Formatter;
import com.ico.core.code.Role;
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
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

/**
 * @author 변윤경
 * @author 서재건
 * @author 강교철
 */
@Slf4j
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
    private final JwtTokenProvider jwtTokenProvider;
    private final ShopTransactionService shopTransactionService;
    private final RedisTemplate<String, Object> redisTemplate;

    /**
     * 교사 상품 등록
     *
     * @param product 교사 상품
     */
    @Override
    public void createProduct(HttpServletRequest request, TeacherProductReqDto product, List<MultipartFile> files) {
        String token = jwtTokenProvider.parseJwt(request);
        checkRoleAndWareHousePower(token);
        Long nationId = jwtTokenProvider.getNation(token);

        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        // 같은 국가에 같은 선생님 상품 이름이 있는지 확인
        if (teacherProductRepository.findByNationIdAndTitle(nationId, product.getTitle()).isPresent()) {
            throw new CustomException(ErrorCode.ALREADY_EXIST_TITLE);
        }

        TeacherProduct teacherProduct = TeacherProduct.builder()
                .nation(nation)
                .title(product.getTitle())
                .amount(product.getAmount())
                .images(s3UploadService.saveImageURLs(files))
                .detail(product.getDetail())
                .count(product.getCount())
                .isCoupon(product.getIsCoupon())
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
    public List<TeacherProductAllResDto> findAllProduct(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        if (nationRepository.findById(nationId).isEmpty()) {
            throw new CustomException(ErrorCode.NATION_NOT_FOUND);
        }

        List<TeacherProduct> productList = teacherProductRepository.findAllByNationId(nationId);
        List<TeacherProductAllResDto> resProductList = new ArrayList<>();

        for (TeacherProduct product : productList) {
            TeacherProductAllResDto resDto = TeacherProductAllResDto.builder()
                    .id(product.getId())
                    .title(product.getTitle())
                    .amount(product.getAmount())
                    .images(s3UploadService.getImageURLs(product.getImages()))
                    .count(product.getCount())
                    .sold(product.getSold())
                    .isCoupon(product.getIsCoupon())
                    .date(product.getDate().format(Formatter.date))
                    .build();

            resProductList.add(resDto);
        }

        return resProductList;
    }

    /**
     * 교사 상품 구매
     *
     * @param dto
     * @param request
     * @return (string) 상품id,상품id,...
     */
    @Transactional
    @Override
    public String buyProduct(ProductQRReqDto dto, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // QR코드 유효 시간 내인지 확인
        long now = System.currentTimeMillis();
        log.info("[buyProduct] : now_{}, qr_valid_{}", now, dto.getUnixTime() + (3 * 60 * 1000));
        if(dto.getUnixTime() + (3 * 60 * 1000) < now || dto.getUnixTime() > now){
            throw new CustomException(ErrorCode.TIME_OUT_QR);
        }

        StringBuilder sb = new StringBuilder();

        for (ProductQRColDto productDto : dto.getProductList()) {
            // 타입이 일치하는지 확인
            TeacherProduct product = teacherProductRepository.findByIdAndNationId(productDto.getId(), nationId)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_AUTHORIZATION_NATION));

            // 재고 있는지 확인
            if (product.getCount() == (product.getSold() + productDto.getCount())) {
                throw new CustomException(ErrorCode.SOLD_OUT);
            }

            // 잔고가 충분한지 확인
            int amount = product.getAmount() * productDto.getCount();
            int account = student.getAccount();
            if (amount > account) {
                throw new CustomException(ErrorCode.LOW_BALANCE);
            }

            // 상품 가격 지불
            student.setAccount(account - amount);
            studentRepository.save(student);

            // 거래 내역 추가
            transactionService.addTransactionWithdraw("교사 상점", studentId, amount, product.getTitle());

            // 상점 거래 내역 기록
            shopTransactionService.addShopTransaction(nationId, amount);

            // 재고 개수 수정
            product.setSold((byte) (product.getSold() + productDto.getCount()));

            if (product.getIsCoupon()) {
                // 인벤토리에 추가
                Optional<Coupon> couponOptional = couponRepository.findByTeacherProductIdAndStudentId(productDto.getId(), studentId);
                Coupon coupon;
                if (couponOptional.isPresent()) {
                    coupon = couponOptional.get();
                    coupon.setCount((byte) (coupon.getCount() + productDto.getCount()));
                } else {
                    coupon = Coupon.builder()
                            .student(student)
                            .teacherProduct(product)
                            .title(product.getTitle())
                            .count(productDto.getCount().byteValue())
                            .isAssigned(false)
                            .build();
                }
                couponRepository.save(coupon);
            }
            sb.append(product.getId()).append(",");
        }

        // Redis에 학생의 구매 시간 저장
        saveRedis(String.valueOf(studentId) + sb.toString(), LocalDateTime.now().format(Formatter.dateTimeSeconds));

        return sb.toString();
    }

    /**
     * QR스캔을 통한 교사 상품 대여
     *
     * @param request
     * @param dto qr 시작 시간, 상품 id
     * @return 상품 id
     */
//    @Transactional
//    @Override
//    public Long rentalProduct(HttpServletRequest request, ProductQRReqDto dto) {
//        String token = jwtTokenProvider.parseJwt(request);
//        Long nationId = jwtTokenProvider.getNation(token);
//        Long studentId = jwtTokenProvider.getId(token);
//
//        Student student = studentRepository.findById(studentId)
//                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
//
//        // QR코드 유효 시간 내인지 확인
//        long now = System.currentTimeMillis();
//        log.info("[rentalProduct] : now_{}, qr_valid_{}", now, dto.getUnixTime() + (3 * 60 * 1000));
//        if(dto.getUnixTime() + (3 * 60 * 1000) < now || dto.getUnixTime() > now){
//            throw new CustomException(ErrorCode.TIME_OUT_QR);
//        }
//
//        // 타입이 일치하는지 확인
//        TeacherProduct product = teacherProductRepository.findByIdAndNationId(dto.getId(), nationId)
//                .orElseThrow(() -> new CustomException(ErrorCode.NOT_AUTHORIZATION_NATION));
//        if (!product.getIsCoupon()) {
//            throw new CustomException(ErrorCode.NOT_RENTAL);
//        }
//
//        // 재고 있는지 확인
//        if (product.getCount() == product.getSold()) {
//            throw new CustomException(ErrorCode.SOLD_OUT);
//        }
//
//        // 잔고가 충분한지 확인
//        int amount = product.getAmount();
//        int account = student.getAccount();
//        if (amount > account) {
//            throw new CustomException(ErrorCode.LOW_BALANCE);
//        }
//
//        // 상품 가격 지불
//        student.setAccount(account - amount);
//        studentRepository.save(student);
//
//        // 거래 내역 추가
//        transactionService.addTransactionWithdraw("교사 상점", studentId, amount, product.getTitle());
//
//        // 상점 거래 내역 기록
//        shopTransactionService.addShopTransaction(nationId, amount);
//
//        // 재고 개수 수정
//        product.setSold((byte) (product.getSold() + 1));
//        teacherProductRepository.save(product);
//
//        // Redis에 학생의 구매 시간 저장
//        saveRedis(String.valueOf(studentId) + product.getId(), LocalDateTime.now().format(Formatter.dateTimeSeconds));
//
//        return product.getId();
//    }

    /**
     * 교사 상품 상세정보 조회
     *
     * @param request
     * @param id
     * @return
     */
    @Override
    public TeacherProductDetailResDto detailProduct(HttpServletRequest request, Long id) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        TeacherProduct product = teacherProductRepository.findByIdAndNationId(id, nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_AUTHORIZATION_NATION));

        return TeacherProductDetailResDto.builder()
                .id(id)
                .title(product.getTitle())
                .amount(product.getAmount())
                .images(s3UploadService.getImageURLs(product.getImages()))
                .detail(product.getDetail())
                .count(product.getCount())
                .isCoupon(product.getIsCoupon())
                .sold(product.getSold())
                .date(product.getDate().format(Formatter.date))
                .build();
    }

    @Override
    @Transactional
    public void deleteTeacherProduct(Long teacherProductId, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        checkRoleAndWareHousePower(token);
        Long nationId = jwtTokenProvider.getNation(token);

        TeacherProduct teacherProduct = teacherProductRepository.findById(teacherProductId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        if (teacherProduct.getNation().getId().equals(nationId)) {
            throw new CustomException(ErrorCode.NOT_AUTHORIZATION_NATION);
        }
        Arrays.stream(teacherProduct.getImages().split(","))
                .forEach(s3UploadService::deleteFile);
        teacherProductRepository.delete(teacherProduct);
    }

    @Override
    public List<ProductQRResDto> findBuyTransaction(String redisProductKey, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);

        String key = studentId + redisProductKey;
        // Redis에 학생id+상품id들(key) 값이 존재하는 경우 날짜(value) 반환
        String dateTime = String.valueOf(Optional
                .ofNullable(redisTemplate.opsForValue().get(key))
                .orElseThrow(() -> new CustomException(ErrorCode.EXPIRE_BUY_TRANSACTION)));
        // 반환 후 삭제
        redisTemplate.delete(key);

        String[] ids = redisProductKey.split(",");

        // TODO : seller 분리해야할 것 같고, 갯수 필드도 필요하지 않을까 싶네...
        List<ProductQRResDto> dtoList = new ArrayList<>();
        for (String id : ids) {
            TeacherProduct product = teacherProductRepository.findByIdAndNationId(Long.valueOf(id), nationId)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_AUTHORIZATION_NATION));
            ProductQRResDto dto = ProductQRResDto.builder()
                    .title(product.getTitle())
                    .seller("선생님")
                    .price(product.getAmount())
                    .date(LocalDateTime.parse(dateTime, Formatter.dateTimeSeconds))
                    .build();
            dtoList.add(dto);
        }

        return dtoList;
    }

    @Override
    public void updateTeacherProduct(Long teacherProductId, HttpServletRequest request, TeacherProductReqDto dto) {
        String token = jwtTokenProvider.parseJwt(request);
        checkRoleAndWareHousePower(token);
        Long nationId = jwtTokenProvider.getNation(token);
        TeacherProduct teacherProduct = teacherProductRepository.findByIdAndNationId(teacherProductId, nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        // 같은 국가에 같은 선생님 상품 이름이 있는지 확인
        if (teacherProductRepository.findByNationIdAndTitle(nationId, dto.getTitle()).isPresent()) {
            throw new CustomException(ErrorCode.ALREADY_EXIST_TITLE);
        }

        teacherProduct.updateTeacherProduct(dto, teacherProduct.getCount() == dto.getCount() ? teacherProduct.getSold() : (byte) 0);
        teacherProductRepository.save(teacherProduct);
    }

    @Transactional
    @Override
    public void updateProductImage(Long teacherProductId, HttpServletRequest request, TeacherProductImgReqDto dto, List<MultipartFile> newImages) {
        String token = jwtTokenProvider.parseJwt(request);
        checkRoleAndWareHousePower(token);
        Long nationId = jwtTokenProvider.getNation(token);
        TeacherProduct teacherProduct = teacherProductRepository.findByIdAndNationId(teacherProductId, nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));
        // 이미지 수정 중 존재하는 이미지라고 온 리스트와 비교해서 없는 이미지는 삭제
        if (dto.getExistingImages() != null) {
            String existImage = teacherProduct.getImages();
            String[] images = teacherProduct.getImages().split(",");
            for (String image : images) {
                if (!dto.getExistingImages().contains(s3UploadService.getFileURL(image))) {
                    existImage = existImage.replace(image + ",", "");
                    s3UploadService.deleteFile(image);
                }
            }
            teacherProduct.setImages(existImage);
        } else {
            teacherProduct.setImages("");
            Arrays.stream(teacherProduct.getImages().split(","))
                    .forEach(s3UploadService::deleteFile);
        }

        // 추가되는 이미지
        teacherProduct.setImages(teacherProduct.getImages() + s3UploadService.saveImageURLs(newImages));
        teacherProductRepository.save(teacherProduct);
        log.info("[updateProductImage] 이미지 수정 완료.");
    }

    /**
     * Redis 에 key : value 저장
     * 만료 시간 5분
     *
     * @param key 학생 id + 상품 id
     * @param value 구매 날짜 시간(yyyy.MM.dd-HH:mm:ss)
     */

    private void saveRedis(String key, String value) {
        redisTemplate.opsForValue().set(key,  value, 5, TimeUnit.MINUTES);
    }

    /**
     * 학생이 요청할 때는 권한 확인
     *
     * @param token
     */
    private void checkRoleAndWareHousePower(String token) {
        Role role = jwtTokenProvider.getRole(token);

        if (role == Role.STUDENT) {
            Student student = studentRepository.findById(jwtTokenProvider.getId(token))
                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
            String emPowered = student.getEmpowered();
            // 권한이 없거나 비어있다면 Error
            if (emPowered == null || emPowered.trim().isEmpty() || !emPowered.contains("5")) {
                throw new CustomException(ErrorCode.WRONG_ROLE);
            }
        }
    }
}
