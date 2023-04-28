import React from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"

function ClassStudentDetailHead() {
	return (
		<div css={studentWrapperCSS}>
			<div>
				<div css={studentNameCSS}>사공지은</div>
				<Button
					text={"직업 초기화"}
					fontSize={`var(--teacher-h5)`}
					width={"100px"}
					height={"28px"}
					theme={"warning"}
					onClick={() => {}}
				/>
			</div>
			<div>계좌 정지</div>
		</div>
	)
}

const studentWrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-top: 20px;

	> div {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 15px;
	}
`

const studentNameCSS = css`
	font-size: var(--teacher-h3);
	font-weight: bold;
	color: var(--teacher-main-color);
	padding: 10px;
	border-bottom: 2px solid #064f32;
	display: inline-block;
`

export default ClassStudentDetailHead
