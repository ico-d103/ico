import React from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"

function FinanceInvestUseModalContent() {
	return (
		<>
			<div>시계 자리</div>
			<div css={buttonWrapperCSS}>
				<Button text={"사용"} fontSize={`var(--teacher-h5)`} width={"200px"} theme={"positive"} onClick={() => {}} />
				<Button text={"취소"} fontSize={`var(--teacher-h5)`} width={"200px"} theme={"cancelDark"} onClick={() => {}} />
			</div>
		</>
	)
}

const buttonWrapperCSS = css`
	display: flex;
	flex-direction: row;
	gap: 10px;
`

export default FinanceInvestUseModalContent
