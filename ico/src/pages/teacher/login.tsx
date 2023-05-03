import { useState, useReducer } from "react"
import { css } from "@emotion/react"

const initialState = { id: "", password: "" }

const inputReducer = (state: { id: string; password: string }, action: { type: string; value: string }) => {
	switch (action.type) {
		case "CHANGE_ID":
			return { ...state, id: action.value }
		case "CHANGE_PW":
			return { ...state, password: action.value }
		default:
			return state
	}
}

function login() {
	const [alarm, setAlarm] = useState<string>("")
	const [inputState, dispatchInput] = useReducer(inputReducer, initialState)

	const loginHandler = async () => {
		if (inputState.id === "" || inputState.password === "") {
			setAlarm("빈 칸을 모두 입력해주세요.") // 멘트 변경 가능
			return
		}

		setAlarm("")

		// 로그인 요청
	}

	return (
		<div css={wrapperCSS}>
			<span>{alarm}</span>
			<input
				type="text"
				placeholder="아이디를 입력해주세요."
				onChange={(e) => dispatchInput({ type: "CHANGE_ID", value: e.target.value })}
			/>
			<input
				type="password"
				placeholder="비밀번호를 입력해주세요."
				onChange={(e) => dispatchInput({ type: "CHANGE_PW", value: e.target.value })}
			/>
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
