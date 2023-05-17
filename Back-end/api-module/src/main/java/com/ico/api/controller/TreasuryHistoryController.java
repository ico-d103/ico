package com.ico.api.controller;

import com.ico.api.dto.treasuryHistory.TreasuryHistoryColDto;
import com.ico.api.dto.treasuryHistory.TreasuryHistoryDto;
import com.ico.api.dto.treasuryHistory.TreasuryHistoryTeacherResDto;
import com.ico.api.service.treasury.TreasuryHistoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;

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

    /**
     * 교사용 국고 사용 내역 조회
     *
     * @param page
     * @param size
     * @param request
     * @return
     */
    @GetMapping("/teacher")
    public ResponseEntity<TreasuryHistoryTeacherResDto> findAllTreasuryHistory(@RequestParam(value = "page", defaultValue = "1") int page,
                                                                               @RequestParam(value = "size", defaultValue = "10") int size,
                                                                               HttpServletRequest request) {
        return ResponseEntity.ok(treasuryHistoryService.findAllTreasuryHistory(page - 1, size, request));
    }

    /**
     * 국고 사용 내역 입력
     *
     * @param dto
     * @param request
     * @return
     */
    @PostMapping("/teacher")
    public ResponseEntity<HttpStatus> addTreasuryHistory(@Valid @RequestBody TreasuryHistoryDto dto, HttpServletRequest request) {
        treasuryHistoryService.addTreasuryHistory(dto, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 학생용 국고 사용 내역 조회
     *
     * @param request
     * @return
     */
    @GetMapping("/student")
    public ResponseEntity<Map<String, List<TreasuryHistoryColDto>>> findTreasuryHistoryList(HttpServletRequest request) {
        return ResponseEntity.ok(treasuryHistoryService.findTreasuryHistoryList(request));
    }
}
