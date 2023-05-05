package com.ico.api.controller;

import com.ico.api.dto.NationReqDto;
import com.ico.api.service.NationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * @author 강교철
 */
@RestController
@RequestMapping("/api/nation")
@RequiredArgsConstructor
public class NationController {

    private final NationService nationService;

    @PostMapping("/teacher")
    public ResponseEntity<?> createNation(@RequestBody NationReqDto reqDto, HttpServletRequest request) {
        nationService.createNation(reqDto, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/teacher")
    public ResponseEntity<?> getNation(HttpServletRequest request) {

        return new ResponseEntity<>(nationService.getNation(request), HttpStatus.OK);
    }

}
