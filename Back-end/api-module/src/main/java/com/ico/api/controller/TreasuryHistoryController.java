package com.ico.api.controller;

import com.ico.api.dto.treasuryHistory.TreasuryHistoryResDto;
import com.ico.api.service.treasury.TreasuryHistoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 국고 사용 내역 관련 Controller
 *
 * @author 서재건
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/treasury-history")
public class TreasuryHistoryController {

    private final TreasuryHistoryService treasuryHistoryService;

    public ResponseEntity<Page<TreasuryHistoryResDto>> findAllTreasuryHistory(@RequestParam(value = "page", defaultValue = "0") int page,
                                                                              @RequestParam(value = "size", defaultValue = "10") int size,
                                                                              HttpServletRequest request) {
        return ResponseEntity.ok(treasuryHistoryService.findAllTreasuryHistory(page, size, request));
    }
}
