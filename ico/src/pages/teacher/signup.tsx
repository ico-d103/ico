import { useReducer } from "react"
import { css } from "@emotion/react"
import { postTeacher } from "@/api/teacher/user/postTeacher"
import { useState } from "react"

const initialState = { name: "", id: "", password: "" }

const inputReducer = (
	state: { name: string; id: string; password: string },
	action: { type: string; value: string },
) => {
	switch (action.type) {
		case "CHANGE_NAME":
			return { ...state, name: action.value }
		case "CHANGE_ID":
			return { ...state, id: action.value }
		case "CHANGE_PW":
			return { ...state, password: action.value }
		default:
			return state
	}
}

function signup() {
	const [alarm, setAlarm] = useState<string>("")
	const [inputState, dispatchInput] = useReducer(inputReducer, initialState)

	const checkValidIDHandler = async () => {
		// 아이디 중복 검사 요청

		// 사용 가능하면
		setAlarm("사용 가능한 ID입니다.")
		// 불가능하면
		setAlarm("이미 사용중인 ID입니다.")
	}

	const ceritfyHandler = () => {
		// 본인 인증 SMS
	}

	const signUpHandler = async () => {
		if (inputState.name === "" || inputState.id === "" || inputState.password === "") {
			setAlarm("빈 칸을 모두 입력해주세요.")
			return
		}

		// 회원가입 요청
		// const response = await postTeacher({
		// 	name: inputState.name,
		// 	identity: inputState.id,
		// 	password: inputState.password,
		// 	checkedPassword: inputState.password,
		// })
	}

	return (
		<div css={wrapperCSS}>
			<span>{alarm}</span>
			<input
				type="text"
				placeholder="이름"
				onChange={(e) => dispatchInput({ type: "CHANGE_NAME", value: e.target.value })}
			/>
			<input
				type="text"
				placeholder="아이디"
				onChange={(e) => dispatchInput({ type: "CHANGE_ID", value: e.target.value })}
			/>
			<button onClick={checkValidIDHandler}>중복 확인</button>
			<input
				type="password"
				placeholder="비밀번호"
				onChange={(e) => dispatchInput({ type: "CHANGE_PW", value: e.target.value })}
			/>
			<input type="password" placeholder="비밀번호 확인" />
			<button onClick={ceritfyHandler}>본인 인증하기</button>
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
