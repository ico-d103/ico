package com.ico.api.service;

import com.ico.api.dto.NationReqDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.code.Role;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Teacher;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;
import java.util.Random;

/**
 * 나라 관련 Service
 *
 * @author 강교철
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class NationServiceImpl implements NationService {

    private final NationRepository nationRepository;
    private final TeacherRepository teacherRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    @Transactional
    public void createNation(NationReqDto reqDto, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Object role = jwtTokenProvider.getRole(token);

        // 교사만 반 생성
        if (role.equals("TEACHER")) {
            Nation nation = Nation.builder()
                    .school(reqDto.getSchool())
                    .grade((byte) reqDto.getGrade())
                    .room((byte) reqDto.getRoom())
                    .title(reqDto.getTitle())
                    .code(randomCode())
                    .currency(reqDto.getCurrency())
                    .treasury(0)
                    .credit_up((byte) 20)
                    .credit_down((byte) 50)
                    .trading_start(reqDto.getTrading_start())
                    .trading_end(reqDto.getTrading_end())
                    .build();

            nationRepository.save(nation);

            // 반을 생성했을 때 교사 테이블의 Nation 업데이트
            String identity = (String) jwtTokenProvider.getIdentity(token);
            Optional<Teacher> teacher = teacherRepository.findByIdentity(identity);
            teacher.ifPresent(t -> {
                t.setNation(nation);
                teacherRepository.save(t);
            });
        }
    }

    /**
     * 반 생성시 입장 코드 난수로 생성
     * @return code
     */
    private String randomCode() {

        // 5자리의 난수 코드 생성
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 5; i++) {
            int digit = random.nextInt(characters.length());
            codeBuilder.append(characters.charAt(digit));
        }
        String code = codeBuilder.toString();

        // 생성한 코드가 이미 Nation 테이블에 있는지 확인 
        Optional<Nation> nationCode = nationRepository.findByCode(code);
        if (nationCode.isPresent()) {
            // 코드 다시 생성
            return randomCode();
        }
        // 코드 반환
        return code;
    }

    @Override
    public Nation getNation(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        // TODO : Token 업데이트하면 아래 코드 사용
        // Long nationId = (Long) jwtTokenProvider.getNation(token);
        // Long nationId = ((Number) jwtTokenProvider.getNation(token)).longValue();

        Long id = ((Number) jwtTokenProvider.getId(token)).longValue();
        try {
            Long nationId = teacherRepository.findById(id).get().getNation().getId();
            Nation nation = nationRepository.findById(nationId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_NATION));
            return nation;
        } catch (CustomException e) {
            throw new CustomException(ErrorCode.NOT_FOUND_NATION);
        }

    }


}
