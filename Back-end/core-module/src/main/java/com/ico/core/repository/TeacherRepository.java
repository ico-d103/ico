package com.ico.core.repository;

import com.ico.core.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    /**
     * Teacher table 에서 아이디로 교사 정보 가져오기
     *
     * @param identity
     * @return Teacher
     */
    Optional<Teacher> findByIdentity(String identity);

}
