import React from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import StudentEnteredList from "./ClassStudentEnteredList"
import StudentWaitingList from "./ClassStudentWaitingList"

function StudentList() {
	return (
		<div>
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
			<div css={contentTitleCSS}>
				학생들 <small>(20명)</small>
			</div>
			<StudentEnteredList />
			<StudentWaitingList />
		</div>
	)
}

const headerCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	> h1 {
		font-size: var(--teacher-h1);
		font-weight: bold;
	}
`

const contentTitleCSS = css`
	font-size: var(--teacher-h3);
	font-weight: bold;
	color: var(--teacher-main-color);
	padding: 10px;
	border-bottom: 2px solid #064f32;
	display: inline-block;
	margin-top: 20px;

	> small {
		font-size: var(--teacher-h4);
	}
`

export default StudentList
