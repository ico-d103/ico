import React from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"

function ClassPropertyUseModal() {
	return (
		<>
			<div css={contentCSS}>
				<input type="number" placeholder="사용할 금액을 숫자만 입력해주세요." />
				<textarea placeholder="사용 사유를 입력해주세요."></textarea>
			</div>
			<div css={buttonWrapperCSS}>
				<Button text={"사용"} fontSize={`var(--teacher-h5)`} width={"200px"} theme={"positive"} onClick={() => {}} />
				<Button text={"취소"} fontSize={`var(--teacher-h5)`} width={"200px"} theme={"cancelDark"} onClick={() => {}} />
			</div>
		</>
	)
}

const contentCSS = css`
	width: 100%;
	background-color: #d5dde9;
	border-radius: 10px;
	padding: 15px;
	margin-bottom: 20px;

	display: flex;
	flex-direction: column;

	> input {
		font-size: var(--teacher-h5);
		padding: 10px;
		background: none;
		border: none;
		outline: none;
		border-bottom: 1px solid rgba(138, 108, 108, 0.1);
	}

	> textarea {
		font-size: var(--teacher-h5);
		padding: 10px;
		resize: none;
		background: none;
		border: none;
		outline: none;
		height: 130px;
	}
`

const buttonWrapperCSS = css`
	display: flex;
	flex-direction: row;
	gap: 10px;
`

export default ClassPropertyUseModal
