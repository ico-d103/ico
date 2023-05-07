package com.ico.api.controller;


import com.ico.api.dto.rule.RuleReqDto;
import com.ico.api.dto.rule.RuleResDto;
import com.ico.api.service.rule.RuleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

/**
 * 학급 규칙 관련 Controller
 *
 * @author 서재건
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rule")
public class RuleController {

    private final RuleService ruleService;

    /**
     * 학급규칙 조회
     *
     * @return
     */
    @GetMapping
    public ResponseEntity<List<RuleResDto>> findAllRule() {
        return ResponseEntity.ok(ruleService.findAllRule());
    }

    /**
     * 학급규칙 추가
     *
     * @param dto
     * @return
     */
    @PostMapping("/teacher")
    public ResponseEntity<HttpStatus> addRule(@Valid @RequestBody RuleReqDto dto) {
        ruleService.addRule(dto);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
