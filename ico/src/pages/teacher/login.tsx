import { useState, useReducer } from "react"
import { css } from "@emotion/react"
import Input from "@/components/common/Input/Input"
import { ID_ICON, PASSWORD2_ICON } from "@/components/teacher/Signup/SignupIcons/SignupIcons"
import Button from "@/components/common/Button/Button"
import { useRouter } from "next/router"
import { postLoginAPI } from "@/api/common/postLoginAPI"
import { setCookie } from "@/api/cookie"
import { getNationAPI } from "@/api/teacher/class/getNationAPI"

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
	const router = useRouter()

	const loginHandler = () => {
		if (inputState.id === "" || inputState.password === "") {
			setAlarm("빈 칸을 모두 입력해주세요.")
			return
		}

		setAlarm("")

		// 로그인 요청
		postLoginAPI({
			body: { identity: inputState.id, password: inputState.password },
		})
			.then((res) => {
				// 토큰 뿐만 아니라 학생인지 선생인지도 저장하기
				setCookie("Authorization", res)
				// setCookie("Authorization", res, { path: "/", maxAge: 30 * 24 * 60 * 60 })

				// 교사가 생성한 나라 조회
				getNationAPI()
					.then((res) => {
						// 반이 있다면 반 페이지로 이동
						localStorage.setItem("nation", res.title)
						localStorage.setItem("currency", res.currency)
						router.push("/teacher/class/students")
					})
					.catch((error) => {
						// 반이 없다면 반 생성 페이지로 이동
						if (error.response.data.code === "202") {
							router.push("/teacher/create")
						}
					})
			})
			.catch((error) => {
				setAlarm(error.response.data.message)
			})
	}

	const navToSignup = () => {
		router.push("/teacher/signup")
	}

	const handleKeyDown = (event: any) => {
		if (event.key === "Enter") {
			loginHandler()
		}
	}

	return (
		<div css={wrapperCSS}>
			<div css={imageSectionCSS}>
				<img src={"/assets/login/login_illust_2.jpg"} alt={"signup_illust"} css={imageWrapperCSS} />
			</div>
			<div css={loginSectionCSS}>
				<div css={loginHeaderCSS}>
					<div css={headerLabelCSS}>아이코에 오신 것을</div>
					<div css={headerLabelCSS}>환영합니다!</div>
				</div>
				<div css={loginFormCSS}>
					<div css={alarmCSS}>{alarm}</div>
					<Input
						customCss={inputCSS}
						leftContent={ID_ICON}
						theme={"default"}
						// customCss={inputCSS}
						type="text"
						placeholder="아이디를 입력해 주세요."
						onChange={(e) => dispatchInput({ type: "CHANGE_ID", value: e.target.value })}
					/>
					<Input
						customCss={inputCSS}
						leftContent={PASSWORD2_ICON}
						theme={"default"}
						// customCss={inputCSS}
						type="password"
						placeholder="비밀번호를 입력해주세요."
						onChange={(e) => dispatchInput({ type: "CHANGE_PW", value: e.target.value })}
						onKeyDown={handleKeyDown}
					/>

					<div css={signupLabelCSS}>
						<span>계정이 없으신가요?&nbsp;</span>
						<span css={signupCSS} onClick={navToSignup}>
							회원가입
						</span>
					</div>

					<Button
						theme={"highlighted"}
						width={"300px"}
						height={"42px"}
						text={"로그인"}
						fontSize={"var(--teacher-h5)"}
						onClick={loginHandler}
					></Button>
				</div>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	display: flex;

	/* flex-direction: column; */
	width: 100%;
	height: 100%;
	/* background-color: red; */

	@media (max-width: 1440px) {
		flex-direction: column;
	}
`

const loginSectionCSS = css`
	@media (max-width: 1440px) {
		/* height: 40%; */
		width: 100%;
		flex: 1;
		margin: 36px 0px 36px 0px;
	}
	@media (min-width: 1441px) {
		height: 100%;
		width: 25vw;
	}

	min-width: 400px;
	/* background-color: red; */
	/* box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2); */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	/* background-color: red; */
`

const imageSectionCSS = css`
	/* height: 100vh; */
	overflow: hidden;
	box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);

	/* @media (max-width: 1280px) {
		display: flex;
		justify-content: center;
	} */

	@media (min-width: 1441px) {
		flex: 1;
	}
`

const imageWrapperCSS = css`
	width: 100%;
	height: auto;
	/* @media (max-width: 576px) {
		width: 100%;
		height: auto;
	}
	@media (min-width: 577px) {
		width: 100%;
		height: auto;
	} */
`

const loginFormCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 24px;
	width: 100%;
	/* background-color: blue; */
`

const inputCSS = css`
	width: 300px;
`

const loginHeaderCSS = css`
	margin-bottom: 4px;
	font-size: var(--teacher-h1);
	display: flex;
	flex-direction: column;
	align-items: center;
`

const headerLabelCSS = css`
	margin-bottom: 12px;
`

const signupLabelCSS = css`
	display: flex;

	color: rgba(0, 20, 50, 0.5);
`

const signupCSS = css`
	color: rgba(0, 20, 50, 1);
	cursor: pointer;

	transition-property: color;
	transition-duration: 0.3s;

	&:hover {
		color: rgba(0, 20, 50, 0.7);
	}
`

const alarmCSS = css`
	font-size: var(--teacher-h5);
	color: var(--teacher-warning-color);
`

export default login
