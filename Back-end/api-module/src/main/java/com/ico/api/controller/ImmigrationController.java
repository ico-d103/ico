package com.ico.api.controller;

import com.ico.api.dto.immigration.ImmigrationReqDto;
import com.ico.api.service.immigration.ImmigrationService;
import com.ico.api.dto.student.StudentSseDto;
import com.ico.api.sse.SseEmitters;
import com.ico.core.entity.Immigration;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

/**
 * 입국심사 관련 Controller
 *
 * @author 강교철
 * @author 서재건
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/immigration")
public class ImmigrationController {

    private final ImmigrationService immigrationService;

    private final SseEmitters sseEmitters;

    /**
     * 입국 심사 요청
     *
     * @param reqDto
     * @param request
     * @return OK
     */
    @PostMapping("/student")
    public ResponseEntity<HttpStatus> createImmigration(@Valid @RequestBody ImmigrationReqDto reqDto, HttpServletRequest request) {
        immigrationService.createImmigration(reqDto, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 입국 심사 요청 조회
     *
     * @param request
     * @return Immigration
     */
    @GetMapping("/student")
    public ResponseEntity<Immigration> getImmigration(HttpServletRequest request) {
        return new ResponseEntity<>(immigrationService.getImmigration(request), HttpStatus.OK);
    }

    /**
     * 입국 심사 요청 삭제
     *
     * @param request
     * @return OK
     */
    @DeleteMapping("/student")
    public ResponseEntity<HttpStatus> delImmigration(HttpServletRequest request) {
        immigrationService.deleteImmigration(request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 입국 심사 승인
     *
     * @param immigrationId
     * @param request
     * @return OK
     */
    @PutMapping("/teacher/{immigrationId}")
    public ResponseEntity<HttpStatus> approveImmigration(@PathVariable Long immigrationId, HttpServletRequest request) {
        immigrationService.approveImmigration(immigrationId, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 입국 심사 반려
     *
     * @param immigrationId
     * @param request
     * @return OK
     */
    @DeleteMapping("/teacher/{immigrationId}")
    public ResponseEntity<HttpStatus> companionImmigration(@PathVariable Long immigrationId, HttpServletRequest request) {
        immigrationService.companionImmigration(immigrationId, request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * 입국요청 목록 조회
     *
     * @return
     */
    @GetMapping("/teacher")
    public ResponseEntity<List<StudentSseDto>> findAllImmigrationStudent(HttpServletRequest request) {
        return ResponseEntity.ok(immigrationService.findAllImmigrationStudent(request));
    }

    /**
     * 입국 요청 목록 페이지에서 SSE 연결
     * header 의 "X-Accel-Buffering: no" 설정으로 SSE 응답에 대해 Nginx 의 버퍼링 기능 비활성화
     *
     * @return SseEmitter 객체
     */
    @GetMapping(value = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connect() {
        SseEmitter emitter = new SseEmitter(1000L * 60 * 10);    // 만료시간 10분
        sseEmitters.add(emitter);
        try {
            emitter.send(SseEmitter.event()
                    .name("connect")
                    .data("connected!"));
        } catch (IOException e) {
            log.info("connect 연결 실패");
            throw new RuntimeException(e);
        }
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("X-Accel-Buffering", "no");
        httpHeaders.add("Access-Control-Allow-Origin", "*");
        return ResponseEntity.ok().headers(httpHeaders).body(emitter);
    }
}
