package com.ico.api.dto;

import com.ico.core.entity.Role;
import com.ico.core.entity.Student;
import lombok.Data;
import lombok.NoArgsConstructor;

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
