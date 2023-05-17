package com.ico.api.dto.user;

import com.ico.core.code.Role;
import com.ico.core.entity.Teacher;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;


/**
 * 교사 회원가입시 입력받을 것
 *
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class TeacherSignUpRequestDto {

    @NotBlank(message = "100")
    private String identity;
    @NotBlank(message = "104")
    private String password;
    @NotBlank(message = "104")
    private String checkedPassword;
    @NotBlank(message = "112")
    private String name;
    private Role role;
    @NotBlank(message = "113")
    private String phoneNum;

    public TeacherSignUpRequestDto(Teacher teacher) {
        this.identity = teacher.getIdentity();
        this.password = teacher.getPassword();
        this.name = teacher.getName();
        this.role = Role.TEACHER;
        this.phoneNum = teacher.getPhoneNum();
    }
}
