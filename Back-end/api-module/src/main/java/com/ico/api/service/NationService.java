package com.ico.api.service;

import com.ico.api.dto.NationReqDto;

import javax.servlet.http.HttpServletRequest;

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
     * 반 생성시 입장 코드 난수로 생성
     * @return code
     */
    public String randomCode();
}
