package com.ico.api.service;

import com.ico.api.dto.NationReqDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.code.Role;
import com.ico.core.entity.Nation;
import com.ico.core.repository.NationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
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
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void createNation(NationReqDto reqDto, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Object role = jwtTokenProvider.getRole(token);

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
//                    .trading_start(reqDto.getTrading_start())
//                    .trading_end(reqDto.getTrading_end())
                    .build();

            nationRepository.save(nation);
        }
    }

    @Override
    public String randomCode() {

        // 5자리의 난수 코드 생성
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 6; i++) {
            int digit = random.nextInt(characters.length());
            codeBuilder.append(digit);
        }
        String code = codeBuilder.toString();

        // 생성한 코드가 이미 Nation 테이블에 있는지 확인 
        Nation nationCode = nationRepository.findByCode(code);
        if (nationCode != null) {
            // 코드 다시 생성
            return randomCode();
        }
        // 코드 반환
        return code;
    }


}
