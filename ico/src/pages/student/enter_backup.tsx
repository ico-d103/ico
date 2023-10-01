import { useState, useEffect, useRef } from "react"
import { css } from "@emotion/react"
import { postImmigrationAPI } from "@/api/student/user/postImmigrationAPI"
import { useRouter } from "next/router"

import Button from "@/components/common/Button/Button"
import LoadImage from "@/components/common/LoadImage/LoadImage"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import { ENG_NUM_ONLY } from "@/util/regex"
import { getTokenStatusAPI } from "@/api/common/getTokenStatusAPI"
import useGetTokenStatus from "@/hooks/useGetTokenStatus"
import { removeCookie } from "@/api/cookie"

function enter() {
	const router = useRouter()
	const [getTokenStatus, setTokenStatus] = useGetTokenStatus()
	const [phase, setPhase] = useState<number>(0)
	const [number, setNumber] = useState<number>(0)

	const passFirstPhaseHandler = () => {
		setPhase(() => 1)
	}

	const handleClassChange = (event: any) => {
		setNumber(event.target.value)
	}

	const inputRefs = useRef<(HTMLInputElement | null)[]>([])

	// const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {

	// 	const inputLength = e.target.value.length
	// 	const nextIndex = index + 1
	// 	const prevIndex = index - 1

	// 	if (inputLength === 1 && nextIndex < inputRefs.current.length) {
	// 		inputRefs.current[nextIndex]?.focus()
	// 	}
	// 	if (inputLength === 0 && prevIndex >= 0) {
	// 		inputRefs.current[prevIndex]?.focus()
	// 	}
	// }

	const handleChange = (e: any, index: number) => {
		const inputLength = e.target.value.length
		const nextIndex = index + 1
		const prevIndex = index - 1

		if (inputLength === 1 && nextIndex < inputRefs.current.length) {
			inputRefs.current[nextIndex]?.focus()
		}
		if (inputLength === 0 && prevIndex >= 0) {
			inputRefs.current[prevIndex]?.focus()
		}
	}

	let submitCode = ""

	const [code, setCode] = useState({
		code1: "",
		code2: "",
		code3: "",
		code4: "",
		code5: "",
	})

	const submitCodeFunction = async () => {
		postImmigrationAPI({
			body: {
				code: submitCode,
				number: number,
			},
		})
			.then((res) => {
				// console.log(res)

				setTokenStatus({ showMessage: false }).then((res) => {
					// console.log(res)
					// console.log("여기에 할일")
				})

				// router.push("/student/check")
			})
			.catch((error) => {
				console.log(error)
			})
	}

	useEffect(() => {
		if (code.code1 !== "" && code.code2 !== "" && code.code3 !== "" && code.code4 !== "" && code.code5 !== "") {
			submitCode = `${code.code1}${code.code2}${code.code3}${code.code4}${code.code5}`
			// console.log(submitCode)
		}
	}, [code])

	const renderInput = (code: Record<string, string>) => {
		const inputs = []

		for (let i = 1; i <= 5; i++) {
			const key = `code${i}`
			inputs.push(
				<input
					css={inputWrapperCSS}
					value={code[key]}
					onChange={(e) => {
						const inputValue = e.target.value
						const filteredValue = inputValue.toUpperCase().replace(/[^A-Z0-9]/g, "")

						if (e.target.value.length < 2) {
							setCode((prevCode) => {
								const updatedCode = {
									...prevCode,
									[key]: filteredValue,
								}
								return updatedCode
							})
							// handleChange(e, i - 1)
						}
					}}
					onKeyUp={(e) => {
						handleChange(e, i - 1)
					}}
					maxLength={1}
					ref={(el) => (inputRefs.current[i - 1] = el)}
					key={i}
				/>,
			)
		}

		return inputs
	}

	// useEffect(() => {
	// 	getTokenStatusAPI().then((res) => {
	// 		console.log(res.status)

	// 		if (res.status == "waiting") {
	// 			router.push("/student/check")
	// 		}

	// 		if (res.status == "require_refresh_token") {
	// 			router.push("student/check")
	// 		}

	// 		if (res.status == "approved") {
	// 			router.push("/student/home")
	// 		}
	// 	})
	// }, [])

	const signoutHandler = () => {
		removeCookie("Authorization", { path: "/" })
		setTokenStatus({ showMessage: false }).then((res) => {
			console.log("여기에 할일")
		})
		// navigate("/teacher/login")
	}

	return (
		<div css={enterWrapperCSS}>
			<div css={gridCSS({ phase })}>
				<div css={phaseWrapperCSS}>
					<div css={logoutWrapperCSS}>
						<div onClick={signoutHandler}>로그아웃</div>
					</div>
					<div>
						{/* <LoadImage
							src={"/assets/enter/enter_image.png"}
							alt={"signup_illust"}
							wrapperCss={imageWrapper}
							dev={false}
						/> */}
					</div>

					<div css={WrapperCSS}>
						<div css={innerWrapperCSS}>
							<div
								css={css`
									margin-top: 12px;
									font-weight: 700;
									font-size: 36px;
								`}
							>
								반 입장
							</div>
							<span>반에서의 번호를 입력해 주세요.</span>
							<input css={inputWrapperCSS} type={"number"} onChange={handleClassChange} />
							<Button
								text={"다음으로!"}
								fontSize={`18px`}
								width={"128px"}
								height={"64px"}
								theme={"mobileNormal"}
								onClick={passFirstPhaseHandler}
							/>
						</div>
					</div>
				</div>

				<div css={phaseWrapperCSS}>
					<div css={logoutWrapperCSS}>
						<div onClick={signoutHandler}>로그아웃</div>
					</div>
					<div css={WrapperCSS}>
						<div
							css={css`
								margin-top: 12px;
								font-weight: 700;
								font-size: 8vw;
							`}
						>
							반 입장
						</div>
						<div
							css={css`
								margin-top: 12px;
								font-weight: 500;
								font-size: 5vw;
							`}
						>
							코드를 입력해주세요.
						</div>
						<div css={bottomWrapperCSS}>
							<div css={inputOuterWrapperCSS}>{renderInput(code)}</div>

							<Button
								text={"입장할래요!"}
								fontSize={`5vw`}
								width={"60%"}
								height={"15vw"}
								theme={"mobileNormal"}
								onClick={submitCodeFunction}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const enterWrapperCSS = css`
	width: 100%;
	/* height: 100% inherit; */
	min-height: 100%;
	overflow: hidden;
	flex: 1;
	display: flex;
`

const gridCSS = ({ phase }: { phase: number }) => {
	return css`
		/* height: 100%; */
		/* height: auto; */
		display: grid;
		grid-template-columns: 100% 100%;
		/* width: 200vw; */
		/* height: 1; */
		/* background-color: blue; */
		transition-property: transform;
		transition-duration: 0.5s;
		flex: 1;
		transform: translate(calc(-${phase} * 100%), 0px);
	`
}

const phaseWrapperCSS = css`
	max-width: 100vw;
	min-height: 100%;
	/* height: 100%; */
	display: flex;
	flex: 1;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;

	/* justify-content: space-between; */
	/* background-color: red; */

	/* justify-content: center; */
	/* align-items: center; */
`

const WrapperCSS = css`
	flex: 1;
	display: grid;

	/* padding-bottom: 36px; */
`

const innerWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 100%;

	padding: 24px;
	box-sizing: border-box;
`

const imageWrapper = css`
	margin-top: 8px;
	width: 70vw;
	height: 30vw;
	overflow: visible;
`

const inputOuterWrapperCSS = css`
	height: 22vw;
	margin: 24px 0px 24px 0px;
`
const inputWrapperCSS = css`
	width: 84px;
	height: 96px;
	border: none;
	background-color: rgba(0, 0, 0, 0);
	border-bottom: 3px solid var(--student-main-color-4);
	margin: 0px 4px 0px 4px;
	font-size: 48px;
	text-align: center;
	transition-property: border-bottom background-color;
	transition-duration: 0.3s;

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	& :focus {
		outline: none;
		background-color: var(--student-main-color-2);
		border-bottom: 4px solid var(--student-main-color-5);
	}
`

const bottomWrapperCSS = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const logoutWrapperCSS = css`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	padding: 16px;
	position: absolute;
	z-index: 200;
`
export default enter
