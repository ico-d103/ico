package com.ico.api.controller;

import com.ico.api.service.StudentProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/student-product")
public class StudentProductController {

    private final StudentProductService studentProductService;

    @PostMapping("/student/proposal")
    public ResponseEntity<?> uploadProposal(@RequestParam String identity, @RequestParam Long nationId, @RequestParam String title, @RequestParam int amount, @RequestParam String image, @RequestParam String detail, @RequestParam byte count){
        studentProductService.createProduct(identity, nationId, title, amount, image, detail, count);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
