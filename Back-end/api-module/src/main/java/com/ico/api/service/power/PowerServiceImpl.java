package com.ico.api.service.power;

import com.ico.core.code.PowerEnum;
import com.ico.core.entity.Power;
import com.ico.core.repository.PowerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 직업 권한 관련
 *
 * @author 강교철
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class PowerServiceImpl implements PowerService{

    private final PowerRepository powerRepository;

    @Override
    public void createPower() {
        for (PowerEnum data:PowerEnum.values()) {
            Power power = Power.builder()
                    .name(PowerEnum.valueOf(String.valueOf(data)))
                    .build();
            powerRepository.save(power);
        }
    }

    @Override
    public List<Power> getPower(HttpServletRequest request) {
        return powerRepository.findAll();
    }
}
