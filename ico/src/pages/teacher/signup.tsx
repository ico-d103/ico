import { useReducer, useRef, useEffect } from "react"
import { css } from "@emotion/react"
import { postTeacherAPI } from "@/api/teacher/user/postTeacherAPI"
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
import { postDuplicationCheckAPI } from "@/api/common/postDuplicationCheckAPI"
import { useRouter } from "next/router"
import { postPhoneIdentifyAPI } from "@/api/teacher/user/postPhoneIdentifyAPI"
import { NUM_ONLY } from "@/util/regex"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

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
	state: {
		name: boolean
		id: boolean
		password: boolean
		password2: boolean
		phone: boolean
		file: boolean
		code: boolean
	},
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
		case "VALID_CODE":
			return { ...state, code: action.value }
		default:
			return state
	}
}

const validMessageReducer = (
	state: { name: string; id: string; password: string; password2: string; phone: string; file: string; code: string },
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
		case "VALID_CODE":
			return { ...state, code: action.value }
		default:
			return state
	}
}

function signup() {
	const formData = new FormData()

	const [validState, dispatchValid] = useReducer(validReducer, {
		name: false,
		id: false,
		password: false,
		password2: false,
		phone: false,
		file: false,
		code: false,
	})
	const [validMessageState, dispatchValidMessage] = useReducer(validMessageReducer, {
		name: "",
		id: "",
		password: "",
		password2: "",
		phone: "",
		file: "",
		code: "",
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
	const router = useRouter()
	const [certifyCode, setCertifyCode] = useState<string>("")
	const [inputCertifyCode, setInputCertifyCode] = useState<string>("")
	const noti = useNotification()

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
		if (file) checkValidFileHandler()
	}, [file])
	useEffect(() => {
		checkValidPhoneHandler()
	}, [inputState.phone])

	const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue = e.target.value

		if (!KOREAN_ONLY.test(inputValue)) {
			inputValue = inputValue.replace(/[^가-힣]/g, "")
			e.target.value = inputValue

			dispatchValidMessage({ type: "VALID_NAME", value: "이름은 한글만 입력 가능합니다." })
			dispatchValid({ type: "VALID_NAME", value: false })

			return
		}

		dispatchInput({ type: "CHANGE_NAME", value: e.target.value })
	}

	const checkValidNameHandler = (forSubmit = false) => {
		// 입력값이 없을 때
		if (inputState.name === "") {
			// 제출버튼을 눌렀다면
			if (forSubmit) {
				dispatchValidMessage({ type: "VALID_NAME", value: "이름을 입력해 주세요." })
			}
			dispatchValid({ type: "VALID_NAME", value: false })
			return
		}

		// 사용가능하다면
		dispatchValidMessage({ type: "VALID_NAME", value: "" })
		dispatchValid({ type: "VALID_NAME", value: true })
	}

	const checkValidIDHandler = (forSubmit = false, checkVerify = false) => {
		// 입력값이 없을 때
		if (inputState.id === "") {
			// 제출버튼을 눌렀다면
			if (forSubmit) {
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
		if (forSubmit) {
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
			postDuplicationCheckAPI({ body: { identity: inputState.id } }).then((res) => {
				if (res?.isDuplicated === false) {
					// 사용 가능하면
					dispatchValidMessage({ type: "VALID_ID", value: "사용 가능한 ID입니다." })
					dispatchValid({ type: "VALID_ID", value: true })
				} else {
					// 불가능하면
					dispatchValidMessage({ type: "VALID_ID", value: "이미 중복된 아이디, 혹은 사용 불가능한 아이디입니다." })
					dispatchValid({ type: "VALID_ID", value: false })
					return
				}
			})
		}
	}

	const checkValidPWHandler = (forSubmit = false) => {
		if (inputState.password === "") {
			if (forSubmit) {
				dispatchValidMessage({
					type: "VALID_PW",
					value: "비밀번호를 입력해 주세요.",
				})
			}
			dispatchValid({ type: "VALID_PW2", value: false })
			return
		}

		if (ENG_NUM_ONLY.test(inputState.password) === false || lengthCheck(inputState.password, 8, 16) === false) {
			dispatchValid({ type: "VALID_PW", value: false })
			dispatchValidMessage({
				type: "VALID_PW",
				value: "비밀번호는 영어, 숫자 조합으로 최소 8자부터 최대 16자까지 입력 가능합니다.",
			})
			return
		}

		dispatchValidMessage({ type: "VALID_PW", value: "사용 가능한 비밀번호입니다." })
		dispatchValid({ type: "VALID_PW", value: true })
	}

	const checkValidPW2Handler = (forSubmit = false) => {
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

	const checkValidFileHandler = (forSubmit = false) => {
		if (file === null) {
			dispatchValidMessage({ type: "VALID_FILE", value: "교사 인증서를 첨부해 주세요" })
			dispatchValid({ type: "VALID_FILE", value: false })
			return
		}

		dispatchValidMessage({ type: "VALID_FILE", value: "" })
		dispatchValid({ type: "VALID_FILE", value: true })
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

	const changePhoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue = e.target.value

		if (!NUM_ONLY.test(inputValue) || !PHONE_NUMBER_ONLY.test(inputValue)) {
			inputValue = inputValue.replace(/\D/g, "")
			e.target.value = inputValue

			dispatchValidMessage({
				type: "VALID_PHONE",
				value: "유효하지 않은 휴대폰 번호입니다. 올바른 번호를 입력해 주세요.",
			})
			dispatchValid({ type: "VALID_PHONE", value: false })

			return
		}

		dispatchInput({ type: "CHANGE_PHONE", value: e.target.value })
	}

	const certifyPhoneHandler = () => {
		if (inputState.phone === "" || inputState.phone.length < 10 || inputState.phone.length > 11) return

		postPhoneIdentifyAPI({ body: { phoneNum: inputState.phone } })
			.then((res) => {
				dispatchValidMessage({
					type: "VALID_PHONE",
					value: "휴대폰으로 받은 인증 코드를 아래에 입력해주세요",
				})

				setCertifyCode(res)
			})
			.catch((error) => {
				dispatchValidMessage({
					type: "VALID_PHONE",
					value: error.response.message,
				})
				dispatchValid({ type: "VALID_PHONE", value: false })
			})
	}

	const checkCertifyCodeHandler = () => {
		if (certifyCode != inputCertifyCode) {
			dispatchValidMessage({ type: "VALID_CODE", value: "코드가 일치하지 않습니다." })
			dispatchValid({ type: "VALID_CODE", value: false })
		} else {
			dispatchValidMessage({ type: "VALID_CODE", value: "코드가 일치합니다." })
			dispatchValid({ type: "VALID_CODE", value: true })
			dispatchValidMessage({ type: "VALID_PHONE", value: "본인 인증되었습니다." })
			dispatchValid({ type: "VALID_PHONE", value: true })
		}
	}

	const checkValidPhoneHandler = (forSubmit = false, duplicate = false) => {
		// 입력값이 없을 때
		if (inputState.phone === "") {
			// 제출버튼을 눌렀다면
			if (forSubmit) {
				if (duplicate) {
					dispatchValidMessage({ type: "VALID_PHONE", value: "이미 가입된 휴대폰 번호입니다." })
				} else {
					dispatchValidMessage({ type: "VALID_PHONE", value: "휴대폰 번호를 입력해 주세요." })
				}
				
			}
			dispatchValid({ type: "VALID_PHONE", value: false })
			return
		}

		dispatchValidMessage({ type: "VALID_PHONE", value: "" })
		dispatchValidMessage({ type: "VALID_CODE", value: "" })
	}

	const signUpHandler = () => {
		checkValidNameHandler(true)
		checkValidIDHandler(true)
		checkValidPWHandler(true)
		checkValidPW2Handler(true)
		checkValidFileHandler(true)
		checkValidPhoneHandler(true)

		file && formData.append("file", file)

		formData.append(
			"dto",
			new Blob(
				[
					JSON.stringify({
						name: inputState.name,
						identity: inputState.id,
						password: inputState.password,
						checkedPassword: inputState.password,
						phoneNum: inputState.phone,
					}),
				],
				{ type: "application/json" },
			),
		)

		// 유효성 검사를 모두 완료하면 회원가입 요청
		// if (
		// 	validState.name &&
		// 	validState.id &&
		// 	validState.password &&
		// 	validState.password2 &&
		// 	validState.file &&
		// 	validState.phone
		// ) {
			postTeacherAPI({ body: formData })
				.then(() => {
					noti({content: <NotiTemplate type={'ok'} content={"회원가입을 완료하였습니다."}/>, duration: 5000})
					router.push("/login")
				})
				.catch((error) => {
					// 회원가입 관련해서 어떤 error 코드가 존재하는지 몰라서 일단
					console.log(error)
					// noti({content: <NotiTemplate type={'alert'} content={error.response.data.message}/>, duration: 5000})
					if (error.response.data.code === '120') {

					}
				})
		// }
	}

	const messageGenerator = ({ message, isValid, visible }: { message: string; isValid: boolean; visible: boolean }) => {
		return <div css={messageCSS({ isValid, visible })}>{message}</div>
	}

	return (
		<div css={wrapperCSS}>
			<div css={innerWrapperCSS}>
				<LoadImage src={"/assets/signup/illust.png"} alt={"signup_illust"} customCSS={imageWrapperCSS} dev={false} />

				<div css={inputTitleCSS}>이름</div>
				<Input
					leftContent={NAME_ICON}
					theme={"default"}
					placeholder="이름 (한글만 입력해주세요)"
					onChange={changeNameHandler}
					customCss={inputCSS}
				/>
				{messageGenerator({ message: validMessageState.name, isValid: validState.name, visible: true })}

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
						dispatchInput({ type: "CHANGE_ID", value: e.target.value })
					}}
				/>
				{messageGenerator({ message: validMessageState.id, isValid: validState.id, visible: true })}

				<div css={inputTitleCSS}>비밀번호</div>
				<Input
					leftContent={PASSWORD_ICON}
					theme={"default"}
					customCss={inputCSS}
					type="password"
					placeholder="영어와 숫자를 조합해 8자~16자 입력해주세요"
					onChange={(e) => {
						dispatchInput({ type: "CHANGE_PW", value: e.target.value })
					}}
				/>
				{messageGenerator({ message: validMessageState.password, isValid: validState.password, visible: true })}

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
				{messageGenerator({ message: validMessageState.password2, isValid: validState.password2, visible: true })}

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
					accept="image/*"
					onChange={inputFileOnChangeHandler}
					theme={"default"}
					customCss={inputCSS}
					type="file"
					placeholder="교사 인증서"
					isFile={true}
					ref={fileInputRef}
				/>
				{messageGenerator({ message: validMessageState.file, isValid: validState.file, visible: true })}

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
							onClick={certifyPhoneHandler}
						></Button>
					}
					theme={"default"}
					placeholder="휴대폰 번호를 입력해 주세요"
					onChange={changePhoneHandler}
					customCss={inputCSS}
				/>
				{messageGenerator({ message: validMessageState.phone, isValid: validState.phone, visible: true })}
				<Input
					leftContent={PHONE_ICON}
					rightContent={
						<Button
							theme={"RadialPositive"}
							width={"120px"}
							height={"42px"}
							text={"인증 하기"}
							fontSize={"var(--teacher-h5)"}
							onClick={checkCertifyCodeHandler}
						></Button>
					}
					theme={"default"}
					placeholder="인증 코드를 입력해주세요"
					onChange={(e) => {
						setInputCertifyCode(e.target.value)
					}}
					customCss={hiddenInputCSS(certifyCode !== "")}
				/>
				{/* certifyCode === "" -> certifyCode !== "" 으로 변경 */}
				{messageGenerator({ message: validMessageState.code, isValid: validState.code, visible: certifyCode !== "" })}

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

const wrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: auto;
`

const innerWrapperCSS = css`
	display: flex;
	flex-direction: column;

	@media (max-width: 768px) {
		width: 95vw;
	}

	@media (min-width: 769px) {
		width: 40vw;
	}
`

const inputTitleCSS = css`
	color: rgba(0, 20, 50, 0.5);
	margin-bottom: 10px;
	font-weight: 700;
`

const imageWrapperCSS = css`
	width: 100%;
	@media (max-width: 768px) {
		height: 60vw;
	}

	@media (min-width: 769px) {
		height: 23.3vw;
	}
`

const inputCSS = css`
	width: 100%;
`

const hiddenInputCSS = (isOpen: boolean) => {
	return css`
		width: 100%;
		display: ${isOpen ? "block" : "none"};
	`
}

const inputFileCSS = ({ fileUrl }: { fileUrl: string }) => {
	return css`
		display: flex;
		align-items: center;
		gap: 12px;
		color: ${fileUrl ? "rgba(0, 20, 50, 1)" : "rgba(0, 20, 50, 0.5)"};
		overflow: hidden;
		white-space: nowrap;
		width: 100%;
		font-size: var(--teacher-h5);
	`
}

const messageCSS = ({ isValid, visible }: { isValid: boolean; visible: boolean }) => {
	return css`
		font-size: var(--teacher-h6);
		color: ${isValid ? "rgba(0, 20, 50, 1)" : "var(--teacher-warning-color)"};
		margin: 8px 0px 28px 0px;
		height: 12px;
		display: ${visible ? "block" : "none"};
	`
}

const footerWrapperCSS = css`
	width: 100%;
	display: flex;
	justify-content: center;
	margin: 24px 0px 84px 0px;
`

export default signup
