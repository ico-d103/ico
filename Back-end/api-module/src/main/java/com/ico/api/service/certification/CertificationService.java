package com.ico.api.service.certification;

/**
 * @author 강교철
 */
public interface CertificationService {

    /**
     * 어드민이 교사인증서 승인
     * @param id
     */
    void approveCertification(Long id);

    /**
     * 어드민이 교사인증서 반려
     * @param id
     */
    void deleteCertification(Long id);
}
