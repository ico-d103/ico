import { useState, useEffect, useRef } from "react"
import { css } from "@emotion/react"
import { postImmigrationAPI } from "@/api/student/user/postImmigrationAPI"

import Button from "@/components/common/Button/Button"
import LoadImage from "@/components/common/LoadImage/LoadImage"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import { ENG_NUM_ONLY } from "@/util/regex"

function enter() {
	const [phase, setPhase] = useState<number>(0)

	const passFirstPhaseHandler = () => {
		setPhase(() => 1)
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
		console.log(e)
	
		

		

		
		const nextIndex = index + 1
		const prevIndex = index - 1

		if (e.keyCode === 8) {
			if (prevIndex >= -1) {
				
				
					setCode((prevCode:any) => {
						const updatedCode = {
							...prevCode,
							[`code${index + 1}`]: "",
						}
						return updatedCode
					})
				
					inputRefs.current[prevIndex]?.focus()
		
				


				
			}
		} else {
			if (e.key.length > 1) {
				return
			}
		const inputValue = e.key.toUpperCase();
		const filteredValue = inputValue.replace(/[^A-Z0-9]/g, '');
		
		if (e.target.value.length < 2) {

			if (code[`code${index + 1}`].length === 0) {
			setCode((prevCode:any) => {
				const updatedCode = {
					...prevCode,
					[`code${index + 1}`]: filteredValue,
				}
				return updatedCode
			})

			if (filteredValue.length === 0) {
				return
			}
			if (nextIndex < inputRefs.current.length) {
				inputRefs.current[nextIndex]?.focus()
			}
		} else {
			setCode((prevCode:any) => {
				const updatedCode = {
					...prevCode,
					[`code${index + 2}`]: filteredValue,
				}
				return updatedCode
			})

			if (filteredValue.length === 0) {
				return
			}
			if (nextIndex < inputRefs.current.length) {
				inputRefs.current[nextIndex + 1]?.focus()
			}
		}
			// handleChange(e, i - 1)
		}


			
		}
		
		
	}


	let submitCode = ""

	const [code, setCode] = useState<any>({
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
			},
		})
			.then((res) => {
				console.log(res)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	useEffect(() => {
		if (code.code1 !== "" && code.code2 !== "" && code.code3 !== "" && code.code4 !== "" && code.code5 !== "") {
			submitCode = `${code.code1}${code.code2}${code.code3}${code.code4}${code.code5}`
			console.log(submitCode)
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
						// const inputValue = e.target.value;
    					// const filteredValue = inputValue.toUpperCase().replace(/[^A-Z0-9]/g, '');
						
						// if (e.target.value.length < 2) {
						// 	setCode((prevCode) => {
						// 		const updatedCode = {
						// 			...prevCode,
						// 			[key]: filteredValue,
						// 		}
						// 		return updatedCode
						// 	})
						// 	// handleChange(e, i - 1)
						// }
						
						
					}}
					onKeyUp={(e) => {handleChange(e, i - 1)}}
					maxLength={1}
					ref={(el) => (inputRefs.current[i - 1] = el)}
					key={i}
				/>,
			)
		}

		return inputs
	}

	return (
		<div css={enterWrapperCSS}>
			<div css={gridCSS({ phase })}>
				{/* <div css={phaseWrapperCSS}>
					<PageHeader title={"우리반 입장하기"} />
					<Button
						text={"입장 코드를 선생님에게 물어보세요"}
						fontSize={`var(--teacher-h5)`}
						width={"100%"}
						theme={"mobileNormal"}
						onClick={passFirstPhaseHandler}
					/>
				</div> */}

				<div css={phaseWrapperCSS}>
					<PageHeader title={"우리반 입장하기"} />
					<div css={WrapperCSS}>
						<LoadImage
							src={"/assets/enter/enter_image.png"}
							alt={"signup_illust"}
							wrapperCss={imageWrapper}
							dev={false}
						/>
						<div css={css`margin-top: 24px; font-weight: 600; font-size: 6vw;`}>반 입장 코드를 입력해주세요.</div>

						<div css={inputOuterWrapperCSS}>{renderInput(code)}</div>

						<Button
							text={"입장할래요!"}
							fontSize={`4vw`}
							width={"40%"}
							height={"10vw"}
							theme={"mobileNormal"}
							onClick={submitCodeFunction}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

const enterWrapperCSS = css`
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
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	/* align-items: center; */
`

const WrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const imageWrapper = css`
	width: 100%;
	height: 50vw;
`

const inputOuterWrapperCSS = css`
	height: 22vw;
	margin: 48px 0px;
`
const inputWrapperCSS = css`
	width: 15vw;
	height: 21vw;
	border: none;
	background-color: rgba(0, 0, 0, 0);
	border-bottom: 3px solid var(--student-main-color-4);
	margin: 0px 4px 0px 4px;
	font-size: 10vw;
	text-align: center;
	transition-property: border-bottom background-color;
	transition-duration: 0.3s;
	
	& :focus {
		outline: none;
		background-color: var(--student-main-color-2);
		border-bottom: 8px solid var(--student-main-color-5);
	}
`

export default enter
