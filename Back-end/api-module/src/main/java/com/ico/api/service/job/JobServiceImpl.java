package com.ico.api.service.job;

import com.ico.api.dto.job.JobAddReqDto;
import com.ico.api.dto.job.JobAllColDto;
import com.ico.api.dto.job.JobAllResDto;
import com.ico.api.dto.job.JobAvailableResDto;
import com.ico.api.dto.job.JobResDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.api.util.Formatter;
import com.ico.core.dto.JobReqDto;
import com.ico.core.entity.Job;
import com.ico.core.entity.Nation;
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

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * 직업 관련 Service 로직 작성
 *
 * @author 서재건
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService{

    private final JobRepository jobRepository;

    private final NationRepository nationRepository;

    private final StudentRepository studentRepository;

    private final ResumeMongoRepository resumeMongoRepository;

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void updateJob(Long jobId, JobReqDto dto, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new CustomException(ErrorCode.JOB_NOT_FOUND));
        log.info("[updateJob] 해당 직업 존재");

        if (jobRepository.findByIdNotAndTitleAndNationId(jobId, dto.getTitle(), nationId).isPresent()) {
                log.info("[updateJob] 중복된 이름 존재");
                throw new CustomException(ErrorCode.ALREADY_EXIST_TITLE);
        }
        if (job.getCount() > dto.getTotal()) {
            log.info("[updateJob] 배정된 인원보다 수정하는 총 인원이 적은 경우");
            throw new CustomException(ErrorCode.INVALID_JOB_TOTAL);
        }

        job.updateJob(dto);
        jobRepository.save(job);
        log.info("[updateJob] 수정 완료");
    }

    @Transactional(readOnly = true)
    @Override
    public JobAllResDto findAllJob(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        if (nationRepository.findById(nationId).isEmpty()) {
            throw new CustomException(ErrorCode.NATION_NOT_FOUND);
        }

        List<Job> jobList = jobRepository.findAllByNationId(nationId);
        List<JobAllColDto> colJobList = new ArrayList<>();

        int restJobCount = 0;
        for (Job job : jobList) {
            // 아직 총 인원 수를 채우지 못한 직업 체크
            if (job.getTotal() > job.getCount()) {
                restJobCount++;
            }
            String salary = Formatter.number.format(job.getWage() * 30L);
            colJobList.add(new JobAllColDto().of(job, salary));
        }

        return JobAllResDto.builder()
                .restJobCount(restJobCount)
                .jobList(colJobList)
                .build();
    }

    @Transactional(readOnly = true)
    @Override
    public List<JobAvailableResDto> findAllShortFallJob(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        if (nationRepository.findById(nationId).isEmpty())
            throw new CustomException(ErrorCode.NATION_NOT_FOUND);

        List<Job> jobList = jobRepository.findAllByNationId(nationId);
        List<JobAvailableResDto> resJobList = new ArrayList<>();
        for (Job job : jobList) {
            if (job.getCount() == job.getTotal())   continue;

            // 정원이 채워지지 않은 직업을 목록에 추가
            resJobList.add(new JobAvailableResDto().of(job));
        }
        return resJobList;
    }

    @Transactional(readOnly = true)
    @Override
    public List<JobResDto> findJobList(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        if (nationRepository.findById(nationId).isEmpty()) {
            log.info("토큰의 nationId에 해당하는 나라가 존재하지 않는 경우");
            throw new CustomException(ErrorCode.NATION_NOT_FOUND);
        }

        List<Job> jobList = jobRepository.findAllByNationId(nationId);
        List<JobResDto> dtoList = new ArrayList<>();
        for (Job job : jobList) {
            dtoList.add(new JobResDto().of(job));
        }
        return dtoList;
    }

    @Override
    public void addJob(JobAddReqDto dto, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        Job job = Job.builder()
                .nation(nation)
                .title(dto.getTitle())
                .detail(dto.getDetail())
                .image(dto.getImage())
                .wage(dto.getWage())
                .creditRating(dto.getCreditRating().byteValue())
                .total(dto.getTotal().byteValue())
                .color(dto.getColor())
                .build();
        jobRepository.save(job);
    }

    @Override
    public void deleteJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new CustomException(ErrorCode.JOB_NOT_FOUND));

        if (job.getCount() > 0) {
            log.info("[deleteJob] 배정된 인원이 존재하여 삭제할 수 없습니다.");
            throw new CustomException(ErrorCode.ALREADY_ASSIGNED_JOB);
        }

        jobRepository.delete(job);
    }

    @Transactional
    @Override
    public void resetAllJob(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
        nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        //직업의 배정 인원 및 이름 초기화
        List<Job> jobList = jobRepository.findAllByNationId(nationId);
        for (Job job : jobList) {
            job.setCount((byte) 0);
            job.setStudentNames("");
            jobRepository.save(job);
        }

        // 학생에게 배정된 직업 삭제
        List<Student> studentList = studentRepository.findAllByNationId(nationId);
        for (Student student : studentList) {
            student.setJob(null);
            studentRepository.save(student);
        }

        // 직업신청내역에서도 전부 삭제
        resumeMongoRepository.deleteAllByNationId(nationId);
    }

    @Transactional
    @Override
    public void resetJob(Long studentId, HttpServletRequest request) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Job job = student.getJob();

        if (job == null) {
            log.info("[resetJob] 해당 학생은 직업이 없습니다.");
            throw new CustomException(ErrorCode.HAS_NOT_JOB);
        }

        // 만약 학생 직업의 배정된 인원이 0인 경우 예외를 던지는 대신 0으로 설정
        job.setCount((byte) (job.getCount() == 0 ? 0 : job.getCount() - 1));

        job.setStudentNames(job.getStudentNames().replace(student.getName() + ",", ""));
        jobRepository.save(job);

        student.setJob(null);
        studentRepository.save(student);

        // 학생의 직업 신청 내역 전부 삭제
        resumeMongoRepository.deleteAllByStudentId(studentId);
    }
}
