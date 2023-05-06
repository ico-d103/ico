package com.ico.api.service.immigration;

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
    void createImmigration(ImmigrationReqDto reqDto, HttpServletRequest request);

    /**
     * 입국 요청 조회
     * @param request
     * @return Immigration
     */
    Immigration getImmigration(HttpServletRequest request);

    /**
     * 입국 요청 삭제
     * @param request
     */
    void deleteImmigration(HttpServletRequest request);

    /**
     * 입국 요청 승인
     * @param immigrationId
     * @param request
     */
    void approveImmigration(Long immigrationId, HttpServletRequest request);

    /**
     * 입국 요청 반려
     * @param immigrationId
     * @param request
     */
    void companionImmigration(Long immigrationId, HttpServletRequest request);
}
