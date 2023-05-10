package com.ico.api.sse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ico.api.dto.student.StudentSseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 *
 *
 * @author 서재건
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class SseEmitters {

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * SseEmitter 객체 서버 메모리에 추가
     *
     * @param emitter
     */
    public void add(SseEmitter emitter) {
        this.emitters.add(emitter);
        log.info("new emitter added: {}", emitter);
        log.info("emitter list size: {}", emitters.size());
        // 완료 이벤트 발생 시 동작
        emitter.onCompletion(() -> {
            log.info("onCompletion callback");
            this.emitters.remove(emitter);
        });
        // 시간 만료 시 동작
        emitter.onTimeout(() -> {
            log.info("onTimeout callback");
            emitter.complete();
        });
    }

    /**
     * 입국심사 요청/삭제 가 있을 때 SSE 연결한 클라이언트에게 요청 목록 전송
     *
     * @param student
     */
    public void send(List<StudentSseDto> student) {
        emitters.forEach(emitter -> {
            try {
                log.info("[SSE send] : {}", emitter);
                emitter.send(SseEmitter.event()
                        .name("studentList")
                        .data(objectMapper.writeValueAsString(student)));
            } catch (IllegalStateException e) {
                log.info("[SSE send 실패 IllegalStateException] : {}", emitter);
                emitter.onCompletion(() -> {
                    log.info("IllegalStateException onCompletion callback");
                    this.emitters.remove(emitter);
                });
            } catch (IOException e) {
                log.info("[SSE send 실패 IOException] : {}", emitter);
                log.info("[SseEmitters.send] 전송 실패");
                emitter.onCompletion(() -> {
                    log.info("IOException onCompletion callback");
                    this.emitters.remove(emitter);
                });
            }
        });
    }
}
