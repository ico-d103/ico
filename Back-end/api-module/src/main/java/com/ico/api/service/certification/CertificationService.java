package com.ico.api.service.certification;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * @author 강교철
 */
public interface CertificationService {

    void deleteCertification(HttpServletRequest request);
}
