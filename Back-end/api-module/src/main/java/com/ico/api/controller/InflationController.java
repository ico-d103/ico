package com.ico.api.controller;

import com.ico.api.dto.inflation.InflationResDto;
import com.ico.api.service.inflation.InflationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 인플레이션 관련 Controller
 *
 * @author 서재건
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/inflation")
public class InflationController {

    private final InflationService inflationService;

    /**
     * 해당 나라의 인플레이션 조회
     *
     * @param request
     * @return
     */
    @GetMapping("/teacher")
    public ResponseEntity<List<InflationResDto>> findInflation(HttpServletRequest request) {
        return ResponseEntity.ok(inflationService.findInflation(request));
    }
}
