import { useReducer } from "react"
import { css } from "@emotion/react"
import { postTeacher } from "@/api/teacher/user/postTeacher"
import { useState } from "react"
import { KOREAN_ONLY, ENG_NUM_ONLY } from "@/util/regex"
import { lengthCheck } from "@/util/lengthCheck"
import LoadImage from "@/components/common/LoadImage/LoadImage"
import Input from "@/components/common/Input/Input"
import Button from "@/components/common/Button/Button"
import { NAME_ICON, ID_ICON, PASSWORD_ICON, PASSWORD2_ICON } from "@/components/teacher/Signup/SignupIcons/SignupIcons"

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

const validReducer = (state: { id: boolean; password: boolean }, action: { type: string; value: boolean }) => {
	switch (action.type) {
		case "VALID_ID":
			return { ...state, id: action.value }
		case "VALID_PW":
			return { ...state, password: action.value }
		default:
			return state
	}
}

function signup() {
	const [alarm, setAlarm] = useState<string>("")
	// const [isValidID, setIsValidID] = useState<boolean>(false)
	const [validState, dispatchValid] = useReducer(validReducer, { id: false, password: false })
	const [inputState, dispatchInput] = useReducer(inputReducer, { name: "", id: "", password: "" })

	const checkValidIDHandler = async () => {
		// 아이디 중복 검사 요청

		// 사용 가능하면
		dispatchValid({ type: "VALID_ID", value: true })
		setAlarm("사용 가능한 ID입니다.")

		// 불가능하면
		// dispatchValid({ type: "VALID_ID", value: false })
		// setAlarm("이미 사용중인 ID입니다.")
	}

	const checkValidPWHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (inputState.password === "") return

		if (e.target.value === inputState.password) {
			dispatchValid({ type: "VALID_PW", value: true })
			setAlarm("비밀번호가 일치합니다.")
		} else {
			dispatchValid({ type: "VALID_PW", value: false })
			setAlarm("비밀번호가 일치하지 않습니다.")
		}
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

		if (!validState.id) {
			setAlarm("아이디 중복 확인을 해주세요.")
			return
		}

		if (!validState.password) {
			setAlarm("비밀번호 재확인을 해주세요.")
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
			<div css={innerWrapperCSS}>
				<LoadImage src={"/assets/signup/illust.png"} alt={"signup_illust"} wrapperCss={imageWrapperCSS} dev={false} />

				<span>{alarm}</span>
				{/* placeholder 멘트도 더 좋은게 있다면 수정해주세요 */}

				<Input
					leftContent={NAME_ICON}
					theme={"default"}
					placeholder="이름 (한글만 입력해주세요)"
					onChange={(e) => dispatchInput({ type: "CHANGE_NAME", value: e.target.value })}
					customCss={inputCSS}
				/>
				<Input
					leftContent={ID_ICON}
					rightContent={
						<Button
							theme={"RadialPositive"}
							width={"120px"}
							height={"42px"}
							text={"중복 확인"}
							fontSize={"var(--teacher-h5)"}
							onClick={checkValidIDHandler}
						></Button>
					}
					theme={"default"}
					customCss={inputCSS}
					type="text"
					placeholder="아이디 (영어와 숫자를 조합해 4자~10자 입력해주세요)"
					onChange={(e) => {
						dispatchValid({ type: "VALID_ID", value: false })
						dispatchInput({ type: "CHANGE_ID", value: e.target.value })
					}}
				/>

				<Input
					leftContent={PASSWORD_ICON}
					theme={"default"}
					customCss={inputCSS}
					type="password"
					placeholder="비밀번호 (영어와 숫자를 조합해 8자~16자 입력해주세요)"
					onChange={(e) => {
						setAlarm("")
						dispatchValid({ type: "VALID_PW", value: false })
						dispatchInput({ type: "CHANGE_PW", value: e.target.value })
					}}
				/>
				<Input
					leftContent={PASSWORD2_ICON}
					theme={"default"}
					customCss={inputCSS}
					type="password"
					placeholder="비밀번호 확인"
					onChange={checkValidPWHandler}
				/>
				<button onClick={ceritfyHandler}>본인 인증하기</button>
				<input type="file" placeholder="교사 인증서" />
				<button onClick={signUpHandler}>회원 가입</button>
			</div>
		</div>
	)
}

// 임시 값
const wrapperCSS = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`

const innerWrapperCSS = css`
	width: 40vw;
	/* height: 40vh; */
	/* background-color: red; */
	display: flex;
	flex-direction: column;
	align-items: center;
`

const imageWrapperCSS = css`
	width: 100%;
	height: 23.3vw;
`

const inputCSS = css`
	width: 100%;
	margin: 24px;
`

export default signup
