import React, { useState } from "react"
import { css } from "@emotion/react"

function signup() {
	const [isValidId, setIsValidId] = useState<boolean | null>(null)

	// 함수 반환 타입 Promise<void> 로 추후 변경
	const checkValidIdHandler = (): void => {
		// 아이디 중복 체크 api 요청

		// 사용가능하면
		setIsValidId(true)
		// 사용불가능하면
		setIsValidId(false)
	}

	const signUpHandler = (): void => {
		// 교사 회원가입 api 요청
	}

	return (
		<div css={wrapperCSS}>
			<input type="text" placeholder="아이디" />
			{isValidId ? <span>사용 가능한 아이디입니다.</span> : <span>이미 사용중인 아이디입니다.</span>}
			<button onClick={checkValidIdHandler}>중복 확인</button>
			<input type="password" placeholder="비밀번호" />
			<input type="text" placeholder="이름" />
			<button>본인 인증하기</button>
			<input type="file" placeholder="교사 인증서" />
			<button onClick={signUpHandler}>회원 가입</button>
		</div>
	)
}

// 임시 값
const wrapperCSS = css`
	display: flex;
	flex-direction: column;
	width: 300px;
`

export default signup
