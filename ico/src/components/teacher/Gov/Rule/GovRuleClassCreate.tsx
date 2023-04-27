import React from "react"
import Form from "../../common/Form/Form"
import Button from "@/components/common/Button/Button"
import { css } from "@emotion/react"

type GovRuleClassCreateProps = {
	idx: number
	mainInit?: { title: string; content: string }
	closeHandler?: Function
	closeComp: Function
}
function GovRuleClassCreate({ idx, mainInit, closeComp, closeHandler }: GovRuleClassCreateProps) {
	const SubmitRender = () => {
		return (
			<div css={submitWrapperCSS}>
				<Button
					text={"취소"}
					fontSize={"var(--teacher-h5)"}
					width={"110px"}
					theme={"cancelLight"}
					margin={"0px 8px 0px 0px"}
					onClick={() => {
						closeHandler && closeHandler()
					}}
				/>
				<Button text={"작성"} fontSize={"var(--teacher-h5)"} width={"110px"} theme={"highlighted"} onClick={() => {}} />
			</div>
		)
	}

	return (
		<Form
			mainInit={mainInit ? mainInit : { title: "", content: "" }}
			subInput={<SubmitRender />}
			idx={idx}
			titlePlaceHolder={"제목을 입력해 주세요!"}
			contentPlaceHolder={"내용을 입력해 주세요!"}
			closeComp={closeComp}
		/>
	)
}

const submitWrapperCSS = css`
	display: flex;
	justify-content: end;
	padding: 8px;
`
export default GovRuleClassCreate
