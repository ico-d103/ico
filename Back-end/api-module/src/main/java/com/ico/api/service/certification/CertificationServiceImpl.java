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
            // TODO : 수정 중
//            s3.deleteFile(certification.getImage());

            Teacher teacher = certification.getTeacher();
            teacher.setAssigned(true);
            teacherRepository.save(teacher);

            // Certification 삭제
            certificationRepository.delete(certification);
        }
    }

    public void deleteCertification(Long id) {
        // Certification 객체 가져오기
        Optional<Certification> optionalCertification = certificationRepository.findById(id);
        if (optionalCertification.isPresent()) {
            Certification certification = optionalCertification.get();
            // S3 서버에서 파일 삭제
            // TODO : 수정 중
//            s3.deleteFile(certification.getImage());
            // Certification 삭제
            certificationRepository.deleteById(id);
        }
    }
}
