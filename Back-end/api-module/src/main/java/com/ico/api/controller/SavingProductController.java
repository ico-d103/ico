package com.ico.api.controller;

import com.ico.api.dto.bank.SavingProductReqDto;
import com.ico.api.dto.bank.SavingProductStudentResDto;
import com.ico.api.dto.bank.SavingProductTeacherResDto;
import com.ico.api.service.bank.SavingProductService;
import com.ico.core.dto.SavingUpdateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 적금 상품 Controller
 *
 * @author 변윤경
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/saving-product")
public class SavingProductController {
    private final SavingProductService savingProductService;

    @GetMapping("/teacher/all")
    public ResponseEntity<List<SavingProductTeacherResDto>> findAllSavingTeacher(HttpServletRequest request){
        return ResponseEntity.ok(savingProductService.findAllSavingTeacher(request));
    }

    @GetMapping("/student")
    public ResponseEntity<SavingProductStudentResDto> findAllSavingStudent(HttpServletRequest request){
        return ResponseEntity.ok(savingProductService.findAllSavingStudent(request));
    }

    @PostMapping("/teacher")
    public ResponseEntity<HttpStatus> addSaving(HttpServletRequest request, @RequestBody SavingProductReqDto saving){
        savingProductService.addSaving(request, saving);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("/teacher/{savingProductId}")
    public ResponseEntity<HttpStatus> updateSaving(HttpServletRequest request, @RequestBody SavingUpdateDto saving, @PathVariable Long savingProductId){
        savingProductService.updateSaving(request, savingProductId, saving);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/teacher/{savingProductId}")
    public ResponseEntity<HttpStatus> deleteSaving(@PathVariable Long savingProductId){
        savingProductService.deleteSaving(savingProductId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
