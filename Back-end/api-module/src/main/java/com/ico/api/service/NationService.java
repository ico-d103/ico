package com.ico.api.service;

import com.ico.api.dto.NationReqDto;
import com.ico.core.entity.Nation;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface NationService {

    /**
     * request로 JwtTokenProvider의 parseJwt에서 token을 가져오고
     * role이 TEACHER일 때 Nation을 생성하고 교사 테이블의 Nation에
     * ID 을 넘겨 줄 것
     * @param reqDto
     * @param request
     */
    public void createNation(NationReqDto reqDto, HttpServletRequest request);


    /**
     * 교사의 나라 조회
     * @param request
     * @return Nation
     */
    public Nation getNation(HttpServletRequest request);
}
