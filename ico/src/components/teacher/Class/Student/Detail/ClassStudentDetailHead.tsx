import React from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import KebabMenu from "@/components/teacher/common/KebabMenu/KebabMenu"

function ClassStudentDetailHead() {
	const resetStudentJob = () => {
		alert("직업 초기화!")
	}

	const preventStudentAccount = () => {
		alert("계좌 정지!")
	}

	const dropdownList = [
		{
			name: "reset",
			content: null,
			label: "직업 초기화",
			function: resetStudentJob,
		},
		{
			name: "prevent",
			content: null,
			label: "계좌 정지",
			function: preventStudentAccount,
		},
	]

	return (
		<div css={studentWrapperCSS}>
			<div css={studentNameCSS}>사공지은</div>
			<KebabMenu dropdownList={dropdownList} />
		</div>
	)
}

const studentWrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-top: 20px;
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
