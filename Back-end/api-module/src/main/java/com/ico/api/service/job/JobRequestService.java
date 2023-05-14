package com.ico.api.service.job;

import com.ico.core.entity.Nation;

/**
 * @author 강교철
 */
public interface JobRequestService {

    /**
     * 나라마다 몽고디비의 default job을 가지고 와서 mysql에 저장
     * @param nation
     * @return true or false
     */
    void saveJob(Nation nation);
}
