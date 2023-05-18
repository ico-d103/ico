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
     * 직업이 배정된 학생 목록 조회
     *
     * @param pageable
     * @return
     */
    Page<Student> findByStudentJobIsNotNull(Pageable pageable);

    /**
     * 15일에 월급을 지급받을 금액이 있는 학생들의 목록 조회
     *
     * @param salary
     * @param pageable
     * @return
     */
    Page<Student> findBySalaryGreaterThan(Integer salary, Pageable pageable);


}
