package com.ico.api.service.power;

import com.ico.core.code.PowerEnum;
import com.ico.core.entity.Power;
import com.ico.core.repository.PowerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PowerServiceImpl implements PowerService{

    private final PowerRepository powerRepository;

    @Override
    public void create() {
        for (PowerEnum data:PowerEnum.values()) {
//            log.info(data.toString());
            Power power = Power.builder()
                    .name(PowerEnum.valueOf(String.valueOf(data)))
                    .build();
            powerRepository.save(power);
        }
    }
}
