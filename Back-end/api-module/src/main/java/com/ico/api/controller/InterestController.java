package com.ico.api.controller;


import com.ico.api.dto.bank.AllInterestResDto;
import com.ico.api.dto.bank.MyInterestResDto;
import com.ico.api.service.bank.InterestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author 변윤경
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/interest")
public class InterestController {
    private final InterestService interestService;

    /**
     * 자신의 해당 이자율 조회
     * @return Httpstatus
     */
    @GetMapping("/student")
    public ResponseEntity<MyInterestResDto> getMyInterest(){
        return ResponseEntity.ok(interestService.myInterest());
    }

    /**
     * 국가의 이자율 조회
     * @return Httpstatus
     */
    @GetMapping
    public ResponseEntity<AllInterestResDto> findAllInterest(){
        return ResponseEntity.ok(interestService.findAllInterest());
    }
}
