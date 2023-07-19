package com.ico.api.service.rule;

import com.ico.api.dto.rule.RuleReqDto;
import com.ico.api.dto.rule.RuleResDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.api.util.Formatter;
import com.ico.core.code.Role;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Rule;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.RuleRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * 학급 규칙 관련 Service 로직
 *
 * @author 서재건
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RuleServiceImpl implements RuleService {

    private final RuleRepository ruleRepository;
    private final NationRepository nationRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final StudentRepository studentRepository;

    @Override
    public List<RuleResDto> findAllRule(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        List<Rule> ruleList = ruleRepository.findAllByNationId(nationId);
        List<RuleResDto> resList = new ArrayList<>();
        for (Rule rule : ruleList) {
            String dateTime = rule.getDateTime().format(Formatter.date);
            resList.add(new RuleResDto().of(rule, dateTime));
        }
        return resList;
    }

    @Override
    public void addRule(RuleReqDto dto, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        checkRoleAndPower(token);

        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        // 학급 규칙 제목 중복 체크
        if (ruleRepository.findByNationIdAndTitle(nationId, dto.getTitle()).isPresent()) {
            throw new CustomException(ErrorCode.ALREADY_EXIST_TITLE);
        }

        Rule rule = Rule.builder()
                .nation(nation)
                .title(dto.getTitle())
                .detail(dto.getDetail())
                .build();

        ruleRepository.save(rule);
    }

    @Override
    public void updateRule(RuleReqDto dto, Long ruleId, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        checkRoleAndPower(token);

        Rule rule = ruleRepository.findById(ruleId)
                .orElseThrow(() -> new CustomException(ErrorCode.RULE_NOT_FOUND));

        // 나라 일치 여부 확인
        if (!rule.getNation().getId().equals(nationId)) {
            throw new CustomException(ErrorCode.NOT_AUTHORIZATION_NATION);
        }

        // 학급 규칙 제목 중복 체크
        if (ruleRepository.findByIdNotAndNationIdAndTitle(ruleId, nationId, dto.getTitle()).isPresent()) {
            throw new CustomException(ErrorCode.ALREADY_EXIST_TITLE);
        }

        rule.updateRule(dto.getTitle(), dto.getDetail());

        ruleRepository.save(rule);
    }

    @Override
    public void deleteRule(Long ruleId, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        checkRoleAndPower(token);

        Rule rule = ruleRepository.findById(ruleId)
                .orElseThrow(() -> new CustomException(ErrorCode.RULE_NOT_FOUND));

        // 나라 일치 여부 확인
        if (!rule.getNation().getId().equals(nationId)) {
            throw new CustomException(ErrorCode.NOT_AUTHORIZATION_NATION);
        }
        ruleRepository.delete(rule);
    }

    /**
     * 학생이 요청할 때는 권한 확인
     *
     * @param token
     */
    private void checkRoleAndPower(String token) {
        Role role = jwtTokenProvider.getRole(token);

        if (role == Role.STUDENT) {
            Student student = studentRepository.findById(jwtTokenProvider.getId(token))
                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
            String emPowered = student.getEmpowered();
            // 권한이 없거나 비어있다면 Error
            if (emPowered == null || emPowered.trim().isEmpty() || !emPowered.contains("6")) {
                throw new CustomException(ErrorCode.WRONG_ROLE);
            }
        }
    }
}
