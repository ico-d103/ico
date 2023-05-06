package com.ico.api.service.rule;

import com.ico.api.dto.rule.RuleResDto;
import com.ico.core.entity.Rule;
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
}
