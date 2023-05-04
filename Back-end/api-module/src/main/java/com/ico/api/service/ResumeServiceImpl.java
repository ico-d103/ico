package com.ico.api.service;

import com.ico.api.dto.ResumeResDto;
import com.ico.core.entity.Resume;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.JobRepository;
import com.ico.core.repository.ResumeMongoRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 *
 *
 * @author 서재건
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final ResumeMongoRepository resumeMongoRepository;

    private final JobRepository jobRepository;

    private final StudentRepository studentRepository;

    @Override
    public void applyJob(Long jobId) {
        // TODO: 로그인한 유저 정보 불러오기
        Long studentId = 1L;
        Long nationId = 1L;

        jobRepository.findById(jobId)
                .orElseThrow(() -> new CustomException(ErrorCode.JOB_NOT_FOUND));
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
}
