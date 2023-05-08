import { useState, useEffect, useRef } from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import LoadImage from "@/components/common/LoadImage/LoadImage"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"

function enter() {
	const inputRefs = useRef<(HTMLInputElement | null)[]>([])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const inputLength = e.target.value.length
		const nextIndex = index + 1

		if (inputLength === 1 && nextIndex < inputRefs.current.length) {
			inputRefs.current[nextIndex]?.focus()
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
						setCode((prevCode) => {
							const updatedCode = {
								...prevCode,
								[key]: e.target.value,
							}
							return updatedCode
						})
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

	return (
		<>
			<PageHeader title={"우리반 입장하기"} />

			<div css={WrapperCSS}>
				<LoadImage src={"/assets/enter/enter_image.png"} alt={"signup_illust"} wrapperCss={imageWrapper} dev={false} />
				<div>반 입장 코드를 입력해주세요.</div>

				<div>{renderInput(code)}</div>

				<Button
					text={"입장 코드를 선생님에게 물어보세요"}
					fontSize={`var(--teacher-h5)`}
					width={"100%"}
					theme={"mobileNormal"}
					onClick={() => {}}
				/>
			</div>
		</>
	)
}

const WrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const imageWrapper = css`
	width: 100%;
	height: 50vw;
`

const inputWrapperCSS = css`
	width: 18vw;
	height: 27vw;
`

export default enter
