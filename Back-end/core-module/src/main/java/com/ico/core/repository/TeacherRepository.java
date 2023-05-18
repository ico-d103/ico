package com.ico.core.repository;

import com.ico.core.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author 강교철
 */
public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    /**
     * Teacher table 에서 아이디로 교사 정보 가져오기
     *
     * @param identity
     * @return Teacher
     */
    Optional<Teacher> findByIdentity(String identity);

    Optional<Teacher> findById(Long id);

    Optional<Teacher> findByNationId(Long nationId);

}
