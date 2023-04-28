import React from "react"
import { css } from "@emotion/react"
import ClassStudentDetailHead from "./ClassStudentDetailHead"
import ClassStudentDetailMoney from "./ClassStudentDetailMoney"
import ClassStudentDetailGrade from "./ClassStudentDetailGrade"
import ClassStudentDetailAccountList from "./ClassStudentDetailAccountList"

function StudentDetail() {
	return (
		<>
			<h1 css={headerCSS}>학생 정보 상세보기</h1>
			<ClassStudentDetailHead />
			<ClassStudentDetailMoney />
			<ClassStudentDetailGrade />
			<ClassStudentDetailAccountList />
		</>
	)
}

const headerCSS = css`
	font-size: var(--teacher-h1);
	font-weight: bold;
`

export default StudentDetail
