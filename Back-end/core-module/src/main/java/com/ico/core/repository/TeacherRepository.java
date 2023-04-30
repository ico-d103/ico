package com.ico.core.repository;

import com.ico.core.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    @Query("select t from Teacher t where t.identity=:identity")
    Optional<Teacher> findTeacherByIdentity(@Param("identity") String identity);

}
