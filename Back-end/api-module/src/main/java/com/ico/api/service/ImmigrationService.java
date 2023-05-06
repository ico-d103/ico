package com.ico.api.service;

import com.ico.api.dto.immigration.ImmigrationReqDto;
import com.ico.core.entity.Immigration;

import javax.servlet.http.HttpServletRequest;

/**
 * @author 강교철
 */
public interface ImmigrationService {

    /**
     * 입국 요청
     * @param reqDto
     * @param request
     */
    public void createImmigration(ImmigrationReqDto reqDto, HttpServletRequest request);

    /**
     * 입국 요청 조회
     * @param request
     * @return Immigration
     */
    public Immigration getImmigration(HttpServletRequest request);

    /**
     * 입국 요청 삭제
     * @param request
     */
    public void deleteImmigration(HttpServletRequest request);
}
