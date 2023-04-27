import React from "react"
import { css } from "@emotion/react"
import Form from "../../common/Form/Form"

import GovRuleClassDetail from "./GovRuleClassDetail"
import GovRuleClassCreate from "./GovRuleClassCreate"
import Button from "@/components/common/Button/Button"
import useCompHandler from "@/hooks/useCompHandler"
import AnimatedRenderer from "@/components/common/AnimatedRenderer/AnimatedRenderer"
import FormCreator from "../../common/Form/FormCreator"

function GovRuleClass() {
	const [openComp, closeComp, compState] = useCompHandler()

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
				{!compState && (
					<Button
						text={"추가"}
						fontSize={"var(--teacher-h5)"}
						width={"110px"}
						theme={"normal"}
						onClick={() => {
							openComp()
						}}
					/>
				)}
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

			<FormCreator subComp={<CreateRule />} idx={0} compState={compState} closeCompHandler={closeComp} />

			<GovRuleClassDetail idx={0} title={"학급 규칙 제목 1"} content={rule} date={"2023년 04월 26일"} />
			<GovRuleClassDetail
				idx={1}
				title={"학급 규칙 제목 2"}
				content={"학급 규칙 내용입니다. 입섬 로렘..."}
				date={"2023년 04월 26일"}
			/>
		</div>
	)
}


const CreateRule = ({
	updateContents,
	contents,
	buttons,
}: {
	updateContents?: any
	contents?: any
	buttons?: any
}) => {
	const submit = () => {
		// 제출
	}
	return (
		<React.Fragment>
			<div>

			</div>
			{buttons(submit)}
		</React.Fragment>
	)
}




const contentWrapperCSS = css`
	flex: 1;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`

const titleCSS = css`
	font-size: var(--teacher-h1);
	font-weight: 700;
	margin-bottom: 12px;
	display: flex;
	justify-content: space-between;
	height: 35px;
`

const descCSS = css`
	margin-bottom: 36px;
`
export default GovRuleClass
