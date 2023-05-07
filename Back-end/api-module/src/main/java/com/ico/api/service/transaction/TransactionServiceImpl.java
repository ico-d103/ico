package com.ico.api.service.transaction;

import com.ico.api.dto.transaction.TransactionResDto;
import com.ico.core.entity.Student;
import com.ico.core.entity.Transaction;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.StudentRepository;
import com.ico.core.repository.TransactionMongoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.ListIterator;
import java.util.Locale;
import java.util.Map;

/**
 * 거래 내역 관련 Service
 *
 * @author 변윤경
 * @author 서재건
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService{

    private final TransactionMongoRepository transactionMongoRepository;

    private final StudentRepository studentRepository;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM월 dd일-HH:mm");

    private static final DateTimeFormatter dayFormatter = DateTimeFormatter.ofPattern("MM월 dd일");

    private static final NumberFormat numberFormat = NumberFormat.getInstance(Locale.US);

    /**
     * 상점 거래
     * 양방향으로 거래 기록
     *
     * @param from 구매자
     * @param to 판매자
     * @param amount 상품 금액
     * @param title 상품 이름
     */
    @Override
    public void addTransaction(Long to, Long from, int amount, String title) {
        Transaction transaction = Transaction.builder()
                .from(String.valueOf(from))
                .to(String.valueOf(to))
                .amount(Math.abs(amount))
                .date(LocalDateTime.now())
                .title(title)
                .build();

        transactionMongoRepository.insert(transaction);
    }

    /**
     * 기관으로 출금
     *
     * @param to 기관(정부, 은행, 투자, 선생님)
     * @param from 학생
     * @param amount 거래 금액
     * @param title 거래 내용
     */
    @Override
    public void addTransactionWithdraw(String to, Long from, int amount, String title) {
        Transaction transaction = Transaction.builder()
                .from(String.valueOf(from))
                .to(to)
                .amount(Math.abs(amount))
                .date(LocalDateTime.now())
                .title(title)
                .build();

        transactionMongoRepository.insert(transaction);
    }

    /**
     * 기관에서 입금
     *
     * @param to 학생
     * @param from 기관(정부, 은행, 투자, 선생님)
     * @param amount 거래 금액
     * @param title 거래 내용
     */
    @Override
    public void addTransactionDeposit(Long to, String from, int amount, String title) {
        Transaction transaction = Transaction.builder()
                .from(from)
                .to(String.valueOf(to))
                .amount(Math.abs(amount))
                .date(LocalDateTime.now())
                .title(title)
                .build();

        transactionMongoRepository.insert(transaction);
    }

    @Transactional(readOnly = true)
    @Override
    public Map<String, List<TransactionResDto>> findTransaction() {
        // TODO: 로그인한 유저 정보 조회 시 나라 id값 대입
        Long studentId = 1L;

        Student student = studentRepository.findById(studentId).orElseThrow(() -> {
            log.info("[findTransaction] studentId[{}]에 해당하는 학생이 없습니다.", studentId);
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        });
        List<Transaction> transactions = transactionMongoRepository.findAllByFromOrTo(String.valueOf(studentId), String.valueOf(studentId));

        // 순서가 있는 map 생성
        Map<String, List<TransactionResDto>> map = new LinkedHashMap<>();

        LocalDateTime now = LocalDateTime.now();
        String curDay = now.format(dayFormatter);
        String yesterday = now.minusDays(1).format(dayFormatter);

        int curAccount = student.getAccount();

        // 최신순으로 조회
        ListIterator<Transaction> iterator = transactions.listIterator(transactions.size());
        while (iterator.hasPrevious()) {
            Transaction transaction = iterator.previous();
            String[] dateTime = transaction.getDate().format(formatter).split("-");

            int amount = transaction.getFrom().equals(String.valueOf(studentId)) ? -1 * transaction.getAmount() : transaction.getAmount();
            String source = getSource(String.valueOf(studentId), transaction) + " · " + dateTime[1];
            int balance = curAccount;
            curAccount += -1 * amount;
            String date = getDay(dateTime[0], curDay, yesterday);

            map.putIfAbsent(date, new ArrayList<>());
            map.get(date).add(TransactionResDto.builder()
                            .title(transaction.getTitle())
                            .amount(numberFormat.format(amount))
                            .source(source)
                            .balance(numberFormat.format(balance))
                    .build());
        }
        return map;
    }

    /**
     * 오늘과 어제일 경우 문자열 추가
     *
     * @param day 거래 날짜
     * @param curDay 오늘 날짜
     * @param yesterday 어제 날짜
     * @return
     */
    private String getDay(String day, String curDay, String yesterday) {
        if (curDay.equals(day)) {
            return day + " · 오늘";
        } else if (yesterday.equals(day)) {
            return day + " · 어제";
        }
        return day;
    }

    /**
     * source가 id값일 경우 학생의 id값 조회하여 학생 이름 반환
     *
     * @param studentId
     * @param transaction
     * @return 거래 대상
     */
    private String getSource(String studentId, Transaction transaction) {
        String source = transaction.getFrom().equals(String.valueOf(studentId)) ? transaction.getTo() : transaction.getFrom();
        if (isNumeric(source)) {
            return "학생 상점";
        }
        return source;
    }

    /**
     * 정규식을 사용하여 숫자 체크
     *
     * @param str
     * @return boolean
     */
    private boolean isNumeric(String str) {
        return str.matches("\\d+");
    }
}
