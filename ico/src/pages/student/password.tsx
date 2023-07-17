import { useReducer, useRef, useEffect } from "react"
import { css } from "@emotion/react"
import { postStudentAPI } from "@/api/student/user/postStudentAPI"
import { KOREAN_ONLY, ENG_NUM_ONLY, PHONE_NUMBER_ONLY } from "@/util/regex"
import { lengthCheck } from "@/util/lengthCheck"
import LoadImage from "@/components/common/LoadImage/LoadImage"
import Input from "@/components/common/Input/Input"
import Button from "@/components/common/Button/Button"
import { NAME_ICON, ID_ICON, PASSWORD_ICON, PASSWORD2_ICON } from "@/components/teacher/Signup/SignupIcons/SignupIcons"
import { putChangePasswordAPI } from "@/api/common/putChangePasswordAPI"
import { postDuplicationCheckAPI } from "@/api/common/postDuplicationCheckAPI"
import { useRouter } from "next/router"
import useGetTokenStatus from "@/hooks/useGetTokenStatus"
import useNavigate from "@/hooks/useNavigate"
import { putSkipChangePasswordAPI } from "@/api/common/putSkipChangePasswordAPI"

const inputReducer = (
	state: { password: string; password2: string },
	action: { type: string; value: string },
) => {
	switch (action.type) {
		case "CHANGE_PW":
			return { ...state, password: action.value }
		case "CHANGE_PW2":
			return { ...state, password2: action.value }
		default:
			return state
	}
}

const validReducer = (
	state: { password: boolean; password2: boolean },
	action: { type: string; value: boolean },
) => {
	switch (action.type) {
		case "VALID_PW":
			return { ...state, password: action.value }
		case "VALID_PW2":
			return { ...state, password2: action.value }
		default:
			return state
	}
}

const validMessageReducer = (
	state: { password: string; password2: string },
	action: { type: string; value: string },
) => {
	switch (action.type) {
		case "VALID_PW":
			return { ...state, password: action.value }
		case "VALID_PW2":
			return { ...state, password2: action.value }
		default:
			return state
	}
}

function password() {
	const [validState, dispatchValid] = useReducer(validReducer, {
		password: false,
		password2: false,
	})
	const [validMessageState, dispatchValidMessage] = useReducer(validMessageReducer, {
		password: "",
		password2: "",
	})
	const [inputState, dispatchInput] = useReducer(inputReducer, {
		password: "",
		password2: "",
	})

	const router = useRouter()
    const [getTokenStatus, setTokenStatus] = useGetTokenStatus()
    const navigate = useNavigate()

	useEffect(() => {
		checkValidPWHandler()
	}, [inputState.password])
	useEffect(() => {
		checkValidPW2Handler()
	}, [inputState.password2])





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

	const changePasswordHandler = async () => {
		checkValidPWHandler(true)
		checkValidPW2Handler(true)

		if (validState.password && validState.password2) {
			putChangePasswordAPI({
				body: {
					password: inputState.password,
					checkedPassword: inputState.password,
				},
			})
				.then(() => {
                    setTokenStatus({showMessage: false})
                    .then((res) => {
                        navigate('/student/home', 'bottomToTop')
                    })
					// router.push("/student/login")
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}

    const skipHandler = () => {
        putSkipChangePasswordAPI({})
        .then((res) => {
            setTokenStatus({showMessage: false})
            .then((res) => {
                navigate('/student/home', 'bottomToTop')
            })
        })
    }

	const messageGenerator = ({ message, isValid }: { message: string; isValid: boolean }) => {
		return <div css={messageCSS({ isValid })}>{message}</div>
	}

	return (
		<div css={wrapperCSS}>
			<div css={innerWrapperCSS}>
				<LoadImage src={"/assets/signup/illust.png"} alt={"signup_illust"} wrapperCss={imageWrapperCSS} dev={false} />

				{/* placeholder 멘트도 더 좋은게 있다면 수정해주세요 */}

				

				<div css={inputTitleCSS}>비밀번호</div>
				<Input
					leftContent={PASSWORD_ICON}
					theme={"mobileDefault"}
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
					theme={"mobileDefault"}
					customCss={inputCSS}
					type="password"
					placeholder="비밀번호를 다시 입력해 주세요"
					onChange={(e) => {
						dispatchInput({ type: "CHANGE_PW2", value: e.target.value })
					}}
				/>
				{messageGenerator({ message: validMessageState.password2, isValid: validState.password2 })}

				<div css={footerWrapperCSS}>
					<Button
						theme={"highlighted"}
						width={"180px"}
						height={"64px"}
						text={"비밀번호 변경"}
						fontSize={"var(--teacher-h4)"}
						onClick={changePasswordHandler}
					></Button>

                    <Button
						theme={"cancelDark"}
						width={"180px"}
						height={"64px"}
						text={"나중에 변경"}
						fontSize={"var(--teacher-h4)"}
						onClick={skipHandler}
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
	@media (max-width: 768px) {
		width: 95vw;
	}

	@media (min-width: 769px) {
		width: 40vw;
	}
	/* height: 40vh; */
	/* background-color: red; */
	display: flex;
	flex-direction: column;
	/* align-items: center; */
`

const inputTitleCSS = css`
	color: #9b6f00;
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
		margin: 8px 0px 16px 0px;
		height: 12px;
	`
}

const footerWrapperCSS = css`
	width: 100%;
	display: flex;
	justify-content: center;
	margin: 24px 0px 84px 0px;
    gap: 16px;
`

export default password
