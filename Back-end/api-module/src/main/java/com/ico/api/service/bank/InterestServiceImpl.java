package com.ico.api.service.bank;

import com.ico.api.dto.bank.DepositStudentResDto;
import com.ico.api.dto.bank.InterestAllDto;
import com.ico.api.dto.bank.InterestStudentResDto;
import com.ico.api.util.Formatter;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.document.Deposit;
import com.ico.core.entity.Interest;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.DepositMongoRepository;
import com.ico.core.repository.InterestRepository;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * 국가 이자율 Service
 *
 * @author 변윤경
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class InterestServiceImpl implements InterestService {
    private final NationRepository nationRepository;
    private final StudentRepository studentRepository;
    private final InterestRepository interestRepository;
    private final DepositMongoRepository depositMongoRepository;
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 나의 이자율 조회
     *
     * @return 해당 장단기 이자율, 계좌 잔액
     */
    @Override
    public InterestStudentResDto myInterest(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        byte myCredit = student.getCreditRating();

        // 신용등급이 1~10사이가 아닐 때
        if (myCredit < 1 || myCredit > 10) {
            throw new CustomException(ErrorCode.BAD_CREDIT_RATING);
        }

        Interest interest = interestRepository.findByNationIdAndCreditRating(nationId, myCredit)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_INTEREST));

        // 나의 진행중인 예금
        Optional<Deposit> depositOptional = depositMongoRepository.findByStudentId(studentId);
        DepositStudentResDto myDeposit = new DepositStudentResDto();
        if(depositOptional.isPresent()){
            Deposit deposit = depositOptional.get();
            boolean isEnd = !LocalDateTime.now().toLocalDate().isBefore(deposit.getEndDate().toLocalDate());

            myDeposit = myDeposit.builder()
                    .amount(deposit.getAmount())
                    .depositAmount(deposit.getAmount() * deposit.getInterest() / 100)
                    .interest(deposit.getInterest())
                    .startDate(deposit.getStartDate().format(Formatter.date))
                    .endDate(deposit.getEndDate().format(Formatter.date))
                    .creditRating(deposit.getCreditRating())
                    .build();
        }

        return InterestStudentResDto.builder()
                .account(student.getAccount())
                .creditRating(myCredit)
                .longPeriod(interest.getLongPeriod())
                .shortPeriod(interest.getShortPeriod())
                .myDeposit(myDeposit)
                .build();
    }

    /**
     * 국가의 전체 이자율 조회
     *
     * @return 장기 이자율 리스트, 단기 이자율 리스트
     */
    @Override
    public InterestAllDto findAllInterest(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
        List<Interest> interestList = interestRepository.findAllByNationIdOrderByCreditRating(nationId);

        // 국가의 이자율 여부 확인
        if (interestList.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_INTEREST);
        }

        // 신용등급별 이자율이 제대로 들어가 있지 않을 때
        if (!allCreditRatingExist(interestList)) {
            throw new CustomException(ErrorCode.NOT_All_INTEREST_EXIST);
        }

        List<Byte> longPeriod = new ArrayList<>();
        List<Byte> shortPeriod = new ArrayList<>();

        for (Interest interest : interestList) {
            longPeriod.add(interest.getLongPeriod());
            shortPeriod.add(interest.getShortPeriod());
        }

        return InterestAllDto.builder()
                .longPeriod(longPeriod)
                .shortPeriod(shortPeriod)
                .build();
    }

    /**
     * 이자율 수정
     *
     * @param dto 단기 이자율 값들, 장기 이자율 값들
     */
    @Transactional
    @Override
    public void updateInterest(HttpServletRequest request, InterestAllDto dto) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        // 나라 확인
        if (nationRepository.findById(nationId).isEmpty()) {
            throw new CustomException(ErrorCode.NATION_NOT_FOUND);
        }

        List<Interest> interestList = interestRepository.findAllByNationIdOrderByCreditRating(nationId);

        // 신용등급별 이자율이 제대로 들어가 있지 않을 때
        if (!allCreditRatingExist(interestList)) {
            throw new CustomException(ErrorCode.NOT_All_INTEREST_EXIST);
        }

        // 수정된 이자율 값들
        List<Byte> shortPeriods = dto.getShortPeriod();
        List<Byte> longPeriods = dto.getLongPeriod();

        // 이자율 리스트 값이 10개보다 많거나 적을 때
        if (shortPeriods.size() != 10 || longPeriods.size() != 10) {
            throw new CustomException(ErrorCode.BAD_UPDATE_INTEREST);
        }

        // 이자율이 0이상인지 확인
        if (Collections.min(shortPeriods) < 0 || Collections.min(longPeriods) < 0) {
            throw new CustomException(ErrorCode.LOWER_INTEREST);
        }

        // 이자율이 신용등급이 낮을수록 낮아지는지 확인
        if (!isDescending(shortPeriods) || !isDescending(longPeriods)) {
            throw new CustomException(ErrorCode.INTEREST_NOT_DESCENDING);
        }

        for (int i = 0; i < 10; i++) {
            byte sPeriod = shortPeriods.get(i);
            byte lPeriod = longPeriods.get(i);
            Interest interest = interestList.get(i);

            // 이자율이 수정된 신용등급인 경우
            if (interest.getLongPeriod() != lPeriod || interest.getShortPeriod() != sPeriod) {
                if (interest.getLongPeriod() != lPeriod) {
                    interest.setLongPeriod(lPeriod);
                }
                if (interest.getShortPeriod() != sPeriod) {
                    interest.setShortPeriod(sPeriod);
                }
                interestRepository.save(interest);
            }
        }
    }


    /**
     * 1에서 10까지의 CreditRating이 모두 존재하는지 확인
     *
     * @param interestList DB에 존재하는 이자율들
     * @return 올바른 값인지
     */
    private boolean allCreditRatingExist(List<Interest> interestList) {
        Set<Byte> creditRatingSet = new HashSet<>();
        for (Interest interest : interestList) {
            creditRatingSet.add(interest.getCreditRating());
        }

        boolean allCreditRatingExist = true;
        for (byte i = 1; i <= 10; i++) {
            if (!creditRatingSet.contains(i)) {
                allCreditRatingExist = false;
                break;
            }
        }
        return allCreditRatingExist;
    }

    /**
     * 신용등급이 낮아질수록 이자율이 낮아지는지 체크(내림차순 체크)
     *
     * @param list 입력받은 수정 이자율
     * @return boolean
     */
    private boolean isDescending(List<Byte> list) {
        List<Byte> sortedList = new ArrayList<>(list);
        Collections.sort(sortedList, Collections.reverseOrder());
        return sortedList.equals(list);
    }


}
