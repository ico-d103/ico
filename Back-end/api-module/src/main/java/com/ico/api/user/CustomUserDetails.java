package com.ico.api.user;

import com.ico.core.code.Role;
import com.ico.core.entity.Student;
import com.ico.core.entity.Teacher;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 *  Spring Security 를 사용하여 인증 및 인가를 구현하기 위한 UserDetails 의 CustomUserDetails
 *
 * @author 강교철
 */
public class CustomUserDetails implements UserDetails {

    private final Object user;

    public CustomUserDetails(Object user) {
        this.user = user;
    }

    /**
     * 사용자가 가지는 권한 정보를 반환
     *
     * @return TEACHER or STUDENT
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        if (user instanceof Student) {
            authorities.add(new SimpleGrantedAuthority(Role.STUDENT.name()));
        } else if (user instanceof Teacher) {
            authorities.add(new SimpleGrantedAuthority(((Teacher) user).getRole().name()));
        }
        return authorities;
    }

    /**
     * 사용자의 비밀번호 반환
     * @return password
     */
    @Override
    public String getPassword() {
        return ((User) user).getPassword();
    }

    /**
     * 사용자의 아이디 반환
     * @return id
     */
    @Override
    public String getUsername() {
        // return ((User) user).getUsername();
        if (user instanceof Student) {
            return ((Student) user).getIdentity();
        } else if (user instanceof Teacher) {
            return ((Teacher) user).getIdentity();
        } else{
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
    }

    /**
     * 해당 계정이 만료되었는지 여부 반환
     * @return true
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * 해당 계정이 잠겼는지 여부 반환
     * @return true
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * 사용자의 자격증명(암호)이 만료되었는지 여부 반환
     * @return true
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * 해당 계정이 사용 가능 여부 반환
     * 사용자가 Student 객체인 경우 로그인 시도 횟수(count)가 100회 미만일 때만 계정이 활성화된 상태가 된다.
     * @return true or false
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
