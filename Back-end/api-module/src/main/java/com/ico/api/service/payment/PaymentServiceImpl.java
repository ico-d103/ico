package com.ico.api.service.payment;

import com.ico.api.dto.payment.PaymentSalaryReqDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.code.TaxType;
import com.ico.core.entity.Student;
import com.ico.core.entity.Tax;
import com.ico.core.repository.StudentRepository;
import com.ico.core.repository.TaxRepository;
import com.ico.core.service.DepositSalaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 월급 관련 Service 로직
 *
 * @author 서재건
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final JwtTokenProvider jwtTokenProvider;

    private final StudentRepository studentRepository;

    private final DepositSalaryService depositSalaryService;

    private final TaxRepository taxRepository;

    @Transactional
    @Override
    public void paySalary(PaymentSalaryReqDto dto, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        List<Student> studentList = studentRepository.findAllByIdIn(dto.getStudentIds());

        for (Student student : studentList) {

            if (student.getSalary() == 0) {
                log.info("[paySalary] {} : 해당 학생은 salary 가 0입니다.", student.getName());
                continue;
            }

            Long studentId = student.getId();
            log.info("student name : {}", student.getName());

            // 거래 내역 기록
            depositSalaryService.addTransactionDeposit(studentId, student.getSalary());

            // 세금 출금 내역 기록
            int totalTax = 0;
            // 나라의 세금 항목들
            List<Tax> taxes = taxRepository.findAllByNationId(nationId);
            for (Tax tax : taxes) {
                int amount;
                if (tax.getType() == TaxType.PERCENT) {
                    amount = student.getSalary() * tax.getAmount() / 100;
                } else {
                    amount = tax.getAmount();
                }

                // 세금 항목별 금액에 학생의 세금 더하기
                log.info("title : {}, amount : {}, type : {}", tax.getTitle(), amount, tax.getType());
                DepositSalaryService.addTax((HashMap<Long, Map<String, Integer>>) DepositSalaryService.nationTax, nationId, amount, tax.getTitle());

                // 학생의 총 세금 계산
                totalTax += amount;

                // 세금 기록
                depositSalaryService.addTransactionWithdraw(studentId, amount, tax.getTitle());
            }

            // 세후 월급 계산
            log.info("{}의 세후 월급 : {}", student.getName(), student.getSalary() - totalTax);
            int afterTax = student.getSalary() - totalTax;

            // 잔고 수정(세후 월급 입금)
            student.setAccount(student.getAccount() + afterTax);

            // 일급 누적액 0으로 초기화
            student.setSalary(0);
            studentRepository.save(student);
        }
    }
}
