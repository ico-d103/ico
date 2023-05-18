package com.ico.api.controller;


import com.ico.api.dto.bank.InterestAllDto;
import com.ico.api.dto.bank.InterestStudentResDto;
import com.ico.api.service.bank.InterestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * 이자율 Controller
 *
 * @author 변윤경
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/interest")
public class InterestController {
    private final InterestService interestService;

    /**
     * 자신의 해당 이자율 조회
     *
     * @return Httpstatus
     */
    @GetMapping("/student")
    public ResponseEntity<InterestStudentResDto> getMyInterest(HttpServletRequest request) {
        return ResponseEntity.ok(interestService.myInterest(request));
    }

    /**
     * 국가의 이자율 조회
     *
     * @return Httpstatus
     */
    @GetMapping
    public ResponseEntity<InterestAllDto> findAllInterest(HttpServletRequest request) {
        return ResponseEntity.ok(interestService.findAllInterest(request));
    }

    /**
     * 국가의 이자율 수정
     *
     * @param dto 신용등급별 장기 이자율들, 단기 이자율들
     * @return Httpstatus
     */
    @PutMapping("/teacher")
    public ResponseEntity<HttpStatus> updateInterest(HttpServletRequest request, @RequestBody InterestAllDto dto) {
        interestService.updateInterest(request, dto);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
