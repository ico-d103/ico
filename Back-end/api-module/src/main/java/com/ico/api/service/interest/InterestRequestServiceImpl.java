package com.ico.api.service.interest;

import com.ico.api.service.bank.InterestService;
import com.ico.core.entity.Interest;
import com.ico.core.entity.InterestRequest;
import com.ico.core.entity.Nation;
import com.ico.core.repository.InterestRepository;
import com.ico.core.repository.InterestRequestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class InterestRequestServiceImpl implements InterestRequestService{

    private final InterestRequestRepository interestRequestRepository;
    private final InterestRepository interestRepository;

    @Override
    public void createInterest(Nation nation) {
        List<InterestRequest> interests = interestRequestRepository.findAll();

        for (InterestRequest interest : interests) {
            Interest result = Interest.builder()
                    .nation(nation)
//                    .creditRating(interest.getCreditRating())   // Integer 형식으로밖에 못 가져옴..
//                    .shortPeriod(interest.getShortPeriod())
//                    .longPeriod(interest.getLongPeriod())
                    .build();
        interestRepository.save(result);
        log.info("이자율 생성");
        }
    }
}
