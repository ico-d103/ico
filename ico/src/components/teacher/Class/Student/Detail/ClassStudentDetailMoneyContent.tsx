import React from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"

function ClassStudentDetailMoneyContent() {
	return (
		<div css={wrapperCSS}>
			<textarea css={reasonWrapperCSS} placeholder="사유를 입력해주세요."></textarea>
			<div>
				<div css={moneyInputCSS}>
					<input type="number" placeholder="미소 입력" />
					<span>미소</span>
				</div>
				<div css={buttonWrapperCSS}>
					<Button
						text={"지급"}
						fontSize={`var(--teacher-h5)`}
						width={"70px"}
						height={"40px"}
						theme={"positive"}
						onClick={() => {}}
					/>
					<Button
						text={"차감"}
						fontSize={`var(--teacher-h5)`}
						width={"70px"}
						height={"40px"}
						theme={"warning"}
						onClick={() => {}}
					/>
				</div>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: column;

	> div {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 20px;
	}
`

const reasonWrapperCSS = css`
	width: 100%;
	min-height: 100px;
	background: rgba(159, 159, 159, 0.2);
	border-radius: 10px;
	padding: 15px;
	resize: none;
	outline: none;
	border: none;
	font-size: var(--teacher-h5);
`

const moneyInputCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;

	> input {
		outline: none;
		border: none;
		font-size: var(--teacher-h5);
		background: rgba(159, 159, 159, 0.2);
		border-radius: 10px;
		padding: 0 15px;
		height: 100%;
	}

	> span {
		font-size: var(--teacher-h5);
	}
`

const buttonWrapperCSS = css`
	display: flex;
	flex-direction: row;
	gap: 10px;
`

export default ClassStudentDetailMoneyContent
