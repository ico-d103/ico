package com.ico.api.service.rule;

import com.ico.api.dto.rule.RuleReqDto;
import com.ico.api.dto.rule.RuleResDto;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Rule;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.RuleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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

    @Override
    public List<RuleResDto> findAllRule() {
        // TODO: 로그인한 유저 정보
        Long nationId = 99L;

        List<Rule> ruleList = ruleRepository.findAllByNationId(nationId);
        List<RuleResDto> resList = new ArrayList<>();
        for (Rule rule : ruleList) {
            resList.add(new RuleResDto().of(rule));
        }
        return resList;
    }

    @Override
    public void addRule(RuleReqDto dto) {

        // TODO: 로그인 기능 구현 시 토큰에서 값 적용
        Long nationId = 99L;
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
    public void updateRule(RuleReqDto dto, Long ruleId) {
        // TODO: 로그인 기능 구현 시 토큰에서 값 적용
        Long nationId = 99L;

        Rule rule = ruleRepository.findById(ruleId)
                .orElseThrow(() -> new CustomException(ErrorCode.RULE_NOT_FOUND));

        // 학급 규칙 제목 중복 체크
        if (ruleRepository.findByNationIdAndTitle(nationId, dto.getTitle()).isPresent()) {
            throw new CustomException(ErrorCode.ALREADY_EXIST_TITLE);
        }

        rule.updateRule(dto.getTitle(), dto.getDetail());

        ruleRepository.save(rule);
    }
}
