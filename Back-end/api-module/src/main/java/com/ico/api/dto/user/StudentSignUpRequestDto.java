package com.ico.api.dto.user;

import com.ico.core.code.Role;
import com.ico.core.entity.Student;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 * 학생 회원가입시 입력받을 것
 *
 * @author 강교철
 */
@Data
@NoArgsConstructor
public class StudentSignUpRequestDto {

    @NotBlank(message = "100")
    private String identity;
    @NotBlank(message = "104")
    @Size(min = 8, max = 16, message = "48")    // 프론트가 정해놓은 글자 수
    @Pattern(regexp = "^[0-9a-zA-Z]*$", message = "49")     // 프론트가 정한 비밀번호 규칙
    private String password;
    @NotBlank(message = "104")
    @Size(min = 8, max = 16, message = "48")    // 프론트가 정해놓은 글자 수
    @Pattern(regexp = "^[0-9a-zA-Z]*$", message = "49")     // 프론트가 정한 비밀번호 규칙
    private String checkedPassword;
    @NotBlank(message = "112")
    private String name;
    private Role role;

    public StudentSignUpRequestDto(Student student) {
        this.identity = student.getIdentity();
        this.password = student.getPassword();
        this.name = student.getName();
        this.role = Role.STUDENT;
    }
}
