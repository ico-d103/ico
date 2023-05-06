package com.ico.api.service.rule;

import com.ico.api.dto.rule.RuleResDto;

import java.util.List;

/**
 * 학급 규칙 관련 Service
 *
 * @author 서재건
 */
public interface RuleService {

    /**
     * 학급규칙 조회
     *
     * @return
     */
    List<RuleResDto> findAllRule();
}
