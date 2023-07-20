package com.ico.api.service.power;

import com.ico.core.entity.Power;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 직업 권한 관련
 *
 * @author 강교철
 */
public interface PowerService {

    /**
     * 권한 테이블 처음으로 생성
     */
    void createPower();

    /**
     * 권한 테이블 전체 조회
     * @param request
     * @return List<Power>
     */
    List<Power> getPower(HttpServletRequest request);
}
