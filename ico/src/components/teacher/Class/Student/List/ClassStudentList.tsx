import React from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import StudentEnteredList from "./ClassStudentEnteredList"
import StudentWaitingList from "./ClassStudentWaitingList"

function StudentList() {
	return (
		<>
			<div css={headerCSS}>
				<h1>학생 정보</h1>
				<Button
					text={"직업 초기화"}
					fontSize={`var(--teacher-h4)`}
					width={"128px"}
					theme={"normal"}
					onClick={() => {}}
				/>
			</div>
			<div css={listWrapperCSS}>
				<StudentWaitingList />
				<div css={divideLineCSS}></div>
				<StudentEnteredList />
			</div>
		</>
	)
}

const headerCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;

	> h1 {
		font-size: var(--teacher-h1);
		font-weight: bold;
	}
`

const listWrapperCSS = css`
	display: flex;
	flex-direction: column;
`

const divideLineCSS = css`
	border: 1px solid rgba(0, 0, 0, 0.05);
	margin: 20px 0;
`

export default StudentList
