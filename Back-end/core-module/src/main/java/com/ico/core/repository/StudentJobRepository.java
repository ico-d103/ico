package com.ico.core.repository;

import com.ico.core.entity.StudentJob;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * 직업 관련 Repository
 *
 * @author 서재건
 */
public interface StudentJobRepository extends JpaRepository<StudentJob, Long> {

    /**
     * 학급의 모든 직업 조회
     *
     * @param nationId
     * @return
     */
    List<StudentJob> findAllByNationId(Long nationId);

    /**
     * 교사가 학급의 신청 가능한 직업 조회
     *
     * @param nationId
     * @param total
     * @param sort
     * @return
     */
    List<StudentJob> findAllByNationIdAndTotalGreaterThan(Long nationId, byte total, Sort sort);

    /**
     * 학급의 특정 직업 조회
     *
     * @param id
     * @param nationId
     * @return
     */
    Optional<StudentJob> findByIdAndNationId(Long id, Long nationId);

    /**
     * 학급 내에 중복된 직업 이름 검사
     *
     * @param id
     * @param title
     * @param nationId
     * @return
     */
    Optional<StudentJob> findByIdNotAndTitleAndNationId(Long id, String title, Long nationId);

    /**
     * 직업 명함 조회 시 total이 0인 직업은 아래로 정렬
     *
     * @param nationId
     * @return
     */
    List<StudentJob> findAllByNationIdOrderByTotalDesc(Long nationId);

}
