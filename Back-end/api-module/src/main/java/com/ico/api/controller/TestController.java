package com.ico.api.controller;


import com.ico.api.dto.TestDto;
import com.ico.api.service.MongoService;
import com.ico.api.service.S3UploadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

/**
 * Test Controller
 *
 * @author 서재건
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/test")
public class TestController {

    private final MongoService mongoService;

    private final S3UploadService s3UploadService;

    /**
     * Valid를 사용하여 dto 클래스에 선언한 validation 확인
     *
     * @param dto
     * @return
     */
    @PostMapping
    public ResponseEntity<String> test(@Valid @RequestBody TestDto dto) {
        return ResponseEntity.ok().body("validation 통과");
    }

    /**
     * document insert test
     *
     * @return
     */
    @GetMapping
    public ResponseEntity<String> test() {
        log.info("test 진입");
        mongoService.insertTest();
        return ResponseEntity.ok().body("insert");
    }

    /**
     * S3에 파일 올리는 서비스 기능 예시
     *
     * @param file
     * @return
     */
    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("image") MultipartFile file) {
        log.info(file.getOriginalFilename());
        String fileName = s3UploadService.upload(file);
        return ResponseEntity.ok(fileName);
    }

}
