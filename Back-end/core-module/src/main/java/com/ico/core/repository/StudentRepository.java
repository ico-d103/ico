package com.ico.core.repository;

import com.ico.core.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * 학생 관련 Repository
 *
 * @author 강교철
 * @author 서재건
 * @author 변윤경
 */
public interface StudentRepository extends JpaRepository<Student, Long> {

    /**
     * Student table 에서 아이디로 학생 정보 가져오기
     *
     * @param identity
     * @return Student
     */
    Optional<Student> findByIdentity(String identity);

    /**
     * Student table 에서 index로 학생 정보 가져오기
     *
     * @param id must not be {@literal null}.
     * @return
     */
    Optional<Student> findById(Long id);

    /**
     * 나라의 학생 목록 조회
     *
     * @param nationId
     * @return
     */
    List<Student> findAllByNationIdOrderByNumberAsc(Long nationId);

    /**
     * 나라의 학생 조회
     *
     * @param nationId
     * @return
     */
    List<Student> findAllByNationId(Long nationId);

    /**
     * 체크한 학생들 Entity 반환
     *
     * @param studentIds
     * @return
     */
    List<Student> findAllByIdIn(List<Long> studentIds);

    /**
     * 선택한 학생들 중 선생님 나라와 일치하는 학생 리스트 반환
     * 
     * @param studentIds
     * @param nationId
     * @return
     */
    List<Student> findAllByIdInAndNationId(List<Long> studentIds, Long nationId);

    /**
     * 직업이 배정된 학생 목록 조회
     *
     * @param pageable
     * @return
     */
    Page<Student> findByStudentJobIsNotNull(Pageable pageable);

    /**
     * 쌓은 월급이 0이상이고 오늘이 월급일인 국가의 학생 목록 조회
     *
     * @param salary
     * @return
     */
    Page<Student> findBySalaryGreaterThanAndNationIdIn(Integer salary, List<Long> nationIds, Pageable pageable);

    /**
     * 같은 나라의 같은 직업을 가진 학생들 조회
     * @param nationId
     * @param jobId
     * @return
     */
    List<Student> findAllByNationIdAndStudentJobId(Long nationId, Long jobId);
}
