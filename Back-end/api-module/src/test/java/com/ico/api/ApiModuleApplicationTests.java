package com.ico.api;

import com.ico.core.code.Password;
import com.ico.core.code.Role;
import com.ico.core.entity.Teacher;
import com.ico.core.repository.TeacherRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * 테스트 코드 작성
 *
 * @author 강교철
 */
@SpringBootTest
@ExtendWith(SpringExtension.class)
class ApiModuleApplicationTests {

    @Autowired
    TeacherRepository teacherRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    /**
     * 교사 회원가입 테스트
     */
    @Test
    @Transactional  // Rollback 적용시키기 위해 작성
    @Rollback   // 실제 DB에 데이터를 넣지 않기 위해 / DB에 넣으려면 (false)를 추가해주면 된다.
    void signUp() {
        Teacher teacher = new Teacher();
        teacher.setIdentity("chano0608");
        teacher.setPassword(passwordEncoder.encode("chano0608"));
        teacher.setName("김찬호");
        teacher.setPhoneNum("01012345678");
        teacher.setRole(Role.TEACHER);
        teacher.setPwStatus(Password.OK);

        Teacher joinMember = teacherRepository.save(teacher);
        Optional<Teacher> findMember = teacherRepository.findById(joinMember.getId());
        assertThat(findMember.get().getId()).isEqualTo(teacher.getId());
        assertThat(findMember).isEqualTo(findMember);
    }
}
