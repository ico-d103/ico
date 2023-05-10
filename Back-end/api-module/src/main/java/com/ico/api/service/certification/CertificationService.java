package com.ico.api.service.certification;

import com.ico.api.dto.certification.CertificationResDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.servlet.http.HttpServletRequest;

/**
 * @author 강교철
 */
public interface CertificationService {

    /**
     * 어드민이 교사인증서 승인
     * @param id
     */
    void approveCertification(HttpServletRequest request, Long id);

    /**
     * 어드민이 교사인증서 반려
     * @param id
     */
    void deleteCertification(HttpServletRequest request, Long id);

    /**
     * 어드민이 교사인증서 모두 조회
     * @param request
     * @param pageable
     * @return
     */
    Page<CertificationResDto> pageCertification(HttpServletRequest request, Pageable pageable);
}
