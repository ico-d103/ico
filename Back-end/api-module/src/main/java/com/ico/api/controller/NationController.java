package com.ico.api.controller;

import com.ico.api.dto.NationReqDto;
import com.ico.api.service.NationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class NationController {

    private final NationService nationService;

    @PostMapping("/nation/teacher")
    public ResponseEntity<?> createNation(@RequestBody NationReqDto reqDto, HttpServletRequest request) {
        nationService.createNation(reqDto, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
