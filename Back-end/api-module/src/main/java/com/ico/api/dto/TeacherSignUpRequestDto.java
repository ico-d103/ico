package com.ico.api.dto;

import com.ico.core.entity.Certification;
import com.ico.core.entity.Role;
import com.ico.core.entity.Teacher;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TeacherSignUpRequestDto {

    private String identity;
    private String password;
    private String checkedPassword;
    private String name;
    private Role role;
    private String image;

    public TeacherSignUpRequestDto(Teacher teacher) {
        this.identity = teacher.getIdentity();
        this.password = teacher.getPassword();
        this.name = teacher.getName();
        this.role = Role.TEACHER;
    }
}
