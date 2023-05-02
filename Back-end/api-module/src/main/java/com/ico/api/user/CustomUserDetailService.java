package com.ico.api.user;

import com.ico.core.repository.StudentRepository;
import com.ico.core.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Filter 에서 아래의 메소드를 호출함
 *
 * @author 강교철
 */
@Service
@RequiredArgsConstructor
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

        if (teacherRepository.findByIdentity(identity).isPresent()) {
            return new CustomUserDetails(teacherRepository.findByIdentity(identity)
                    .orElseThrow(() -> new UsernameNotFoundException("교사를 찾을 수 없습니다.")));
        } else if (studentRepository.findByIdentity(identity).isPresent()) {
            return new CustomUserDetails(studentRepository.findByIdentity(identity)
                    .orElseThrow(() -> new UsernameNotFoundException("학생을 찾을 수 없습니다.")));
        } else {
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
        }
    }
}
