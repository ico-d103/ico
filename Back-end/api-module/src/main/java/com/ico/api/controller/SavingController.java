package com.ico.api.controller;

import com.ico.api.service.bank.SavingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * 적금 신청/해지
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/saving")
public class SavingController {
    private final SavingService savingService;

    /**
     * 적금 신청
     * @param request
     * @param savingProductId
     * @return
     */
    @PostMapping("/student/{savingProductId}")
    public ResponseEntity<HttpStatus> createSaving(HttpServletRequest request, @PathVariable Long savingProductId){
        savingService.createSaving(request, savingProductId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 적금 해지/중도해지/수령
     * @param request
     * @param savingId
     * @return
     */
    @DeleteMapping("/student/{savingId}")
    public ResponseEntity<HttpStatus> deleteSaving(HttpServletRequest request, @PathVariable Long savingId){
        savingService.deleteSaving(request, savingId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
