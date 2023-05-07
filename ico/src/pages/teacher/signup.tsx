import { useReducer, useRef, useEffect } from "react"
import { css } from "@emotion/react"
import { postTeacher } from "@/api/teacher/user/postTeacher"
import { useState } from "react"
import { KOREAN_ONLY, ENG_NUM_ONLY, PHONE_NUMBER_ONLY } from "@/util/regex"
import { lengthCheck } from "@/util/lengthCheck"
import LoadImage from "@/components/common/LoadImage/LoadImage"
import Input from "@/components/common/Input/Input"
import Button from "@/components/common/Button/Button"
import {
	NAME_ICON,
	ID_ICON,
	PASSWORD_ICON,
	PASSWORD2_ICON,
	CLIP_ICON,
	PHONE_ICON,
} from "@/components/teacher/Signup/SignupIcons/SignupIcons"
import { postDuplicationCheck } from "@/api/common/postDuplicationCheck"
import { useQuery } from "@tanstack/react-query"

const inputReducer = (
	state: { name: string; id: string; password: string; password2: string; phone: string },
	action: { type: string; value: string },
) => {
	switch (action.type) {
		case "CHANGE_NAME":
			return { ...state, name: action.value }
		case "CHANGE_ID":
			return { ...state, id: action.value }
		case "CHANGE_PW":
			return { ...state, password: action.value }
		case "CHANGE_PW2":
			return { ...state, password2: action.value }
		case "CHANGE_PHONE":
			return { ...state, phone: action.value }
		default:
			return state
	}
}

const validReducer = (
	state: { name: boolean; id: boolean; password: boolean; password2: boolean; phone: boolean; file: boolean },
	action: { type: string; value: boolean },
) => {
	switch (action.type) {
		case "VALID_NAME":
			return { ...state, name: action.value }
		case "VALID_ID":
			return { ...state, id: action.value }
		case "VALID_PW":
			return { ...state, password: action.value }
		case "VALID_PW2":
			return { ...state, password2: action.value }
		case "VALID_PHONE":
			return { ...state, phone: action.value }
		case "VALID_FILE":
			return { ...state, file: action.value }
		default:
			return state
	}
}

const validMessageReducer = (
	state: { name: string; id: string; password: string; password2: string; phone: string; file: string },
	action: { type: string; value: string },
) => {
	switch (action.type) {
		case "VALID_NAME":
			return { ...state, name: action.value }
		case "VALID_ID":
			return { ...state, id: action.value }
		case "VALID_PW":
			return { ...state, password: action.value }
		case "VALID_PW2":
			return { ...state, password2: action.value }
		case "VALID_PHONE":
			return { ...state, phone: action.value }
		case "VALID_FILE":
			return { ...state, file: action.value }
		default:
			return state
	}
}

function signup() {
	const [validState, dispatchValid] = useReducer(validReducer, {
		name: false,
		id: false,
		password: false,
		password2: false,
		phone: false,
		file: false,
	})
	const [validMessageState, dispatchValidMessage] = useReducer(validMessageReducer, {
		name: "",
		id: "",
		password: "",
		password2: "",
		phone: "",
		file: "",
	})
	const [inputState, dispatchInput] = useReducer(inputReducer, {
		name: "",
		id: "",
		password: "",
		password2: "",
		phone: "",
	})
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [file, setFile] = useState<File | null>(null)
	const [fileUrl, setFileUrl] = useState<string>("")

	useEffect(() => {
		checkValidNameHandler()
	}, [inputState.name])
	useEffect(() => {
		checkValidIDHandler()
	}, [inputState.id])
	useEffect(() => {
		checkValidPWHandler()
	}, [inputState.password])
	useEffect(() => {
		checkValidPW2Handler()
	}, [inputState.password2])
	useEffect(() => {
		checkValidPhoneHandler()
	}, [inputState.phone])

	const checkValidNameHandler = (forSumbit = false) => {
		// 입력값이 없을 때
		if (inputState.name === "") {
			// 제출버튼을 눌렀다면
			if (forSumbit) {
				dispatchValidMessage({ type: "VALID_NAME", value: "이름을 입력해 주세요." })
			}
			dispatchValid({ type: "VALID_NAME", value: false })
			return
		}
		// 유효하지 않을 때
		if (KOREAN_ONLY.test(inputState.name) === false) {
			dispatchValidMessage({ type: "VALID_NAME", value: "이름은 한글만 입력 가능합니다." })
			dispatchValid({ type: "VALID_NAME", value: false })
			return
		}
		// 사용가능하다면
		dispatchValidMessage({ type: "VALID_NAME", value: "" })
		dispatchValid({ type: "VALID_NAME", value: true })
	}

	const checkValidIDHandler = (forSumbit = false, checkVerify = false) => {
		// 입력값이 없을 때
		if (inputState.id === "") {
			// 제출버튼을 눌렀다면
			if (forSumbit) {
				dispatchValidMessage({ type: "VALID_ID", value: "아이디를 입력해 주세요." })
			}
			dispatchValid({ type: "VALID_ID", value: false })
			return
		}
		// 유효하지 않을 때
		if (ENG_NUM_ONLY.test(inputState.id) === false || lengthCheck(inputState.id, 4, 10) === false) {
			dispatchValid({ type: "VALID_ID", value: false })
			dispatchValidMessage({
				type: "VALID_ID",
				value: "아이디는 영어, 숫자 조합으로 최소 4자부터 최대 10자까지 입력 가능합니다.",
			})
			return
		}
		// 중복 확인을 하지 않았다면
		if (forSumbit) {
			if (!validState.id) {
				dispatchValidMessage({ type: "VALID_ID", value: "아이디 중복 확인을 해주세요." })
				dispatchValid({ type: "VALID_ID", value: false })
				return
			}
		}

		dispatchValidMessage({ type: "VALID_ID", value: "" })
		dispatchValid({ type: "VALID_ID", value: false })

		if (checkVerify) {
			// 아이디 중복 검사 요청
			/* 수정 필요 */
			const { data } = useQuery(["postDuplicationCheck"], () => postDuplicationCheck({ id: inputState.id }), {
				enabled: false,
			})
			console.log(data)

			if (data) {
				// 사용 가능하면
				dispatchValidMessage({ type: "VALID_ID", value: "사용 가능한 ID입니다." })
				dispatchValid({ type: "VALID_ID", value: true })
			} else {
				// 불가능하면
				dispatchValidMessage({ type: "VALID_ID", value: "이미 중복된 아이디, 혹은 사용 불가능한 아이디입니다." })
				dispatchValid({ type: "VALID_ID", value: false })
				return
			}
		}
	}

	const checkValidPWHandler = (forSumbit = false) => {
		if (inputState.password === "") {
			if (forSumbit) {
				dispatchValidMessage({
					type: "VALID_PW",
					value: "비밀번호를 입력해 주세요.",
				})
			}
			dispatchValid({ type: "VALID_PW2", value: false })
			return
		}

		if (ENG_NUM_ONLY.test(inputState.password) === false || lengthCheck(inputState.password, 8, 16) === false) {
			dispatchValid({ type: "VALID_PW2", value: false })
			dispatchValidMessage({
				type: "VALID_PW",
				value: "비밀번호는 영어, 숫자 조합으로 최소 8자부터 최대 16자까지 입력 가능합니다.",
			})
			return
		}

		dispatchValidMessage({ type: "VALID_PW", value: "사용 가능한 비밀번호입니다." })
		dispatchValid({ type: "VALID_PW", value: true })
	}

	const checkValidPW2Handler = (forSumbit = false) => {
		if (inputState.password === "") {
			dispatchValid({ type: "VALID_PW2", value: false })
			return
		}

		if (inputState.password2 !== inputState.password) {
			dispatchValid({ type: "VALID_PW2", value: false })
			dispatchValidMessage({ type: "VALID_PW2", value: "비밀번호가 일치하지 않습니다." })

			return
		}

		dispatchValidMessage({ type: "VALID_PW2", value: "비밀번호가 일치합니다." })
		dispatchValid({ type: "VALID_PW2", value: true })
	}

	const checkValidPhoneHandler = (forSumbit = false, checkVerify = false) => {
		// 입력값이 없을 때
		if (inputState.phone === "") {
			// 제출버튼을 눌렀다면
			if (forSumbit) {
				dispatchValidMessage({ type: "VALID_PHONE", value: "휴대폰 번호를 입력해 주세요." })
			}
			dispatchValid({ type: "VALID_PHONE", value: false })
			return
		}
		// 유효하지 않을 때
		if (PHONE_NUMBER_ONLY.test(inputState.phone) === false) {
			dispatchValidMessage({
				type: "VALID_PHONE",
				value: "유효하지 않은 휴대폰 번호입니다. 올바른 번호를 입력해 주세요.",
			})
			dispatchValid({ type: "VALID_PHONE", value: false })
			return
		}

		dispatchValidMessage({ type: "VALID_PHONE", value: "" })

		if (checkVerify) {
			// 휴대폰 인증 확인

			// 인증안했을 때 (if문 추가하기)
			dispatchValidMessage({ type: "VALID_PHONE", value: "휴대폰 인증이 필요합니다." })
			dispatchValid({ type: "VALID_PHONE", value: false })
			return

			// 인증 되었을때
			// dispatchValidMessage({ type: "VALID_PHONE", value: "본인 인증되었습니다." })
			// dispatchValid({ type: "VALID_PHONE", value: true })
		}
	}

	const checkValidFileHandler = (forSumbit = false) => {
		if (file === null) {
			dispatchValidMessage({ type: "VALID_FILE", value: "교사 인증서를 첨부해 주세요" })
			dispatchValid({ type: "VALID_FILE", value: false })
			return
		}

		dispatchValidMessage({ type: "VALID_FILE", value: "" })
		dispatchValid({ type: "VALID_PHONE", value: true })
	}

	const ceritfyHandler = () => {
		// 본인 인증 SMS
	}

	const signUpHandler = async () => {
		checkValidNameHandler(true)
		checkValidIDHandler(true)
		checkValidPWHandler(true)
		checkValidPW2Handler(true)
		checkValidFileHandler(true)
		checkValidPhoneHandler(true, true)
		// if (inputState.name === "" || inputState.id === "" || inputState.password === "") {
		// 	setAlarm("빈 칸을 모두 입력해주세요.")
		// 	return
		// }

		// if (KOREAN_ONLY.test(inputState.name) === false) {
		// 	setAlarm("이름은 한글만 입력 가능합니다.")
		// 	return
		// }

		// if (ENG_NUM_ONLY.test(inputState.password) === false || lengthCheck(inputState.password, 8, 16) === false) {
		// 	setAlarm("비밀번호는 영어, 숫자 조합으로 최소 8자부터 최대 16자까지 입력 가능합니다.")
		// 	return
		// }

		// if (!validState.id) {
		// 	setAlarm("아이디 중복 확인을 해주세요.")
		// 	return
		// }

		// if (!validState.password) {
		// 	setAlarm("비밀번호 재확인을 해주세요.")
		// 	return
		// }

		// setAlarm("")

		// 회원가입 요청
		// const response = await postTeacher({
		// 	name: inputState.name,
		// 	identity: inputState.id,
		// 	password: inputState.password,
		// 	checkedPassword: inputState.password,
		// })
	}

	const inputFileOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]
			setFile(() => file)
			setFileUrl(() => file.name)
		}
	}

	const renderFileInputUrl = (
		<div css={inputFileCSS({ fileUrl })}>
			{CLIP_ICON}
			{fileUrl ? fileUrl : "교사 인증서를 첨부해 주세요."}
		</div>
	)

	const messageGenerator = ({ message, isValid }: { message: string; isValid: boolean }) => {
		return <div css={messageCSS({ isValid })}>{message}</div>
	}

	return (
		<div css={wrapperCSS}>
			<div css={innerWrapperCSS}>
				<LoadImage src={"/assets/signup/illust.png"} alt={"signup_illust"} wrapperCss={imageWrapperCSS} dev={false} />

				{/* placeholder 멘트도 더 좋은게 있다면 수정해주세요 */}

				<div css={inputTitleCSS}>이름</div>
				<Input
					leftContent={NAME_ICON}
					theme={"default"}
					placeholder="이름 (한글만 입력해주세요)"
					onChange={(e) => {
						dispatchInput({ type: "CHANGE_NAME", value: e.target.value })
					}}
					customCss={inputCSS}
				/>
				{messageGenerator({ message: validMessageState.name, isValid: validState.name })}

				<div css={inputTitleCSS}>아이디</div>
				<Input
					leftContent={ID_ICON}
					rightContent={
						<Button
							theme={"RadialPositive"}
							width={"120px"}
							height={"42px"}
							text={"중복 확인"}
							fontSize={"var(--teacher-h5)"}
							onClick={() => {
								checkValidIDHandler(false, true)
							}}
						></Button>
					}
					theme={"default"}
					customCss={inputCSS}
					type="text"
					placeholder="영어와 숫자를 조합해 4자~10자 입력해주세요"
					onChange={(e) => {
						// dispatchValid({ type: "VALID_ID", value: false })

						dispatchInput({ type: "CHANGE_ID", value: e.target.value })
					}}
				/>
				{messageGenerator({ message: validMessageState.id, isValid: validState.id })}

				<div css={inputTitleCSS}>비밀번호</div>
				<Input
					leftContent={PASSWORD_ICON}
					theme={"default"}
					customCss={inputCSS}
					type="password"
					placeholder="영어와 숫자를 조합해 8자~16자 입력해주세요"
					onChange={(e) => {
						// dispatchValid({ type: "VALID_PW", value: false })

						dispatchInput({ type: "CHANGE_PW", value: e.target.value })
					}}
				/>
				{messageGenerator({ message: validMessageState.password, isValid: validState.password })}

				<div css={inputTitleCSS}>비밀번호 확인</div>
				<Input
					leftContent={PASSWORD2_ICON}
					theme={"default"}
					customCss={inputCSS}
					type="password"
					placeholder="비밀번호를 다시 입력해 주세요"
					onChange={(e) => {
						dispatchInput({ type: "CHANGE_PW2", value: e.target.value })
					}}
				/>
				{messageGenerator({ message: validMessageState.password2, isValid: validState.password2 })}

				<div css={inputTitleCSS}>교사 인증서</div>
				<Input
					leftContent={renderFileInputUrl}
					rightContent={
						<Button
							theme={"RadialPositive"}
							width={"120px"}
							height={"42px"}
							text={"파일 첨부"}
							fontSize={"var(--teacher-h5)"}
							onClick={() => {
								fileInputRef?.current?.click()
							}}
						></Button>
					}
					onChange={inputFileOnChangeHandler}
					theme={"default"}
					customCss={inputCSS}
					type="file"
					placeholder="교사 인증서"
					isFile={true}
					ref={fileInputRef}
				/>
				{messageGenerator({ message: validMessageState.file, isValid: validState.file })}

				<div css={inputTitleCSS}>휴대폰 번호</div>
				<Input
					leftContent={PHONE_ICON}
					rightContent={
						<Button
							theme={"RadialPositive"}
							width={"120px"}
							height={"42px"}
							text={"본인 인증"}
							fontSize={"var(--teacher-h5)"}
							onClick={() => {}}
						></Button>
					}
					theme={"default"}
					placeholder="휴대폰 번호를 입력해 주세요"
					onChange={(e) => {
						dispatchInput({ type: "CHANGE_PHONE", value: e.target.value })
					}}
					customCss={inputCSS}
				/>
				{messageGenerator({ message: validMessageState.phone, isValid: validState.phone })}

				<div css={footerWrapperCSS}>
					<Button
						theme={"highlighted"}
						width={"180px"}
						height={"64px"}
						text={"회원가입"}
						fontSize={"var(--teacher-h4)"}
						onClick={signUpHandler}
					></Button>
				</div>
			</div>
		</div>
	)
}

// 임시 값
const wrapperCSS = css`
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	width: 100%;
	/* height: 100%; */
	height: auto;
`

const innerWrapperCSS = css`
	width: 40vw;
	/* height: 40vh; */
	/* background-color: red; */
	display: flex;
	flex-direction: column;
	/* align-items: center; */
`

const inputTitleCSS = css`
	color: rgba(0, 20, 50, 0.5);
	margin-bottom: 10px;
	font-weight: 700;
`

const imageWrapperCSS = css`
	width: 100%;
	height: 23.3vw;
`

const inputCSS = css`
	width: 100%;
`

const inputFileCSS = ({ fileUrl }: { fileUrl: string }) => {
	return css`
		display: flex;
		/* width: 300px; */
		align-items: center;
		gap: 12px;
		color: ${fileUrl ? "rgba(0, 20, 50, 1)" : "rgba(0, 20, 50, 0.5)"};
		overflow: hidden;
		white-space: nowrap;
		width: 100%;
		font-size: var(--teacher-h5);
	`
}

const messageCSS = ({ isValid }: { isValid: boolean }) => {
	return css`
		font-size: var(--teacher-h6);
		color: ${isValid ? "rgba(0, 20, 50, 1)" : "var(--teacher-warning-color)"};
		margin: 8px 0px 28px 0px;
		height: 12px;
	`
}

const footerWrapperCSS = css`
	width: 100%;
	display: flex;
	justify-content: center;
	margin: 24px 0px 84px 0px;
`

export default signup
