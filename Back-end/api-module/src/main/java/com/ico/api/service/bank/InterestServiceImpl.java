package com.ico.api.service.bank;

import com.ico.api.dto.bank.AllInterestResDto;
import com.ico.api.dto.bank.MyInterestResDto;
import com.ico.core.entity.Interest;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.InterestRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author 변윤경
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class InterestServiceImpl implements InterestService{
    private final StudentRepository studentRepository;
    private final InterestRepository interestRepository;

    /**
     * 나의 이자율 조회
     * @return 해당 장단기 이자율, 계좌 잔액
     */
    @Override
    public MyInterestResDto myInterest() {
        long studentId = 1;
        long nationId = 99;
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        byte myCredit = student.getCreditRating();

        // 신용등급이 1~10사이가 아닐 때
        if (myCredit < 1 || myCredit > 10){
            throw new CustomException(ErrorCode.BAD_CREDIT_RATING);
        }

        Interest interest = interestRepository.findByNationIdAndCreditRating(nationId, myCredit)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_INTEREST));

        return MyInterestResDto.builder()
                .account(student.getAccount())
                .creditRating(myCredit)
                .longPeriod(interest.getLongPeriod())
                .shortPeriod(interest.getShortPeriod())
                .build();
    }

    /**
     * 국가의 전체 이자율 조회
     *
     * @return 장기 이자율 리스트, 단기 이자율 리스트
     */
    @Override
    public AllInterestResDto findAllInterest() {
        long nationId = 99;
        List<Interest> interestList = interestRepository.findAllByNationIdOrderByCreditRating(nationId);

        // 국가의 이자율 여부 확인
        if(interestList.isEmpty()){
            throw new CustomException(ErrorCode.NOT_FOUND_INTEREST);
        }

        List<Byte> longPeriod = new ArrayList<>();
        List<Byte> shortPeriod = new ArrayList<>();

        for(Interest interest : interestList){
            longPeriod.add(interest.getLongPeriod());
            shortPeriod.add(interest.getShortPeriod());
        }

        return AllInterestResDto.builder()
                .longPeriod(longPeriod)
                .shortPeriod(shortPeriod)
                .build();
    }
}
