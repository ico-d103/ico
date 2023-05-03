import { useReducer } from "react"
import { css } from "@emotion/react"
import { postTeacher } from "@/api/teacher/user/postTeacher"
import { useState } from "react"
import { KOREAN_ONLY, ENG_NUM_ONLY } from "@/util/regex"
import { lengthCheck } from "@/util/lengthCheck"

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
	const [isValidID, setIsValidID] = useState<boolean>(false)
	const [inputState, dispatchInput] = useReducer(inputReducer, initialState)

	const checkValidIDHandler = async () => {
		// 아이디 중복 검사 요청

		// 사용 가능하면
		setIsValidID(true)
		setAlarm("사용 가능한 ID입니다.")

		// 불가능하면
		// setIsValidID(false)
		// setAlarm("이미 사용중인 ID입니다.")
	}

	const ceritfyHandler = () => {
		// 본인 인증 SMS
	}

	const signUpHandler = async () => {
		if (inputState.name === "" || inputState.id === "" || inputState.password === "") {
			setAlarm("빈 칸을 모두 입력해주세요.")
			return
		}

		if (KOREAN_ONLY.test(inputState.name) === false) {
			setAlarm("이름은 한글만 입력 가능합니다.")
			return
		}

		if (ENG_NUM_ONLY.test(inputState.id) === false || lengthCheck(inputState.id, 4, 10) === false) {
			setAlarm("아이디는 영어, 숫자 조합으로 최소 4자부터 최대 10자까지 입력 가능합니다.")
			return
		}

		if (ENG_NUM_ONLY.test(inputState.password) === false || lengthCheck(inputState.password, 8, 16) === false) {
			setAlarm("비밀번호는 영어, 숫자 조합으로 최소 8자부터 최대 16자까지 입력 가능합니다.")
			return
		}

		if (!isValidID) {
			setAlarm("아이디 중복 확인을 해주세요.")
			return
		}

		setAlarm("")

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
			{/* placeholder 멘트도 더 좋은게 있다면 수정해주세요 */}
			<input
				type="text"
				placeholder="이름 (한글만 입력해주세요)"
				onChange={(e) => dispatchInput({ type: "CHANGE_NAME", value: e.target.value })}
			/>
			<input
				type="text"
				placeholder="아이디 (영어와 숫자를 조합해 4자~10자 입력해주세요)"
				onChange={(e) => {
					setIsValidID(false)
					dispatchInput({ type: "CHANGE_ID", value: e.target.value })
				}}
			/>
			<button onClick={checkValidIDHandler}>중복 확인</button>
			<input
				type="password"
				placeholder="비밀번호 (영어와 숫자를 조합해 8자~16자 입력해주세요)"
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
