package com.ico.api.dto;

import com.ico.core.code.Role;
import com.ico.core.entity.Teacher;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * 교사 회원가입시 입력받을 것
 *
 * @author 강교철
 */
@Data
@NoArgsConstructor
public class TeacherSignUpRequestDto {

    private String identity;
    private String password;
    private String checkedPassword;
    private String name;
    private Role role;

    public TeacherSignUpRequestDto(Teacher teacher) {
        this.identity = teacher.getIdentity();
        this.password = teacher.getPassword();
        this.name = teacher.getName();
        this.role = Role.TEACHER;
    }
}
