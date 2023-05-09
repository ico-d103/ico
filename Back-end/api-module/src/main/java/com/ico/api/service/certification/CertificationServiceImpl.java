package com.ico.api.service.certification;

import com.ico.api.s3.S3Uploader;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.entity.Certification;
import com.ico.core.entity.Teacher;
import com.ico.core.repository.CertificationRepository;
import com.ico.core.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Optional;

/**
 * @author 강교철
 */
@Service
@RequiredArgsConstructor
public class CertificationServiceImpl implements CertificationService{

    private final CertificationRepository certificationRepository;
    private final TeacherRepository teacherRepository;
    private final S3Uploader s3Uploader;

    public void approveCertification(Long id) {
        // Certification 객체 가져오기
        Optional<Certification> optionalCertification = certificationRepository.findById(id);
        if (optionalCertification.isPresent()) {
            Certification certification = optionalCertification.get();
            // S3 서버에서 파일 삭제
            s3Uploader.delete(certification.getImage());

            Long teacherId = certification.getTeacher().getId();
            Optional<Teacher> teacher = teacherRepository.findById(teacherId);
            teacher.get().setAssigned(true);

            // Certification 삭제
            certificationRepository.deleteById(id);
        }
    }

    public void deleteCertification(Long id) {
        // Certification 객체 가져오기
        Optional<Certification> optionalCertification = certificationRepository.findById(id);
        if (optionalCertification.isPresent()) {
            Certification certification = optionalCertification.get();
            // S3 서버에서 파일 삭제
            s3Uploader.delete(certification.getImage());
            // Certification 삭제
            certificationRepository.deleteById(id);
        }
    }
}
