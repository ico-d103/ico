import React from "react"
import { css } from "@emotion/react"
import StudentList from "@/components/teacher/Class/Student/StudentList"
import StudentDetail from "@/components/teacher/Class/Student/StudentDetail"

function students() {
	return (
		<div css={wrapperCSS}>
			<div css={leftWrapperCSS}>
				<StudentList />
			</div>
			<div css={rightWrapperCSS}>
				<StudentDetail />
			</div>
		</div>
	)
}

const wrapperCSS = css`
	flex: 1;
	display: flex;
	flex-direction: row;
	gap: 30px;
	height: 100%;
`

const leftWrapperCSS = css`
	flex: 1;
	display: flex;
	flex-direction: column;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`

const rightWrapperCSS = css`
	flex: 1;
	width: 50%;
	display: flex;
	flex-direction: column;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`

export default students
