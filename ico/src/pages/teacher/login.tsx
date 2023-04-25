import React, { useState } from "react"
import { css } from "@emotion/react"

function login() {
	const [id, setId] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	// 함수 반환 타입 Promise<void> 로 추후 변경
	const loginHandler = (): void => {
		if (id === "" || password === "") {
			alert("빈 칸을 모두 입력해주세요.") // 멘트 변경 가능
			return
		}
		// 로그인 api 요청

		alert("로그인 요청")
	}

	return (
		<div css={wrapperCSS}>
			<input type="text" placeholder="아이디" onChange={(e) => setId(e.target.value)} />
			<input type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
			<button onClick={loginHandler}>로그인</button>
		</div>
	)
}

// 임시 값
const wrapperCSS = css`
	display: flex;
	flex-direction: column;
	width: 300px;
`

export default login
