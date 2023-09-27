import React, { useState, useEffect, useReducer } from "react"
import { css } from "@emotion/react"
import { useRouter } from "next/router"
import Input from "@/components/common/Input/Input"
import Button from "@/components/common/Button/Button"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"
import { KOREAN_ONLY, GRADE_ONLY, CLASS_ONLY } from "@/util/regex"
import LoadImage from "@/components/common/LoadImage/LoadImage"
import { postCreateNationAPI } from "@/api/teacher/user/postCreateNationAPI"
import useGetTokenStatus from "@/hooks/useGetTokenStatus"
import { removeCookie } from "@/api/cookie"

const inputReducer = (
	state: { school: string; grade: string; class: string; nation: string; currency: string },
	action: { type: string; value: string },
) => {
	switch (action.type) {
		case "CHANGE_SCHOOL_NAME":
			return { ...state, school: action.value }
		case "CHANGE_GRADE":
			return { ...state, grade: action.value }
		case "CHANGE_CLASS":
			return { ...state, class: action.value }
		case "CHANGE_NATION":
			return { ...state, nation: action.value }
		case "CHANGE_CURRENCY":
			return { ...state, currency: action.value }
		default:
			return state
	}
}

const validReducer = (
	state: { school: boolean; grade: boolean; class: boolean; nation: boolean; currency: boolean },
	action: { type: string; value: boolean },
) => {
	switch (action.type) {
		case "VALID_SCHOOL_NAME":
			return { ...state, school: action.value }
		case "VALID_GRADE":
			return { ...state, grade: action.value }
		case "VALID_CLASS":
			return { ...state, class: action.value }
		case "VALID_NATION":
			return { ...state, nation: action.value }
		case "VALID_CURRENCY":
			return { ...state, currency: action.value }
		default:
			return state
	}
}

const validMessageReducer = (
	state: { school: string; grade: string; class: string; nation: string; currency: string },
	action: { type: string; value: string },
) => {
	switch (action.type) {
		case "VALID_SCHOOL_NAME":
			return { ...state, school: action.value }
		case "VALID_GRADE":
			return { ...state, grade: action.value }
		case "VALID_CLASS":
			return { ...state, class: action.value }
		case "VALID_NATION":
			return { ...state, nation: action.value }
		case "VALID_CURRENCY":
			return { ...state, currency: action.value }
		default:
			return state
	}
}

function create() {
	const [phase, setPhase] = useState<number>(0)
	const router = useRouter()
	const [getTokenStatus, setTokenStatus] = useGetTokenStatus()

	useEffect(() => {
		if (phase === 2) {
			setTimeout(() => {
				setTokenStatus({showMessage: false})
				// router.push("/teacher/class/students")
			}, 2000)
		}
	}, [phase])

	const [validState, dispatchValid] = useReducer(validReducer, {
		school: false,
		grade: false,
		class: false,
		nation: false,
		currency: false,
	})
	const [validMessageState, dispatchValidMessage] = useReducer(validMessageReducer, {
		school: "",
		grade: "",
		class: "",
		nation: "",
		currency: "",
	})
	const [inputState, dispatchInput] = useReducer(inputReducer, {
		school: "",
		grade: "",
		class: "",
		nation: "",
		currency: "",
	})

	useEffect(() => {
		checkValidSchoolHandler()
	}, [inputState.school])
	useEffect(() => {
		checkValidGradeHandler()
	}, [inputState.grade])
	useEffect(() => {
		checkValidClassHandler()
	}, [inputState.class])
	useEffect(() => {
		checkValidNationHandler()
	}, [inputState.nation])
	useEffect(() => {
		checkValidCurrencyHandler()
	}, [inputState.currency])

	const checkValidSchoolHandler = async (forSumbit = false) => {
		if (inputState.school === "") {
			if (forSumbit) {
				dispatchValidMessage({ type: "VALID_SCHOOL_NAME", value: "학교명을 입력해 주세요." })
			} else {
				dispatchValidMessage({ type: "VALID_SCHOOL_NAME", value: "" })
			}
			dispatchValid({ type: "VALID_SCHOOL_NAME", value: false })
			return
		}
		if (KOREAN_ONLY.test(inputState.school) === false) {
			dispatchValidMessage({ type: "VALID_SCHOOL_NAME", value: "학교명은 한글만 입력 가능합니다." })
			dispatchValid({ type: "VALID_SCHOOL_NAME", value: false })
			return
		}

		dispatchValidMessage({ type: "VALID_SCHOOL_NAME", value: "" })
		dispatchValid({ type: "VALID_SCHOOL_NAME", value: true })
	}

	const checkValidGradeHandler = async (forSumbit = false) => {
		if (inputState.grade === "") {
			if (forSumbit) {
				dispatchValidMessage({ type: "VALID_GRADE", value: "학년을 입력해 주세요." })
			} else {
				dispatchValidMessage({ type: "VALID_GRADE", value: "" })
			}
			dispatchValid({ type: "VALID_GRADE", value: false })
			return
		}
		if (GRADE_ONLY.test(inputState.grade) === false) {
			dispatchValidMessage({ type: "VALID_GRADE", value: "학년은 한자리 1~6 사이의 숫자만 입력 가능합니다." })
			dispatchValid({ type: "VALID_GRADE", value: false })
			return
		}

		dispatchValidMessage({ type: "VALID_GRADE", value: "" })
		dispatchValid({ type: "VALID_GRADE", value: true })
	}

	const checkValidClassHandler = async (forSumbit = false) => {
		if (inputState.class === "") {
			if (forSumbit) {
				dispatchValidMessage({ type: "VALID_CLASS", value: "반을 입력해 주세요." })
			} else {
				dispatchValidMessage({ type: "VALID_CLASS", value: "" })
			}
			dispatchValid({ type: "VALID_CLASS", value: false })
			return
		}
		if (CLASS_ONLY.test(inputState.class) === false) {
			dispatchValidMessage({ type: "VALID_CLASS", value: "반은 최대 두자리까지 숫자만 입력 가능합니다." })
			dispatchValid({ type: "VALID_CLASS", value: false })
			return
		}

		dispatchValidMessage({ type: "VALID_CLASS", value: "" })
		dispatchValid({ type: "VALID_CLASS", value: true })
	}

	const checkValidNationHandler = async (forSumbit = false) => {
		if (inputState.nation === "") {
			if (forSumbit) {
				dispatchValidMessage({ type: "VALID_NATION", value: "나라 이름을 입력해 주세요." })
			} else {
				dispatchValidMessage({ type: "VALID_NATION", value: "" })
			}
			dispatchValid({ type: "VALID_NATION", value: false })
			return
		}
		if (KOREAN_ONLY.test(inputState.nation) === false || inputState.nation.length > 6) {
			dispatchValidMessage({ type: "VALID_NATION", value: "나라 이름은 한글로 최대 6글자 가능합니다." })
			dispatchValid({ type: "VALID_NATION", value: false })
			return
		}

		dispatchValidMessage({ type: "VALID_NATION", value: "" })
		dispatchValid({ type: "VALID_NATION", value: true })
	}

	const checkValidCurrencyHandler = async (forSumbit = false) => {
		if (inputState.currency === "") {
			if (forSumbit) {
				dispatchValidMessage({ type: "VALID_CURRENCY", value: "화폐 단위를 입력해 주세요." })
			} else {
				dispatchValidMessage({ type: "VALID_CURRENCY", value: "" })
			}
			dispatchValid({ type: "VALID_CURRENCY", value: false })
			return
		}
		if (KOREAN_ONLY.test(inputState.currency) === false || inputState.currency.length > 3) {
			dispatchValidMessage({ type: "VALID_CURRENCY", value: "화폐 단위는 한글로 최대 3글자 입력 가능합니다." })
			dispatchValid({ type: "VALID_CURRENCY", value: false })
			return
		}

		dispatchValidMessage({ type: "VALID_CURRENCY", value: "" })
		dispatchValid({ type: "VALID_CURRENCY", value: true })
	}

	const goPrevPhaseHandler = () => {
		if (phase !== 0) {
			setPhase((prev) => prev - 1)
		}
		
	}

	const passFirstPhaseHandler = () => {
		if (validState.school && validState.grade && validState.class) {
			setPhase(() => 1)
		} else {
			checkValidSchoolHandler(true)
			checkValidGradeHandler(true)
			checkValidClassHandler(true)
		}
	}

	const passSecondPhaseHandler = () => {
		if (validState.nation && validState.currency) {
			postCreateNationAPI({
				body: {
					school: inputState.school,
					grade: Number(inputState.grade),
					room: Number(inputState.class),
					title: inputState.nation,
					currency: inputState.currency,
				},
			})
				.then((res) => {
					setPhase(() => 2)
				})
				.catch((err) => {
					console.log(err)
				})
		} else {
			checkValidNationHandler(true)
			checkValidCurrencyHandler(true)
		}
	}

	const signoutHandler = () => {
		removeCookie("Authorization", { path: "/" })
		setTokenStatus({ showMessage: false }).then((res) => {

		})
		// navigate("/teacher/login")
	}

	const messageGenerator = ({ message, isValid }: { message: string; isValid: boolean }) => {
		return <div css={messageCSS({ isValid })}>{message}</div>
	}

	return (
		<div css={createWrapperCSS}>
			<div css={gridCSS({ phase })}>
				<div css={phaseWrapperCSS}>
				
					<LoadImage
						src={"/assets/create/create_illust_11.png"}
						alt={"signup_illust"}
						customCSS={imageWrapperCSS1}
						dev={false}
					/>
					<div css={inputWrapperCSS}>
						<div css={inputTitleCSS}>학교명</div>
						<Input
							customCss={inputCSS}
							theme={"default"}
							// customCss={inputCSS}
							type="text"
							placeholder="예) 부산송수초등학교"
							onChange={(e) => {
								dispatchInput({ type: "CHANGE_SCHOOL_NAME", value: e.target.value })
							}}
						/>
						{messageGenerator({ message: validMessageState.school, isValid: validState.school })}
					</div>

					<div css={inputWrapperCSS}>
						<div css={inputTitleCSS}>학년</div>
						<Input
							customCss={inputCSS}
							theme={"default"}
							// customCss={inputCSS}
							type="text"
							placeholder="숫자만 입력해주세요."
							onChange={(e) => {
								dispatchInput({ type: "CHANGE_GRADE", value: e.target.value })
							}}
						/>
						{messageGenerator({ message: validMessageState.grade, isValid: validState.grade })}
					</div>

					<div css={inputWrapperCSS}>
						<div css={inputTitleCSS}>반</div>
						<Input
							customCss={inputCSS}
							theme={"default"}
							// customCss={inputCSS}
							type="text"
							placeholder="숫자만 입력해주세요."
							onChange={(e) => {
								dispatchInput({ type: "CHANGE_CLASS", value: e.target.value })
							}}
						/>
						{messageGenerator({ message: validMessageState.class, isValid: validState.class })}
					</div>

					<div css={buttonWrapperCSS}>
					
						<Button
							theme={"highlighted"}
							width={"300px"}
							height={"42px"}
							text={"다음"}
							fontSize={"var(--teacher-h5)"}
							onClick={passFirstPhaseHandler}
						></Button>
						<Button
							theme={"cancelDark"}
							width={"300px"}
							height={"42px"}
							text={"로그아웃"}
							fontSize={"var(--teacher-h5)"}
							onClick={signoutHandler}
						></Button>
						
					</div>
				</div>
				<div css={phaseWrapperCSS}>
					<LoadImage
						src={"/assets/create/create_illust_22.png"}
						alt={"signup_illust"}
						customCSS={imageWrapperCSS2}
						dev={false}
					/>
					<div css={inputWrapperCSS}>
						<div css={inputTitleCSS}>나라 이름</div>
						<Input
							customCss={inputCSS}
							theme={"default"}
							// customCss={inputCSS}
							type="text"
							placeholder="나라 이름을 입력해 주세요."
							onChange={(e) => {
								dispatchInput({ type: "CHANGE_NATION", value: e.target.value })
							}}
						/>
						{messageGenerator({ message: validMessageState.nation, isValid: validState.nation })}
					</div>

					<div css={inputWrapperCSS}>
						<div css={inputTitleCSS}>화폐 단위</div>
						<Input
							customCss={inputCSS}
							theme={"default"}
							// customCss={inputCSS}
							type="text"
							placeholder="화폐 단위를 입력해 주세요."
							onChange={(e) => {
								dispatchInput({ type: "CHANGE_CURRENCY", value: e.target.value })
							}}
						/>
						{messageGenerator({ message: validMessageState.currency, isValid: validState.currency })}
					</div>

					<div css={buttonWrapperCSS}>
						<Button
							theme={"highlighted"}
							width={"300px"}
							height={"42px"}
							text={"다음"}
							fontSize={"var(--teacher-h5)"}
							onClick={passSecondPhaseHandler}
						></Button>
						<Button
							theme={"cancelDark"}
							width={"300px"}
							height={"42px"}
							text={"이전"}
							fontSize={"var(--teacher-h5)"}
							onClick={goPrevPhaseHandler}
						></Button>
					</div>
				</div>
				<div css={phaseWrapperCSS}>
					<UseAnimations animation={alertCircle} size={256} />
					<div css={successLabelCSS}>학급 경제가 성공적으로 생성되었습니다!</div>
					<div css={successSubLabelCSS}>잠시 후, 학급 관리 페이지로 리다이렉트됩니다!</div>
				</div>
			</div>
		</div>
	)
}

const logoutWrapperCSS = css`
	width: 300px;
	margin-bottom: 16px;
	display: flex;
	justify-content: flex-end;
`

const logoutCSS = css`
	cursor: pointer;
	font-size: 14px;;
	color: rgba(0, 0, 0, 0.6);
	transition-property: color;
	transition-duration: 0.3s;
	&:hover {
		color: rgba(0, 0, 0, 1);
	}
`

const createWrapperCSS = css`
	width: 100%;
	height: 100%;
	overflow: hidden;
`

const gridCSS = ({ phase }: { phase: number }) => {
	return css`
		height: 100%;
		display: grid;
		grid-template-columns: 100% 100% 100%;
		transition-property: transform;
		transition-duration: 0.5s;

		transform: translate(calc(-${phase} * 100%), 0px);
	`
}

const phaseWrapperCSS = css`
	width: 100%;
	height: 100%;
	/* background-color: red; */
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const inputCSS = css`
	width: 300px;
`

const inputTitleCSS = css`
	color: rgba(0, 20, 50, 0.5);
	margin-bottom: 10px;
	font-weight: 700;
`

const inputWrapperCSS = css``

const buttonWrapperCSS = css`
	margin-top: 16px;
	display: flex;
	flex-direction: column;
	gap: 8px;
`

const successLabelCSS = css`
	font-size: 36px;
	margin-bottom: 24px;
`

const successSubLabelCSS = css`
	font-size: 24px;
`

const messageCSS = ({ isValid }: { isValid: boolean }) => {
	return css`
		font-size: var(--teacher-h6);
		color: ${isValid ? "rgba(0, 20, 50, 1)" : "var(--teacher-warning-color)"};
		margin: 8px 0px 14px 0px;
		height: 12px;
	`
}

const imageWrapperCSS1 = css`
	width: 100%;
	height: 15vw;
	margin-bottom: 36px;
`

const imageWrapperCSS2 = css`
	width: 100%;
	height: 24vw;
	margin-bottom: 36px;
`

export default create
