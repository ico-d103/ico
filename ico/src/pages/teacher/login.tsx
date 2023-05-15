import { useState, useReducer } from "react"
import { css } from "@emotion/react"
import Input from "@/components/common/Input/Input"
import { ID_ICON, PASSWORD2_ICON } from "@/components/teacher/Signup/SignupIcons/SignupIcons"
import Button from "@/components/common/Button/Button"
import { useRouter } from "next/router"
import { postLoginAPI } from "@/api/common/postLoginAPI"
import { setCookie } from "@/api/cookie"
import { getNationAPI } from "@/api/teacher/class/getNationAPI"
import { getTokenStatusAPI } from "@/api/common/getTokenStatusAPI"
import useCompHandler from "@/hooks/useCompHandler"
import Modal from "@/components/common/Modal/Modal"
import ModalContent from "@/components/common/Modal/ModalContent"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

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
	const noti = useNotification()
	const [openComp, closeComp, compState] = useCompHandler()
	const [alarm, setAlarm] = useState<string>("")
	const [inputState, dispatchInput] = useReducer(inputReducer, initialState)
	const [isDenied, setIsDenied] = useState<boolean>(true)
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
				setCookie("Authorization", res, { path: "/", maxAge: 30 * 24 * 60 * 60 })

				getTokenStatusAPI().then((res) => {
					console.log("res : ", res)

					if (res.role === "TEACHER") {
						// 교사인증 O -> nation ID가 있을 때
						if (res.status === "approved") {
							router.push("/teacher/class/students")
						}
						// 교사인증 O -> nation ID가 없을 때
						if (res.status === "require_create_nation") {
							router.push("/teacher/create")
						}
						// 교사인증 X -> 인증 대기 상태
						if (res.status === "waiting") {
							// 인증 대기 모달 띄우기
							setIsDenied(false)
							openComp()
						}
						// 교사인증 X -> 인증 거부 상태
						if (res.status === "require_submit_certification") {
							// 인증 거부 모달 띄우고 정보수정 페이지로 이동시키기
							setIsDenied(true)
							openComp()
						}
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

	const modifyTeacherInfoHandler = () => {
		// 교사 정보 수정페이지로 이동
		noti({
			content: <NotiTemplate type={"alert"} content={`준비 중인 서비스입니다.`} />,
			duration: 3000,
		})
	}

	return (
		<>
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
							type="text"
							placeholder="아이디를 입력해 주세요."
							onChange={(e) => dispatchInput({ type: "CHANGE_ID", value: e.target.value })}
						/>
						<Input
							customCss={inputCSS}
							leftContent={PASSWORD2_ICON}
							theme={"default"}
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
			<Modal
				compState={compState}
				closeComp={closeComp}
				transition={"scale"}
				content={
					<ModalContent
						width={"350px"}
						icon={<UseAnimations animation={alertCircle} size={56} />}
						title={isDenied ? `교사 인증 실패` : `교사 인증 대기중`}
						titleSize={"var(--teacher-h2)"}
						content={
							isDenied ? (
								<Button
									text={"인증서 수정하기"}
									fontSize={"var(--student-h3)"}
									width={"130px"}
									theme={"mobileSoft2"}
									onClick={modifyTeacherInfoHandler}
								/>
							) : (
								<Button
									text={"확인"}
									fontSize={"var(--student-h3)"}
									width={"130px"}
									theme={"mobileCancel"}
									onClick={closeComp}
								/>
							)
						}
					/>
				}
			/>
		</>
	)
}

const wrapperCSS = css`
	display: flex;
	width: 100%;
	height: 100%;

	@media (max-width: 1440px) {
		flex-direction: column;
	}
`

const loginSectionCSS = css`
	@media (max-width: 1440px) {
		width: 100%;
		flex: 1;
		margin: 36px 0px 36px 0px;
	}
	@media (min-width: 1441px) {
		height: 100%;
		width: 25vw;
	}

	min-width: 400px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const imageSectionCSS = css`
	overflow: hidden;
	box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);

	@media (min-width: 1441px) {
		flex: 1;
	}
`

const imageWrapperCSS = css`
	width: 100%;
	height: auto;
`

const loginFormCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 24px;
	width: 100%;
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
