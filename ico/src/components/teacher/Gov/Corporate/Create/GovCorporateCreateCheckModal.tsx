import React from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"

function GovCorporateCheckModal() {
	return (
		<div css={wrapperCSS}>
			<span>기업을 생성하시겠습니까?</span>
			<div css={buttonWrapperCSS}>
				<Button text={"취소"} fontSize={"var(--teacher-h5)"} width={"110px"} theme={"cancelDark"} onClick={() => {}} />
				<Button text={"생성"} fontSize={"var(--teacher-h5)"} width={"110px"} theme={"normal"} onClick={() => {}} />
			</div>
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;
`

const buttonWrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 20px;
`

export default GovCorporateCheckModal
