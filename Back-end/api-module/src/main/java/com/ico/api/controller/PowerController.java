package com.ico.api.controller;

import com.ico.api.service.power.PowerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
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
}
