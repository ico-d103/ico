package com.ico.api.service;

import com.ico.api.dto.ResumeResDto;
import com.ico.core.entity.Job;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Resume;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.JobRepository;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.ResumeMongoRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    private final JobRepository jobRepository;

    private final StudentRepository studentRepository;

    @Override
    public void applyJob(Long jobId) {
        // TODO: 로그인한 유저 정보 불러오기
        Long studentId = 1L;
        Long nationId = 1L;

        Job job = jobRepository.findByIdAndNationId(jobId, nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.JOB_NOT_FOUND));
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        if (job.getCreditRating() < student.getCreditRating()) {
            throw new CustomException(ErrorCode.INVALID_CREDIT_RATING);
        }
        log.info("자격요건 통과");

        Resume resume = Resume.builder()
                .studentId(studentId)
                .jobId(jobId)
                .nationId(nationId)
                .build();
        resumeMongoRepository.insert(resume);
    }

    @Override
    public List<ResumeResDto> findResume(Long jobId) {
        // TODO: 로그인한 유저 정보 불러오기
        Long nationId = 1L;

        jobRepository.findById(jobId)
                .orElseThrow(() -> new CustomException(ErrorCode.JOB_NOT_FOUND));
        List<Resume> resumeList = resumeMongoRepository.findAllByJobIdAndNationId(jobId, nationId);
        List<ResumeResDto> dtoList = new ArrayList<>();
        //학생 이름, 학생 반 번호
        for (Resume resume : resumeList) {
            Student student = studentRepository.findById(resume.getStudentId())
                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
            dtoList.add(new ResumeResDto().of(student));
        }
        return dtoList;
    }

    @Transactional
    @Override
    public void assignResume(String resumeId) {
        // TODO: 로그인한 유저 정보 불러오기
        Long nationId = 2L;

        Resume resume = resumeMongoRepository.findById(resumeId)
                .orElseThrow(() -> {
                    log.info("[assignResume] 직업 신청 내역이 존재 하지 않는 경우");
                    throw new CustomException(ErrorCode.RESUME_NOT_FOUND);
                });
        log.info("[assignResume] 직업 신청 내역 존재");

        Student student = studentRepository.findById(resume.getStudentId())
                .orElseThrow(() -> {
                    log.info("[assignResume] 신청한 학생이 존재하지 않는 경우");
                    resumeMongoRepository.delete(resume);
                    log.info("[assignResume] 직업 신청 내역에서 삭제");
                    throw new CustomException(ErrorCode.USER_NOT_FOUND);
                });

        Job job = jobRepository.findById(resume.getJobId())
                .orElseThrow(() -> {
                    log.info("[assignResume] 신청한 직업이 존재하지 않는 경우");
                    resumeMongoRepository.delete(resume);
                    log.info("[assignResume] 직업 신청 내역에서 삭제");
                    throw new CustomException(ErrorCode.JOB_NOT_FOUND);
                });

        Nation nation = nationRepository.findById(resume.getNationId()).orElseThrow(() -> {
            log.info("[assignResume] 신청한 나라가 없는 경우");
            resumeMongoRepository.delete(resume);
            log.info("[assignResume] 직업 신청 내역에서 삭제");
            throw new CustomException(ErrorCode.NATION_NOT_FOUND);
        });

        if (!nation.getId().equals(nationId)) {
            log.info("[assignResume] 신청 내역의 나라와 교사의 나라가 다른 경우");
            resumeMongoRepository.delete(resume);
            log.info("[assignResume] 직업 신청 내역에서 삭제");
            throw new CustomException(ErrorCode.NOT_AUTHORIZATION_NATION);
        }

        if (student.getJob() != null) {
            log.info("[assignResume] 이미 해당 학생의 직업이 존재하는 경우");
            resumeMongoRepository.delete(resume);
            log.info("[assignResume] 직업 신청 내역에서 삭제");
            throw new CustomException(ErrorCode.ALREADY_HAS_JOB);
        }

        if (job.getCount() == job.getTotal()) {
            log.info("[assignResume] 직업 정원이 다 찬 경우");
            resumeMongoRepository.delete(resume);
            log.info("[assignResume] 직업 신청 내역에서 삭제");
            throw new CustomException(ErrorCode.ALREADY_FULL_JOB);
        }

        job.setCount((byte) (job.getCount() + 1));
        jobRepository.save(job);
        log.info("[assignResume] 직업 배정 인원 추가");

        student.setJob(job);
        studentRepository.save(student);
        log.info("[assignResume] 학생 직업 배정");

        resumeMongoRepository.deleteAllByStudentId(student.getId());
        log.info("[assignResume] 해당 학생의 직업 승인 완료로 신청 내역 전부 삭제");
    }
}
