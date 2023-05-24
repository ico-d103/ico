package com.ico.api.service.resume;

import com.ico.api.dto.resume.ResumeResDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.entity.StudentJob;
import com.ico.core.entity.Nation;
import com.ico.core.document.Resume;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.StudentJobRepository;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.ResumeMongoRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * 직업 신청 내역 관련 Service 구현 로직
 *
 * @author 서재건
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {
    private final NationRepository nationRepository;

    private final ResumeMongoRepository resumeMongoRepository;

    private final StudentJobRepository studentJobRepository;

    private final StudentRepository studentRepository;

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void applyJob(Long jobId, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);

        StudentJob studentJob = studentJobRepository.findByIdAndNationId(jobId, nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.JOB_NOT_FOUND));
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        if (studentJob.getCreditRating() < student.getCreditRating()) {
            throw new CustomException(ErrorCode.INVALID_CREDIT_RATING);
        }
        if (student.getStudentJob() != null) {
            throw new CustomException(ErrorCode.ALREADY_HAS_JOB);
        }
        log.info("자격요건 통과");

        Resume resume = Resume.builder()
                .studentId(studentId)
                .jobId(jobId)
                .nationId(nationId)
                .build();
        resumeMongoRepository.insert(resume);
    }

    @Transactional(readOnly = true)
    @Override
    public List<ResumeResDto> findResume(Long jobId, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        studentJobRepository.findById(jobId)
                .orElseThrow(() -> new CustomException(ErrorCode.JOB_NOT_FOUND));
        List<Resume> resumeList = resumeMongoRepository.findAllByJobIdAndNationId(jobId, nationId);
        List<ResumeResDto> dtoList = new ArrayList<>();
        //학생 이름, 학생 반 번호
        for (Resume resume : resumeList) {
            Student student = studentRepository.findById(resume.getStudentId())
                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
            dtoList.add(new ResumeResDto().of(resume.getId(), student));
        }
        return dtoList;
    }

    @Transactional
    @Override
    public void assignResume(String resumeId, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        Resume resume = findAndValidateResume(resumeId, nationId);
        Student student = findAndValidateStudent(resume);
        StudentJob studentJob = findAndValidateJob(resume);

        if (student.getStudentJob() != null) {
            log.info("[assignResume] 이미 해당 학생의 직업이 존재하는 경우");
            deleteResume(resume);
            throw new CustomException(ErrorCode.ALREADY_HAS_JOB);
        }

        if (studentJob.getCount() == studentJob.getTotal()) {
            log.info("[assignResume] 직업 정원이 다 찬 경우");
            deleteResume(resume);
            throw new CustomException(ErrorCode.ALREADY_FULL_JOB);
        }

        assignJobToStudent(studentJob, student);
        deleteAllResumesByStudentId(student.getId());
    }

    @Transactional
    @Override
    public void rejectResume(String resumeId, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        Resume resume = findAndValidateResume(resumeId, nationId);
        findAndValidateStudent(resume);
        findAndValidateJob(resume);

        deleteResume(resume);
        log.info("[rejectResume] 직업 승인 신청 거절로 내역 삭제");
    }

    @Override
    public boolean checkRequestJob(Long jobId, HttpServletRequest request) {
        Long studentId = jwtTokenProvider.getId(jwtTokenProvider.parseJwt(request));
        return resumeMongoRepository.findByStudentIdAndJobId(studentId, jobId).isPresent();
    }

    /**
     * 유효한 이력서 조회
     *
     * @param resumeId
     * @param nationId
     * @return resume
     */
    private Resume findAndValidateResume(String resumeId, Long nationId) {
        Resume resume = resumeMongoRepository.findById(resumeId)
                .orElseThrow(() -> {
                    log.info("[assignResume] 직업 신청 내역이 존재 하지 않는 경우");
                    throw new CustomException(ErrorCode.REQUEST_NOT_FOUND);
                });
        log.info("[assignResume] 직업 신청 내역 존재");

        Nation nation = nationRepository.findById(resume.getNationId()).orElseThrow(() -> {
            log.info("[assignResume] 신청한 나라가 없는 경우");
            deleteResume(resume);
            throw new CustomException(ErrorCode.NATION_NOT_FOUND);
        });

        if (!nation.getId().equals(nationId)) {
            log.info("[assignResume] 신청 내역의 나라와 교사의 나라가 다른 경우");
            throw new CustomException(ErrorCode.NOT_AUTHORIZATION_NATION);
        }

        return resume;
    }

    /**
     * 유효한 학생 조회
     *
     * @param resume
     * @return student
     */
    private Student findAndValidateStudent(Resume resume) {
        return studentRepository.findById(resume.getStudentId())
                .orElseThrow(() -> {
                    log.info("[assignResume] 신청한 학생이 존재하지 않는 경우");
                    deleteResume(resume);
                    throw new CustomException(ErrorCode.USER_NOT_FOUND);
                });
    }

    /**
     * 유효한 직업 조회
     *
     * @param resume
     * @return job
     */
    private StudentJob findAndValidateJob(Resume resume) {
        return studentJobRepository.findById(resume.getJobId())
                .orElseThrow(() -> {
                    log.info("[assignResume] 신청한 직업이 존재하지 않는 경우");
                    deleteResume(resume);
                    throw new CustomException(ErrorCode.JOB_NOT_FOUND);
                });
    }

    /**
     * 직업 신청 내역 삭제
     *
     * @param resume
     */
    private void deleteResume(Resume resume) {
        resumeMongoRepository.delete(resume);
        log.info("[assignResume] 직업 신청 내역에서 삭제");
    }

    /**
     * 승인 완료 후 학생의 모든 신청 내역 삭제
     *
     * @param studentId
     */
    private void deleteAllResumesByStudentId(Long studentId) {
        resumeMongoRepository.deleteAllByStudentId(studentId);
        log.info("[assignResume] 해당 학생의 직업 승인 완료로 신청 내역 전부 삭제");
    }

    /**
     * 학생에게 직업 배정
     *
     * @param studentJob
     * @param student
     */
    private void assignJobToStudent(StudentJob studentJob, Student student) {
        studentJob.setCount((byte) (studentJob.getCount() + 1));
        studentJob.setStudentNames(studentJob.getStudentNames() + student.getName() + ",");
        studentJobRepository.save(studentJob);
        log.info("[assignResume] 직업 배정 인원 추가");
        student.setStudentJob(studentJob);
        studentRepository.save(student);
        log.info("[assignResume] 학생 직업 배정");
    }
}
