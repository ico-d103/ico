// 한글만 사용 가능
export const KOREAN_ONLY = /[ㄱ-ㅎㅏ-ㅣ가-힣]+/

// 영어와 숫자만 사용 가능
export const ENG_NUM_ONLY = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/
