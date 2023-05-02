package com.ico.core.repository;

import com.ico.core.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {

    /**
     * Student table 에서 아이디로 학생 정보 가져오기
     *
     * @param identity
     * @return Student
     */
    Optional<Student> findByIdentity(String identity);

}
