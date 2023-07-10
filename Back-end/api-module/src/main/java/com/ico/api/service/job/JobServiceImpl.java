package com.ico.api.service.job;

import com.ico.api.dto.job.JobAddReqDto;
import com.ico.api.dto.job.JobAllColDto;
import com.ico.api.dto.job.JobAllResDto;
import com.ico.api.dto.job.JobAvailableResDto;
import com.ico.api.dto.job.JobResDto;
import com.ico.api.dto.job.JobResetReqDto;
import com.ico.api.service.S3UploadService;
import com.ico.api.user.JwtTokenProvider;
import com.ico.api.util.Formatter;
import com.ico.core.dto.JobReqDto;
import com.ico.core.entity.StudentJob;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.StudentJobRepository;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.ResumeMongoRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
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

    private final StudentJobRepository studentJobRepository;

    private final NationRepository nationRepository;

    private final StudentRepository studentRepository;

    private final ResumeMongoRepository resumeMongoRepository;

    private final S3UploadService s3UploadService;

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void updateJob(Long jobId, JobReqDto dto, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        StudentJob studentJob = studentJobRepository.findById(jobId)
                .orElseThrow(() -> new CustomException(ErrorCode.JOB_NOT_FOUND));
        log.info("[updateJob] 해당 직업 존재");

        if (studentJobRepository.findByIdNotAndTitleAndNationId(jobId, dto.getTitle(), nationId).isPresent()) {
                log.info("[updateJob] 중복된 이름 존재");
                throw new CustomException(ErrorCode.ALREADY_EXIST_TITLE);
        }
        if (studentJob.getCount() > dto.getTotal()) {
            log.info("[updateJob] 배정된 인원보다 수정하는 총 인원이 적은 경우");
            throw new CustomException(ErrorCode.INVALID_JOB_TOTAL);
        }

        studentJob.updateJob(dto, s3UploadService.getFileName(dto.getImage()));
        studentJobRepository.save(studentJob);
        log.info("[updateJob] 수정 완료");
    }

    @Transactional(readOnly = true)
    @Override
    public JobAllResDto findAllJob(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        if (nationRepository.findById(nationId).isEmpty()) {
            throw new CustomException(ErrorCode.NATION_NOT_FOUND);
        }

        List<StudentJob> studentJobList = studentJobRepository.findAllByNationIdAndTotalGreaterThan(nationId, (byte) 0, Sort.by(Sort.Order.asc("count"), Sort.Order.desc("total")));
        List<JobAllColDto> colJobList = new ArrayList<>();

        int restJobCount = 0;
        for (StudentJob studentJob : studentJobList) {
            // 아직 총 인원 수를 채우지 못한 직업 체크
            if (studentJob.getTotal() > studentJob.getCount()) {
                restJobCount++;
            }
            String salary = Formatter.number.format(studentJob.getWage() * 30L);
            colJobList.add(new JobAllColDto().of(studentJob, salary, s3UploadService.getFileURL(studentJob.getImage())));
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

        List<StudentJob> studentJobList = studentJobRepository.findAllByNationId(nationId);
        List<JobAvailableResDto> resJobList = new ArrayList<>();
        for (StudentJob studentJob : studentJobList) {
            if (studentJob.getCount() == studentJob.getTotal())   continue;

            // 정원이 채워지지 않은 직업을 목록에 추가
            resJobList.add(new JobAvailableResDto().of(studentJob, s3UploadService.getFileURL(studentJob.getImage())));
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

        List<StudentJob> studentJobList = studentJobRepository.findAllByNationIdOrderByTotalDesc(nationId);
        List<JobResDto> dtoList = new ArrayList<>();
        for (StudentJob studentJob : studentJobList) {
            dtoList.add(new JobResDto().of(studentJob, s3UploadService.getFileURL(studentJob.getImage())));
        }
        return dtoList;
    }

    @Override
    public void addJob(JobAddReqDto dto, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));
        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        StudentJob studentJob = StudentJob.builder()
                .nation(nation)
                .title(dto.getTitle())
                .detail(dto.getDetail())
                .image(s3UploadService.getFileName(dto.getImage()))
                .wage(dto.getWage())
                .creditRating(dto.getCreditRating().byteValue())
                .total(dto.getTotal().byteValue())
                .color(dto.getColor())
                .build();
        studentJobRepository.save(studentJob);
    }

    @Override
    public void deleteJob(Long jobId) {
        StudentJob studentJob = studentJobRepository.findById(jobId)
                .orElseThrow(() -> new CustomException(ErrorCode.JOB_NOT_FOUND));

        if (studentJob.getCount() > 0) {
            log.info("[deleteJob] 배정된 인원이 존재하여 삭제할 수 없습니다.");
            throw new CustomException(ErrorCode.ALREADY_ASSIGNED_JOB);
        }

        studentJobRepository.delete(studentJob);
    }

    @Transactional
    @Override
    public void resetAllJob(JobResetReqDto dto) {
        List<Long> studentIds = dto.getStudentIds();
        //직업의 배정 인원 및 이름 초기화
        List<StudentJob> studentJobList = studentJobRepository.findAllByIdIn(studentIds);
        for (StudentJob studentJob : studentJobList) {
            studentJob.setCount((byte) 0);
            studentJob.setStudentNames("");
            studentJobRepository.save(studentJob);
        }

        // 학생에게 배정된 직업 삭제
        List<Student> studentList = studentRepository.findAllByIdIn(studentIds);
        for (Student student : studentList) {
            student.setStudentJob(null);
            studentRepository.save(student);
        }

        // 직업신청내역에서도 전부 삭제
        resumeMongoRepository.deleteAllByStudentIdIn(studentIds);
    }

    @Transactional
    @Override
    public void resetJob(Long studentId, HttpServletRequest request) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        StudentJob studentJob = student.getStudentJob();

        if (studentJob == null) {
            log.info("[resetJob] 해당 학생은 직업이 없습니다.");
            throw new CustomException(ErrorCode.HAS_NOT_JOB);
        }

        // 만약 학생 직업의 배정된 인원이 0인 경우 예외를 던지는 대신 0으로 설정
        studentJob.setCount((byte) (studentJob.getCount() == 0 ? 0 : studentJob.getCount() - 1));

        studentJob.setStudentNames(studentJob.getStudentNames().replace(student.getName() + ",", ""));
        studentJobRepository.save(studentJob);

        student.setStudentJob(null);
        studentRepository.save(student);

        // 학생의 직업 신청 내역 전부 삭제
        resumeMongoRepository.deleteAllByStudentId(studentId);
    }
}
