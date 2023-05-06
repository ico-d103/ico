package com.ico.api.dto.user;

import com.ico.core.code.Role;
import com.ico.core.entity.Student;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 학생 회원가입시 입력받을 것
 *
 * @author 강교철
 */
@Data
@NoArgsConstructor
public class StudentSignUpRequestDto {

    private String identity;
    private String password;
    private String checkedPassword;
    private String name;
    private Role role;

    public StudentSignUpRequestDto(Student student) {
        this.identity = student.getIdentity();
        this.password = student.getPassword();
        this.name = student.getName();
        this.role = Role.STUDENT;
    }

}
