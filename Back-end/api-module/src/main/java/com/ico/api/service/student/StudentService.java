package com.ico.api.service.student;

import com.ico.api.dto.nation.CreditScoreReqDto;
import com.ico.api.dto.student.StudentAllResDto;
import com.ico.api.dto.student.StudentListResDto;
import com.ico.api.dto.student.StudentMyPageResDto;
import com.ico.api.dto.student.StudentResDto;
import com.ico.api.dto.user.AccountDto;
import com.ico.api.dto.user.StudentSignUpRequestDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * Student Service
 *
 * @author 강교철
 * @author 변윤경
 * @author 서재건
 */
public interface StudentService {

    /**
     * StudentSignUpRequestDto 를 받아 학생 회원가입
     *
     * @param requestDto
     * @return student.getId()
     */
    Long signUp(StudentSignUpRequestDto requestDto);

    void teacherUpdateAccount(Long id, AccountDto accountDto);

    /**
     * 우리 반 학생 목록 조회
     *
     * @return
     */
    List<StudentListResDto> findAllStudent(HttpServletRequest request);

    /**
     * 학생 상세보기 조회
     *
     * @return
     */
    StudentResDto findStudent(Long studentId);

    /**
     * 학생 내 정보 조회
     *
     * @param request
     * @return
     */
    StudentMyPageResDto findStudentMyPage(HttpServletRequest request);

    /**
     * 신용등급 평점 부여
     *
     * @param studentId
     */
    void postCreditScore(Long studentId, CreditScoreReqDto dto, HttpServletRequest request);

    /**
     * 학생의 계좌 정지
     *
     * @param studentId
     */
    void suspendAccount(Long studentId);

    /**
     * 학생의 계좌 정지 해제
     *
     * @param studentId
     */
    void releaseAccount(Long studentId);

    /**
     * 학생의 반 친구 목록 조회
     *
     * @param request
     * @return
     */
    List<StudentAllResDto> findListStudent(HttpServletRequest request);

    /**
     * 학생의 신용등급 조회
     *
     * @param request
     * @return
     */
    Byte findStudentCreditRating(HttpServletRequest request);

    /**
     * 신용등급 평점 일괄 부여
     *
     * @param request
     */
    void postAllCreditScore(CreditScoreReqDto dto, HttpServletRequest request);

    /**
     * 학생의 account 조회
     * @param request
     * @return 자산
     */
    Map<String, String> findAccount(HttpServletRequest request);
}
