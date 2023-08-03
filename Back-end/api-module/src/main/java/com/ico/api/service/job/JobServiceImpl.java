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
import com.ico.core.entity.JobLicense;
import com.ico.core.entity.NationLicense;
import com.ico.core.entity.Power;
import com.ico.core.entity.StudentJob;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.JobLicenseRepository;
import com.ico.core.repository.NationLicenseRepository;
import com.ico.core.repository.PowerRepository;
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
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

/**
 * 직업 관련 Service 로직 작성
 *
 * @author 서재건
 * @author 강교철
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

    private final PowerRepository powerRepository;
    private final JobLicenseRepository jobLicenseRepository;
    private final NationLicenseRepository nationLicenseRepository;

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
        updatePower(nationId, studentJob, dto.getPowers(), jobId);
        updateLicense(nationId, dto);
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

    @Transactional
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
                .wage(dto.getSalary())
                .creditRating(dto.getCreditRating().byteValue())
                .total(dto.getTotal().byteValue())
                .color(dto.getColor())
                .build();
        addJobPower(studentJob, dto.getPowers());
        studentJobRepository.save(studentJob);
        log.info("[addJob] 직업 생산 완료.");
        addJobLicense(studentJob, nationId, dto);
        log.info("[addJobLicense] 직업 자격증과 자격증 등급 설정 완료.");
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
    public void resetAllJob(JobResetReqDto dto, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        List<Long> studentIds = dto.getStudentIds();

        //직업의 배정 인원 및 이름 초기화
        List<StudentJob> studentJobList = studentJobRepository.findAllByIdIn(studentIds);
        for (StudentJob studentJob : studentJobList) {

            Nation nation = studentJob.getNation();
            // 데이터베이스에서 정상적으로 나라 등록이 안된 경우
            if (nation == null) {
                log.info("[resetAllJob] id값[{}] 직업의 나라가 등록되어 있지 않습니다.", studentJob.getId());
                throw new CustomException(ErrorCode.ERROR_NATION_JOB);
            }

            // 교사가 잘못된 학생의 id값을 보낸 경우
            if (!nationId.equals(nation.getId())) {
                throw new CustomException(ErrorCode.NOT_AUTHORIZATION_NATION);
            }

            studentJob.setCount((byte) 0);
            studentJob.setStudentNames("");
            studentJobRepository.save(studentJob);
        }

        // 학생에게 배정된 직업 삭제
        List<Student> studentList = studentRepository.findAllByIdIn(studentIds);
        for (Student student : studentList) {
            student.setStudentJob(null);
            // 학생의 권한 삭제
            student.setEmpowered("");
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
        // 학생의 권한 삭제
        student.setEmpowered("");
        studentRepository.save(student);

        // 학생의 직업 신청 내역 전부 삭제
        resumeMongoRepository.deleteAllByStudentId(studentId);
    }

    /**
     * 직업과 직업을 가진 학생의 empowered 를 수정
     *
     */
    private void updatePower(Long nationId, StudentJob job, List<Long> powerIds, Long jobId) {
        // powerIds Set
        Set<Long> setPowerIds = new TreeSet<>(powerIds);
        List<Power> powers = powerRepository.findAllByIdIn(new ArrayList<>(setPowerIds));
        if (powers.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_POWER);
        }

        // empowered 초기화
        StringBuilder jobEmpowered = new StringBuilder();
        for (Power power:powers) {
                // job empowered 컬럼 채우기
                jobEmpowered.append(power.getId()).append(",");
        }
        job.setEmpowered(jobEmpowered.toString());

        // 권한 업데이트 전에 권한을 가진 직업을 가진 학생이 있는지 확인 - 없으면 pass
        List<Student> students = studentRepository.findAllByNationIdAndStudentJobId(nationId, jobId);
        for (Student student : students) {
            log.info("[updatePower] 학생들의 권한 정보 : {}", student.getEmpowered());
            student.setEmpowered(jobEmpowered.toString());

            // 학생 테이블의 empowered 수정
            studentRepository.save(student);
        }
    }

    /**
     * 직업 수정 시 직업 자격증과 등급 수정
     * @param nationId
     * @param dto
     */
    private void updateLicense(Long nationId, JobReqDto dto) {
        List<Long> jobLicenseIds = dto.getJobLicenseIds();

        // 프론트에서 객체 형태로 보내고 싶다고 해서 변경
        List<Long> licenseIds = new ArrayList<>();
        List<Integer> ratings = new ArrayList<>();
        Map<Long, Integer> licenses = dto.getLicenses();

        for (Map.Entry<Long, Integer> license : licenses.entrySet()) {
            licenseIds.add(license.getKey());
            ratings.add(license.getValue());
        }

        for (int i = 0; i < jobLicenseIds.size(); i++) {
            Long jobLicenseId = jobLicenseIds.get(i);
            Long licenseId = licenseIds.get(i);
            Integer rating = ratings.get(i);

            if (licenseId == null) {
                throw new CustomException(ErrorCode.NOT_ENTER_LICENSE_ID);
            }
            if (rating == null) {
                throw new CustomException(ErrorCode.NOT_ENTER_RATING);
            }
            // rating 유효성 검사
            if (rating > 7 || rating < 0) {
                throw new CustomException(ErrorCode.WRONG_RATING);
            }

            JobLicense jobLicense = jobLicenseRepository.findById(jobLicenseId)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_JOB_LICENSE));

            NationLicense nationLicense = nationLicenseRepository.findByNationIdAndId(nationId, licenseId)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_LICENSE));

            jobLicense.setLicense(nationLicense);
            jobLicense.setRating(rating.byteValue());

            jobLicenseRepository.save(jobLicense);
            log.info("[updateLicense] JobLicense 수정 완료");
        }
    }

    /**
     * 직업 생성 시 자격증 등급 설정
     * @param job
     * @param nationId
     * @param dto
     */
    private void addJobLicense(StudentJob job, Long nationId, JobAddReqDto dto) {
        // 프론트에서 객체 형태로 보내고 싶다고 해서 변경
        Map<Long, Integer> licenses = dto.getLicenses();

        for (Map.Entry<Long, Integer> license : licenses.entrySet()) {
            Long licenseId = license.getKey();
            Integer rating = license.getValue();

            if (licenseId == null) {
                throw new CustomException(ErrorCode.NOT_ENTER_LICENSE_ID);
            }
            if (rating == null) {
                throw new CustomException(ErrorCode.NOT_ENTER_RATING);
            }
            // rating 유효성 검사
            if (rating > 7 || rating < 0) {
                throw new CustomException(ErrorCode.WRONG_RATING);
            }

            NationLicense nationLicense = nationLicenseRepository.findByNationIdAndId(nationId, licenseId)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_LICENSE));

            JobLicense jobLicense = JobLicense.builder()
                    .job(job)
                    .license(nationLicense)
                    .rating(rating.byteValue())
                    .build();
            jobLicenseRepository.save(jobLicense);
        }
    }

    /**
     * 직업 생성 시 권한 설정
     * @param studentJob
     * @param powerIds
     */
    private void addJobPower(StudentJob studentJob, List<Long> powerIds) {
        // powerIds Set
        Set<Long> setPowerIds = new TreeSet<>(powerIds);
        List<Power> powers = powerRepository.findAllByIdIn(new ArrayList<>(setPowerIds));
        if (powers.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_POWER);
        }

        // empowered 초기화
        StringBuilder jobEmpowered = new StringBuilder();
        for (Power power:powers) {
            // job empowered 컬럼 채우기
            jobEmpowered.append(power.getId()).append(",");
        }
        studentJob.setEmpowered(jobEmpowered.toString());
    }
}
