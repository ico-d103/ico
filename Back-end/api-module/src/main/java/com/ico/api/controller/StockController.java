package com.ico.api.controller;

import com.ico.api.dto.stock.StockResTeacherDto;
import com.ico.api.service.stock.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author 변윤경
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/stock")
public class StockController {
    private final StockService stockService;

    @GetMapping("/teacher")
    public ResponseEntity<StockResTeacherDto> stockIssueTeacher(){
        return ResponseEntity.ok(stockService.getIssueTeacher());
    }

}
