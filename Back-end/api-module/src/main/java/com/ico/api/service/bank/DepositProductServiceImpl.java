package com.ico.api.service.bank;


import com.ico.api.dto.bank.DepositProductReqDto;
import com.ico.api.dto.bank.DepositProductStudentColResDto;
import com.ico.api.dto.bank.DepositProductStudentResDto;
import com.ico.api.dto.bank.DepositProductTeacherResDto;
import com.ico.api.dto.bank.DepositStudentResDto;
import com.ico.api.dto.bank.depositProductJoinedStudentResDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.api.util.Formatter;
import com.ico.core.entity.Deposit;
import com.ico.core.dto.DepositUpdatetDto;
import com.ico.core.entity.DepositProduct;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.DepositRepository;
import com.ico.core.repository.DepositProductRepository;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @author 변윤경
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class DepositProductServiceImpl implements DepositProductService{
    private final JwtTokenProvider jwtTokenProvider;
    private final NationRepository nationRepository;
    private final StudentRepository studentRepository;
    private final DepositProductRepository depositProductRepository;
    private final DepositRepository depositRepository;

    @Override
    public List<DepositProductTeacherResDto> findAllDepositTeacher(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        // 나라의 예금 상품 목록
        List<DepositProduct> depositProductList = depositProductRepository.findAllByNationId(nation.getId());

        // 예금 상품 목록의 col
        List<DepositProductTeacherResDto> colDepositList = new ArrayList<>();

        for(DepositProduct depositProduct : depositProductList){
            List<depositProductJoinedStudentResDto> studentInfoList = new ArrayList<depositProductJoinedStudentResDto>();

            // 해당 예금 상품에 가입한 학생 목록
            List<Deposit> depositList = depositRepository.findAllByDepositProductId(depositProduct.getId());
            for(Deposit deposit: depositList){
                depositProductJoinedStudentResDto studentInfo = new depositProductJoinedStudentResDto();
                studentInfo.setName(deposit.getName());
                studentInfo.setNumber(deposit.getNumber());
                studentInfo.setAmount(deposit.getAmount());
                studentInfo.setStartDate(deposit.getStartDate().toLocalDate().toString());
                studentInfo.setEndDate(deposit.getEndDate().toLocalDate().toString());
                studentInfoList.add(studentInfo);
            }

            DepositProductTeacherResDto resDto = new DepositProductTeacherResDto().of(depositProduct);
            resDto.setStudents(studentInfoList);

            colDepositList.add(resDto);
        }
        return colDepositList;
    }

    @Override
    public DepositProductStudentResDto findAllDepositStudent(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        // 나라의 예금 상품 목록
        List<DepositProduct> depositProductList = depositProductRepository.findAllByNationId(nationId);

        // (예금 상품 + 나의 예상 이자율) 목록
        List<DepositProductStudentColResDto> depositList = new ArrayList<>();

        for(DepositProduct deposit : depositProductList){
            // 예금 상품 + 나의 예상 이자율
            DepositProductStudentColResDto colDeposit = new DepositProductStudentColResDto();

            colDeposit.setId(deposit.getId());
            colDeposit.setTitle(deposit.getTitle());
            colDeposit.setPeriod(deposit.getPeriod());
            colDeposit.setInterest(getMyDepositInterest(student.getCreditRating(), deposit));

            depositList.add(colDeposit);
        }

        List<DepositStudentResDto> myDepositListReturn = new ArrayList<>();
        List<Deposit> myDepositList = depositRepository.findAllByStudentId(studentId);
        for(Deposit deposit : myDepositList){
            boolean isEnd = !LocalDate.now().isBefore(deposit.getEndDate().toLocalDate());
            DepositStudentResDto myDeposit = DepositStudentResDto.builder()
                    .id(deposit.getId())
                    .title(deposit.getTitle())
                    .amount(deposit.getAmount())
                    .interestAmount(deposit.getAmount() * deposit.getInterest() / 100)
                    .interest(deposit.getInterest())
                    .startDate(deposit.getStartDate().format(Formatter.date))
                    .endDate(deposit.getEndDate().format(Formatter.date))
                    .creditRating(deposit.getCreditRating())
                    .end(isEnd)
                    .build();
            myDepositListReturn.add(myDeposit);
        }

        return DepositProductStudentResDto.builder()
                .account(student.getAccount())
                .product(depositList)
                .myInfo(myDepositListReturn)
                .build();



    }

    @Override
    public DepositStudentResDto getDepositDetail(HttpServletRequest request, Long depositId) {
        Long studentId = jwtTokenProvider.getId(jwtTokenProvider.parseJwt(request));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));


        Deposit deposit = depositRepository.findByIdAndStudentId(depositId, studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_DEPOSIT));

        boolean isEnd = !LocalDate.now().isBefore(deposit.getEndDate().toLocalDate());

        return DepositStudentResDto.builder()
                .id(deposit.getId())
                .title(deposit.getTitle())
                .amount(deposit.getAmount())
                .interestAmount(deposit.getAmount() * deposit.getInterest() / 100)
                .interest(deposit.getInterest())
                .startDate(deposit.getStartDate().format(Formatter.date))
                .endDate(deposit.getEndDate().format(Formatter.date))
                .creditRating(deposit.getCreditRating())
                .end(isEnd)
                .build();
    }

    @Override
    public void addDeposit(HttpServletRequest request, DepositProductReqDto dto) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        // 이자율 값 들
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

        DepositProduct depositProduct = DepositProduct.builder()
                .nation(nation)
                .title(dto.getTitle())
                .period(dto.getPeriod())
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

        depositProductRepository.save(depositProduct);
    }

    @Override
    public void updateDeposit(HttpServletRequest request, Long depositId, DepositUpdatetDto dto) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        DepositProduct depositProduct = depositProductRepository.findByIdAndNationId(depositId, nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_DEPOSIT_PRODUCT));

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

        depositProduct.updateDepositProduct(dto);
        depositProductRepository.save(depositProduct);
    }

    @Override
    public void deleteDeposit(Long depositId) {
        DepositProduct depositProduct = depositProductRepository.findById(depositId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_DEPOSIT_PRODUCT));

        depositProductRepository.delete(depositProduct);
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
     * 나의 신용등급에 따른 이자율
     *
     * @param creditRating 나의 신용 등급
     * @param deposit 애금 상품
     * @return
     */
    public Byte getMyDepositInterest(Byte creditRating, DepositProduct deposit){
        switch (creditRating){
            case 1: return deposit.getGrade_1();
            case 2: return deposit.getGrade_2();
            case 3: return deposit.getGrade_3();
            case 4: return deposit.getGrade_4();
            case 5: return deposit.getGrade_5();
            case 6: return deposit.getGrade_6();
            case 7: return deposit.getGrade_7();
            case 8: return deposit.getGrade_8();
            case 9: return deposit.getGrade_9();
            case 10: return deposit.getGrade_10();
        }
        throw new CustomException(ErrorCode.NOT_FOUND_DEPOSIT_PRODUCT);
    }
}
