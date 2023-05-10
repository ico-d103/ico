package com.ico.api.controller;


import com.ico.api.dto.rule.RuleReqDto;
import com.ico.api.dto.rule.RuleResDto;
import com.ico.api.service.rule.RuleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
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
    public ResponseEntity<List<RuleResDto>> findAllRule(HttpServletRequest request) {
        return ResponseEntity.ok(ruleService.findAllRule(request));
    }

    /**
     * 학급규칙 추가
     *
     * @param dto
     * @return
     */
    @PostMapping("/teacher")
    public ResponseEntity<HttpStatus> addRule(@Valid @RequestBody RuleReqDto dto, HttpServletRequest request) {
        ruleService.addRule(dto, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 학급규칙 수정
     *
     * @param dto
     * @param ruleId
     * @param request
     * @return
     */
    @PutMapping("/teacher/{ruleId}")
    public ResponseEntity<HttpStatus> addRule(@Valid @RequestBody RuleReqDto dto, @PathVariable Long ruleId, HttpServletRequest request) {
        ruleService.updateRule(dto, ruleId, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/teacher/{ruleId}")
    public ResponseEntity<HttpStatus> deleteRule(@PathVariable Long ruleId) {
        ruleService.deleteRule(ruleId);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
