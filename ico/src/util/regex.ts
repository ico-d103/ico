// 한글만 사용 가능
export const KOREAN_ONLY = /[ㄱ-ㅎㅏ-ㅣ가-힣]+/

// 영어와 숫자만 사용 가능
export const ENG_NUM_ONLY = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/


export const PHONE_NUMBER_ONLY = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;


export const CLASS_ONLY = /^[0-9]{1,2}$/;

export const GRADE_ONLY = /^[1-6]{1}$/;