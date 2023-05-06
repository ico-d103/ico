package com.ico.core.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * 에러 코드 Enum
 *
 * @author 서재건
 * @author 변윤경
 * @author 강교철
 */
@Getter
@AllArgsConstructor
public enum ErrorCode{

    LOW_BALANCE(HttpStatus.BAD_REQUEST, "11", "잔액이 부족합니다."),

    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "13", "해당하는 회원이 없습니다."),

    NATION_NOT_FOUND(HttpStatus.NOT_FOUND, "14", "해당하는 국가가 없습니다."),

    JOB_NOT_FOUND(HttpStatus.NOT_FOUND, "15", "해당하는 직업이 없습니다."),

    INVALID_FILE_EXTENSION(HttpStatus.BAD_REQUEST, "16", "파일 변환 중 에러가 발생 했습니다."),

    ALREADY_EXIST_TITLE(HttpStatus.CONFLICT, "17", "이미 존재하는 이름입니다."),

    NOT_AUTHORIZATION_NATION(HttpStatus.UNAUTHORIZED, "18", "해당 나라에 교사의 접근 권한이 없습니다."),

    NOT_BLANK(HttpStatus.BAD_REQUEST, "19", "칸이 비었습니다."),

    DUPLICATED_ID(HttpStatus.BAD_REQUEST, "101", "중복된 아이디입니다."),

    PASSWORD_WRONG(HttpStatus.BAD_REQUEST, "105", "비밀번호가 틀렸습니다."),

    NOT_FOUND_NATION(HttpStatus.BAD_REQUEST, "202", "나라가 없습니다."),

    ALREADY_ASSIGNED_JOB(HttpStatus.BAD_REQUEST, "409", "이미 배정된 직업입니다."),

    ALREADY_FULL_JOB(HttpStatus.CONFLICT, "421", "직업 정원이 다 찼습니다."),

    ALREADY_HAS_JOB(HttpStatus.CONFLICT, "422", "해당 학생은 이미 직업이 존재합니다."),

    INVALID_CREDIT_RATING(HttpStatus.BAD_REQUEST, "500", "신용등급 요건에 적합하지 않습니다."),

    RESUME_NOT_FOUND(HttpStatus.NOT_FOUND, "503", "신청 내역이 존재하지 않습니다."),

    WRONG_CODE(HttpStatus.BAD_REQUEST, "200", "일치하는 반 코드가 없습니다."),

    WRONG_IMMIGRATION(HttpStatus.BAD_REQUEST, "201", "입국 심사를 기다리고 있는 나라가 있습니다."),

    NOT_FOUND_IMMIGRATION(HttpStatus.NOT_FOUND, "203", "입국 심사를 기다리고 있는 나라가 없습니다."),

    PROPOSAL_NOT_FOND(HttpStatus.NOT_FOUND, "613", "삭제된 판매 제안서입니다."),

    NOT_FOUND_CODE(HttpStatus.BAD_REQUEST, "20", "반 입장 코드를 입력해주세요."),

    ;

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
