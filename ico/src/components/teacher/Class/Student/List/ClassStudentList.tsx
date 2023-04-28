import React from "react"
import { css } from "@emotion/react"
import StudentEnteredList from "./ClassStudentEnteredList"
import StudentWaitingList from "./ClassStudentWaitingList"

function StudentList() {
	return (
		<>
			<h1 css={headerCSS}>학생 정보</h1>
			<div css={listWrapperCSS}>
				<StudentWaitingList />
				<div css={divideLineCSS}></div>
				<StudentEnteredList />
			</div>
		</>
	)
}

const headerCSS = css`
	font-size: var(--teacher-h1);
	font-weight: bold;
	margin-bottom: 20px;
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
