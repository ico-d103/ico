package com.ico.api.user;

import com.ico.core.entity.Student;
import com.ico.core.entity.Teacher;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.StudentRepository;
import com.ico.core.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Filter 에서 아래의 메소드를 호출함
 *
 * @author 강교철
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailService implements UserDetailsService {


    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;

    /**
     * identity 를 쓴 이유는 loadUserByUsername 메서드를 호출할 때 학생인지 교사인지 인증을 안하기 때문에
     *
     * @param identity the username identifying the user whose data is required.
     * @return (UserDetail) teacher or (UserDetail) student
     * @throws UsernameNotFoundException
     */
    @Override
    public CustomUserDetails loadUserByUsername(String identity) throws UsernameNotFoundException {
        Optional<Teacher> teacher = teacherRepository.findByIdentity(identity);
        Optional<Student> student = studentRepository.findByIdentity(identity);
        log.info("LoadUserByUserName  teacher : {}", teacher);
        log.info("LoadUserByUserName  student : {}", student);

        if (teacher.isPresent()) {
            return new CustomUserDetails(teacher.get());
        } else if (student.isPresent()) {
            return new CustomUserDetails(student.get());
        } else {
            log.info("[loadUserByUsername] 교사, 학생 둘 다 없는 경우");
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
    }
}
