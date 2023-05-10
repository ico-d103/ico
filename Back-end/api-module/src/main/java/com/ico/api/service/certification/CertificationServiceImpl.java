package com.ico.api.service.certification;

import com.ico.api.service.S3UploadService;
import com.ico.core.entity.Certification;
import com.ico.core.entity.Teacher;
import com.ico.core.repository.CertificationRepository;
import com.ico.core.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author 강교철
 */
@Service
@RequiredArgsConstructor
public class CertificationServiceImpl implements CertificationService{

    private final CertificationRepository certificationRepository;
    private final TeacherRepository teacherRepository;
    private final S3UploadService s3;

    public void approveCertification(Long id) {
        // Certification 객체 가져오기
        Optional<Certification> optionalCertification = certificationRepository.findById(id);
        if (optionalCertification.isPresent()) {
            Certification certification = optionalCertification.get();
            // S3 서버에서 파일 삭제
            s3.deleteFile(certification.getImage());

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
            s3.deleteFile(certification.getImage());
            // Certification 삭제
            certificationRepository.deleteById(id);
        }
    }
}
