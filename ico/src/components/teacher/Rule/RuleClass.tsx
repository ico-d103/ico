import React from "react"
import { css } from "@emotion/react"
import Form from "../common/Form/Form"
import Test from "../common/Form/Test"
import Test2 from "../common/Form/Test2"
import RuleClassDetail from "./RuleClassDetail"
import RuleClassCreate from "./RuleClassCreate"
import Button from "@/components/common/Button/Button"
import useCompHandler from "@/hooks/useCompHandler"

function RuleClass() {
	const { openComp, closeComp, compState } = useCompHandler()

	const rule = `
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...학급 규칙 내용입니다. 입섬 로렘...학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    v
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    v
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    `

	return (
		<div css={contentWrapperCSS}>
			<div css={titleCSS}>
				학급 규칙
				<Button text={"추가"} fontSize={"var(--teacher-h5)"} width={"110px"} height={"35px"} theme={"normal"} onClick={()=>{}} />
			</div>
			<div css={descCSS}>학급의 규칙을 작성하거나 수정할 수 있습니다.</div>

			{/* <Form
				mainInit={{ title: "zzzz", content: "hahaha" }}
				subInit={{ test: "", test2: "" }}
				subInput={<Test />}
				idx={3}
				titlePlaceHolder={"제목을 입력해 주세요!"}
				contentPlaceHolder={"내용을 입력해 주세요!"}
			/> */}

			<RuleClassCreate idx={0} />
			<RuleClassDetail title={"학급 규칙 제목 1"} content={rule} date={"2023년 04월 26일"} />
			<RuleClassDetail
				title={"학급 규칙 제목 2"}
				content={"학급 규칙 내용입니다. 입섬 로렘..."}
				date={"2023년 04월 26일"}
			/>
		</div>
	)
}

const contentWrapperCSS = css`
	flex: 1;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`

const titleCSS = css`
	font-size: var(--teacher-h2);
	font-weight: 700;
	margin-bottom: 6px;
	display: flex;
	justify-content: space-between;
`

const descCSS = css`
	margin-bottom: 36px;
`
export default RuleClass
