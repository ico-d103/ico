package com.ico.api.controller;


import com.ico.api.dto.bank.AllInterestDto;
import com.ico.api.dto.bank.MyInterestResDto;
import com.ico.api.service.bank.InterestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public ResponseEntity<AllInterestDto> findAllInterest(){
        return ResponseEntity.ok(interestService.findAllInterest());
    }

    /**
     * 국가의 이자율 수정
     * @param dto 신용등급별 장기 이자율들, 단기 이자율들
     * @return Httpstatus
     */
    @PutMapping("/teacher")
    public ResponseEntity<HttpStatus> updateInterest(@RequestBody AllInterestDto dto){
        interestService.updateInterest(dto);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
