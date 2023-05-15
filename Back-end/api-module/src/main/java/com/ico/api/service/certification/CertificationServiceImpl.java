package com.ico.api.service.certification;

import com.ico.api.dto.certification.CertificationResDto;
import com.ico.api.service.S3UploadService;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.code.Role;
import com.ico.core.code.Status;
import com.ico.core.entity.Certification;
import com.ico.core.entity.Teacher;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.CertificationRepository;
import com.ico.core.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author 강교철
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CertificationServiceImpl implements CertificationService{

    private final CertificationRepository certificationRepository;
    private final TeacherRepository teacherRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final S3UploadService s3;

    @Override
    @Transactional
    public void approveCertification(HttpServletRequest request, Long id) {
        if (jwtTokenProvider.getRole(jwtTokenProvider.parseJwt(request)).equals(Role.ADMIN)) {
            // Certification 객체 가져오기
            Certification certification = certificationRepository.findById(id)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_IMAGE));

            // S3 서버에서 파일 삭제
            s3.deleteFile(certification.getImage());

            // 승인 상태 변경
            Teacher teacher = certification.getTeacher();
            teacher.setStatus(Status.APPROVED);
            teacherRepository.save(teacher);

            // Certification 삭제
            certificationRepository.delete(certification);
        }
        else {
            throw new CustomException(ErrorCode.WRONG_ROLE);
        }
    }

    @Override
    @Transactional
    public void deleteCertification(HttpServletRequest request, Long id) {
        if (jwtTokenProvider.getRole(jwtTokenProvider.parseJwt(request)).equals(Role.ADMIN)) {
            // Certification 객체 가져오기
            Certification certification = certificationRepository.findById(id)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_IMAGE));
            // S3 서버에서 파일 삭제
            s3.deleteFile(certification.getImage());

            // 승인 상태 변경
            Teacher teacher = certification.getTeacher();
            teacher.setStatus(Status.COMPANION);
            teacherRepository.save(teacher);

            // Certification 삭제
            certificationRepository.delete(certification);
        }
        else {
            throw new CustomException(ErrorCode.WRONG_ROLE);
        }
    }


    @Override
    @Transactional
    public Page<CertificationResDto> pageCertification(HttpServletRequest request, Pageable pageable) {
        String token = jwtTokenProvider.parseJwt(request);
        if (!jwtTokenProvider.getRole(token).equals(Role.ADMIN)) {
            throw new CustomException(ErrorCode.WRONG_ROLE);
        }

        Page<Certification> certificationPage = certificationRepository.findAll(pageable);

        List<CertificationResDto> certificationResDtoLists = certificationPage.getContent()
                .stream()
                .map(CertificationResDto::new)
                .collect(Collectors.toList());
        // image url 변경해서 보내주기
        for (CertificationResDto certificationResDtoList:certificationResDtoLists) {
            certificationResDtoList.setImage(s3.getFileURL(certificationResDtoList.getImage()));
        }
        return new PageImpl<>(certificationResDtoLists, pageable, certificationPage.getTotalElements());

    }
}
