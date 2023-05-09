package com.ico.api.service.certification;

import com.ico.api.s3.S3Uploader;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.entity.Certification;
import com.ico.core.repository.CertificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * @author 강교철
 */
@Service
@RequiredArgsConstructor
public class CertificationServiceImpl implements CertificationService{

    private final CertificationRepository certificationRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final S3Uploader s3Uploader;

    @Override
    public void deleteCertification(HttpServletRequest request) {

    }
}
