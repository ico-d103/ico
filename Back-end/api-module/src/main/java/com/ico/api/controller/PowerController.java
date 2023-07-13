package com.ico.api.controller;

import com.ico.api.service.power.PowerService;
import com.ico.core.entity.Power;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 직업 권한 관련
 *
 * @author 강교철
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("api/power")
public class PowerController {

    private final PowerService powerService;

    /**
     * power 테이블에 값 생성
     * powerEnum 수정이 있을 때만 사용하기
     * @return ok
     */
    @PostMapping
    public ResponseEntity<HttpStatus> createPower() {
        powerService.create();
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 교사가 권한 테이블 전체 조회
     * @param request
     * @return
     */
    @GetMapping("/teacher")
    public ResponseEntity<List<Power>> getPower(HttpServletRequest request) {
        return ResponseEntity.ok(powerService.getPower(request));
    }
}
