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

    NOT_AUTHORIZATION_NATION(HttpStatus.UNAUTHORIZED, "18", "해당 나라에 접근 권한이 없습니다."),

    NOT_BLANK(HttpStatus.BAD_REQUEST, "19", "칸이 비었습니다."),

    NOT_FOUND_CODE(HttpStatus.BAD_REQUEST, "20", "반 입장 코드를 입력해주세요."),
    
    FAIL_SSE_SEND(HttpStatus.BAD_REQUEST, "21", "SSE 데이터 전송에 실패하였습니다."),

    COUPON_NOT_FOUND(HttpStatus.NOT_FOUND, "22", "해당하는 쿠폰이 없습니다."),

    FAIL_AUTHORIZATION(HttpStatus.BAD_REQUEST, "23", "신청할 수 있는 권한이 없습니다."),

    TAX_NOT_FOUND(HttpStatus.NOT_FOUND, "24", "해당하는 국세가 없습니다."),

    NOT_FOUND_TOKEN(HttpStatus.BAD_REQUEST, "25", "토큰이 없습니다."),

    DUPLICATED_ID(HttpStatus.BAD_REQUEST, "101", "중복된 아이디입니다."),

    NOT_FOUND_PASSWORD(HttpStatus.BAD_REQUEST, "104", "비밀번호 입력 칸이 비었습니다."),

    PASSWORD_WRONG(HttpStatus.BAD_REQUEST, "105", "비밀번호가 틀렸습니다."),

    WRONG_ROLE(HttpStatus.BAD_REQUEST, "111", "권한이 없습니다."),

    NOT_FOUND_NAME(HttpStatus.BAD_REQUEST, "112", "이름 입력 칸이 비었습니다."),

    WRONG_CODE(HttpStatus.BAD_REQUEST, "200", "일치하는 반 코드가 없습니다."),

    WRONG_IMMIGRATION(HttpStatus.BAD_REQUEST, "201", "입국 심사를 기다리고 있는 나라가 있습니다."),

    NOT_FOUND_NATION(HttpStatus.BAD_REQUEST, "202", "나라가 없습니다."),

    NOT_FOUND_IMMIGRATION_NATION(HttpStatus.NOT_FOUND, "203", "입국 심사를 기다리고 있는 나라가 없습니다."),

    NOT_FOUND_IMMIGRATION_USER(HttpStatus.NOT_FOUND, "204", "입국 심사를 기다리고 있는 학생이 없습니다."),

    DUPLICATED_NATION_NAME(HttpStatus.NOT_FOUND, "205", "이미 존재하는 나라 이름입니다."),

    ALREADY_ASSIGNED_COUPON(HttpStatus.BAD_REQUEST, "300", "승인 대기 중인 쿠폰입니다."),

    ALREADY_ASSIGNED_JOB(HttpStatus.BAD_REQUEST, "409", "이미 배정된 직업입니다."),

    ALREADY_FULL_JOB(HttpStatus.CONFLICT, "421", "직업 정원이 다 찼습니다."),

    ALREADY_HAS_JOB(HttpStatus.CONFLICT, "422", "해당 학생은 이미 직업이 존재합니다."),

    RULE_NOT_FOUND(HttpStatus.NOT_FOUND, "423", "해당하는 규칙이 없습니다."),

    INVALID_JOB_TOTAL(HttpStatus.BAD_REQUEST, "424", "배정된 인원보다 적은 총 인원 수를 설정할 수 없습니다."),

    INVALID_CREDIT_RATING(HttpStatus.BAD_REQUEST, "500", "신용등급 요건에 적합하지 않습니다."),

    REQUEST_NOT_FOUND(HttpStatus.NOT_FOUND, "503", "신청 내역이 존재하지 않습니다."),

    ZERO_COUPON(HttpStatus.BAD_REQUEST, "505", "사용할 수 있는 쿠폰 재고가 없습니다."),

    INVALID_COUPON(HttpStatus.BAD_REQUEST, "506", "신청하지 않은 쿠폰입니다."),

    PROPOSAL_NOT_FOND(HttpStatus.NOT_FOUND, "613", "삭제된 판매 제안서입니다."),

    NOT_COUPON(HttpStatus.BAD_REQUEST, "614", "해당 상품은 쿠폰이 아닙니다."),

    NOT_RENTAL(HttpStatus.BAD_REQUEST, "615", "해당 상품은 대여 상품이 아닙니다."),

    SOLD_OUT(HttpStatus.BAD_REQUEST, "616", "품절된 상품입니다."),

    NOT_TRADING_TIME(HttpStatus.BAD_REQUEST, "701", "거래시간이 아닙니다."),

    ALREADY_EXIST_STOCK(HttpStatus.BAD_REQUEST, "702", "종목 삭제 후 시도해주세요."),

    NOT_FOUND_STOCK(HttpStatus.BAD_REQUEST, "703", "투자 종목이 없습니다."),

    ALREADY_HAVE_STOCK(HttpStatus.BAD_REQUEST, "704", "매도만 가능합니다."),

    NOT_FOUND_ISSUE(HttpStatus.NOT_FOUND, "705", "가장 최신 투자 이슈를 찾을 수 없습니다."),

    NOT_UPLOAD_TIME(HttpStatus.NOT_FOUND, "712", "거래 시간에는 이슈 등록이 불가능합니다."),

    ;

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
