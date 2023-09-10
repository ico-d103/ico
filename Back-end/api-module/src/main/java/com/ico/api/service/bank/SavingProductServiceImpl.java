package com.ico.api.service.bank;

import com.ico.api.dto.bank.ProductJoinedStudentResDto;
import com.ico.api.dto.bank.SavingProductReqDto;
import com.ico.api.dto.bank.SavingProductStudentColResDto;
import com.ico.api.dto.bank.SavingProductStudentResDto;
import com.ico.api.dto.bank.SavingProductTeacherResDto;
import com.ico.api.dto.bank.SavingStudentResDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.api.util.Formatter;
import com.ico.core.document.Saving;
import com.ico.core.dto.SavingUpdateDto;
import com.ico.core.entity.Nation;
import com.ico.core.entity.SavingProduct;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.SavingMongoRepository;
import com.ico.core.repository.SavingProductRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @author 변윤경
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SavingProductServiceImpl implements SavingProductService{
    private final JwtTokenProvider jwtTokenProvider;
    private final NationRepository nationRepository;
    private final StudentRepository studentRepository;
    private final SavingProductRepository savingProductRepository;
    private final SavingMongoRepository savingMongoRepository;


    @Override
    public List<SavingProductTeacherResDto> findAllSavingTeacher(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        List<SavingProduct> savingProductList = savingProductRepository.findAllByNationId(nationId);

        List<SavingProductTeacherResDto> colSavingList = new ArrayList<>();

        for(SavingProduct savingProduct : savingProductList){
            List<ProductJoinedStudentResDto> studentInfoList = new ArrayList<ProductJoinedStudentResDto>();

            List<Saving> savingList = savingMongoRepository.findAllBySavingProductId(savingProduct.getId());
            for(Saving saving: savingList){
                ProductJoinedStudentResDto studentInfo = new ProductJoinedStudentResDto();
                studentInfo.setName(saving.getName());
                studentInfo.setNumber(saving.getNumber());
                studentInfo.setAmount(saving.getAmount());
                studentInfo.setStartDate(saving.getStartDate().toLocalDate().toString());
                studentInfoList.add(studentInfo);
            }

            SavingProductTeacherResDto resDto = new SavingProductTeacherResDto().of(savingProduct);
            resDto.setStudents(studentInfoList);

            colSavingList.add(resDto);
        }
        return colSavingList;
    }

    @Override
    public SavingProductStudentResDto findAllSavingStudent(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        List<SavingProduct> savingProductList = savingProductRepository.findAllByNationId(nationId);

        List<SavingProductStudentColResDto> savingList = new ArrayList<>();

        for(SavingProduct saving : savingProductList){
            SavingProductStudentColResDto colSaving = new SavingProductStudentColResDto();

            colSaving.setId(saving.getId());
            colSaving.setTitle(saving.getTitle());
            colSaving.setCount(saving.getCount());
            colSaving.setAmount(saving.getAmount());
            colSaving.setInterest(getMySavingInterest(student.getCreditRating(), saving));

            savingList.add(colSaving);
        }

        List<SavingStudentResDto> mySavingListReturn = new ArrayList<>();
        List<Saving> mySavingList = savingMongoRepository.findAllByStudentId(studentId);
        for(Saving saving : mySavingList){
            SavingStudentResDto mySaving = new SavingStudentResDto();
            boolean isEnd = saving.getCount() >= saving.getTotalCount();

            mySaving = mySaving.builder()
                    .id(saving.getId())
                    .title(saving.getTitle())
                    .interest(saving.getInterest())
                    .startDate(saving.getStartDate().format(Formatter.date))
                    .interestAmount(saving.getAmount() * saving.getInterest() / 100)
                    .creditRating(saving.getCreditRating())
                    .amount(saving.getAmount())
                    .count(saving.getCount())
                    .totalCount(saving.getTotalCount())
                    .day(getDayOfWeek(saving.getDay()))
                    .end(isEnd)
                    .build();
            mySavingListReturn.add(mySaving);
        }

        SavingProductStudentResDto dto = new SavingProductStudentResDto();
        dto.setAccount(student.getAccount());
        dto.setSavingProduct(savingList);
        dto.setMySaving(mySavingListReturn);

        return dto;
    }

    @Override
    public void addSaving(HttpServletRequest request, SavingProductReqDto dto) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        List<Byte> interest = dto.getInterest();

        // 이자율 리스트 값이 10개보다 많거나 적을 때
        if (interest.size() != 10) {
            throw new CustomException(ErrorCode.BAD_UPDATE_INTEREST);
        }

        // 이자율이 0미만 인지 확인
        if (Collections.min(interest) < 0 ) {
            throw new CustomException(ErrorCode.LOWER_INTEREST);
        }

        // 이자율이 신용등급이 낮을수록 낮아지는지 확인
        if (!isDescending(interest)) {
            throw new CustomException(ErrorCode.INTEREST_NOT_DESCENDING);
        }

        SavingProduct savingProduct = SavingProduct.builder()
                .nation(nation)
                .title(dto.getTitle())
                .count(dto.getCount())
                .amount(dto.getAmount())
                .grade_1(interest.get(0))
                .grade_2(interest.get(1))
                .grade_3(interest.get(2))
                .grade_4(interest.get(3))
                .grade_5(interest.get(4))
                .grade_6(interest.get(5))
                .grade_7(interest.get(6))
                .grade_8(interest.get(7))
                .grade_9(interest.get(8))
                .grade_10(interest.get(9))
                .build();

        savingProductRepository.save(savingProduct);
    }

    @Override
    public void updateSaving(HttpServletRequest request, Long savingProductId, SavingUpdateDto dto) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        SavingProduct savingProduct = savingProductRepository.findByIdAndNationId(savingProductId, nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_SAVING_PRODUCT));

        // 이자율 값 들
        List<Byte> interest = dto.getInterest();

        // 이자율 리스트 값이 10개보다 많거나 적을 때
        if (interest.size() != 10) {
            throw new CustomException(ErrorCode.BAD_UPDATE_INTEREST);
        }

        // 이자율이 0이상인지 확인
        if (Collections.min(interest) < 0 ) {
            throw new CustomException(ErrorCode.LOWER_INTEREST);
        }

        // 이자율이 신용등급이 낮을수록 낮아지는지 확인
        if (!isDescending(interest)) {
            throw new CustomException(ErrorCode.INTEREST_NOT_DESCENDING);
        }

        savingProduct.updateSavingProduct(dto);
        savingProductRepository.save(savingProduct);
    }

    @Override
    public void deleteSaving(Long savingProductId) {
        SavingProduct savingProduct = savingProductRepository.findById(savingProductId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_SAVING_PRODUCT));

        savingProductRepository.delete(savingProduct);
    }

    /**
     * 신용등급이 낮아질수록 이자율이 낮아지는지 체크(내림차순 체크)
     *
     * @param list 입력받은 수정 이자율
     * @return boolean
     */
    private boolean isDescending(List<Byte> list) {
        for (int i = 1; i < list.size(); i++) {
            if(list.get(i-1) < list.get(i)) {
                return false;
            }
        }
        return true;
    }

    /**
     * 나의 신용등급에 따른 적금 이자율
     *
     * @param creditRating
     * @param saving
     * @return
     */
    public Byte getMySavingInterest(Byte creditRating, SavingProduct saving){
        switch (creditRating){
            case 1: return saving.getGrade_1();
            case 2: return saving.getGrade_2();
            case 3: return saving.getGrade_3();
            case 4: return saving.getGrade_4();
            case 5: return saving.getGrade_5();
            case 6: return saving.getGrade_6();
            case 7: return saving.getGrade_7();
            case 8: return saving.getGrade_8();
            case 9: return saving.getGrade_9();
            case 10: return saving.getGrade_10();
        }
        throw new CustomException(ErrorCode.NOT_FOUND_SAVING_PRODUCT);
    }

    /**
     * 적금 납일 일자 한국어 요일로 반환
     *
     * @param day
     * @return
     */
    public String getDayOfWeek(DayOfWeek day){
        switch (day){
            case MONDAY:
                return "월요일";
            case TUESDAY:
                return "화요일";
            case WEDNESDAY:
                return "수요일";
            case THURSDAY:
                return "목요일";
            case FRIDAY:
                return "금요일";
            case SATURDAY:
                return "토요일";
            case SUNDAY:
                return "일요일";

            //TODO: 이후에 토, 일요일 적금 제외시 예외처리 필요
            default:
                throw new CustomException(ErrorCode.BAD_DAY_OF_WEEK);
        }
    }
}

