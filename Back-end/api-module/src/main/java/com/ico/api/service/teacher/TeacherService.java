package com.ico.api.service.teacher;

import com.ico.api.dto.user.TeacherSignUpRequestDto;
import com.ico.core.entity.Teacher;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * Teacher Service
 *
 * @author 강교철
 */
public interface TeacherService {

    /**
     * TeacherSignUpRequestDto 를 받아 교사 회원가입
     *
     * @param requestDto
     * @return id
     */
    Long signUp(TeacherSignUpRequestDto requestDto, MultipartFile file) throws IOException;

    /**
     * 휴대폰 인증
     *
     * @param phoneNum
     * @return randomCode
     */
    String certifiedPhoneNum(String phoneNum);

    /**
     * 회원가입 후 교사인증서 반려 당했을 때 or 다시 교사인증서를 보낼 때
     * @param request
     * @param file
     */
    void certifiedImage(HttpServletRequest request, MultipartFile file);

    /**
     * 교사가 학생의 비밀번호를 난수로 초기화 해줌
     * 발표 끝나고 status 어떻게 보내줄지 고민해보기
     * @param studentId
     * @param request
     */
    String resetStudentPassword(Long studentId, HttpServletRequest request);
}
