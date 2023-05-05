package com.ico.api.controller;

import com.ico.api.dto.ImmigrationReqDto;
import com.ico.api.service.ImmigrationService;
import com.ico.core.entity.Immigration;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

/**
 * @author 강교철
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/immigration")
public class ImmigrationController {

    private final ImmigrationService immigrationService;

    /**
     * 입국 심사 요청
     * @param reqDto
     * @param request
     * @return OK
     */
    @PostMapping("/student")
    public ResponseEntity<?> createImmigration(@Valid @RequestBody ImmigrationReqDto reqDto, HttpServletRequest request) {
        immigrationService.createImmigration(reqDto, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 입국 심사 요청 조회
     * @param request
     * @return Immigration
     */
    @GetMapping("/student")
    public ResponseEntity<Immigration> getImmigration(HttpServletRequest request) {
        return new ResponseEntity<>(immigrationService.getImmigration(request), HttpStatus.OK);
    }

    /**
     * 입국 심사 요청 삭제
     * @param request
     * @return OK
     */
    @DeleteMapping("/student")
    public ResponseEntity<?> delImmigration(HttpServletRequest request) {
        immigrationService.deleteImmigration(request);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
