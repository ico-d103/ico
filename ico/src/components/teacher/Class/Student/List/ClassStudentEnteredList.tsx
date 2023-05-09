import { useState, useEffect } from "react"
import { css } from "@emotion/react"
import StudentEnteredListItem from "./ClassStudentEnteredListItem"
import KebabMenu from "@/components/teacher/common/KebabMenu/KebabMenu"
import { getStudentListAPI } from "@/api/teacher/class/getStudentListAPI"
import { getStudentListType } from "@/types/teacher/apiReturnTypes"
import { useQuery } from "@tanstack/react-query"

function StudentEnteredList() {
	const { data } = useQuery<getStudentListType[]>(["studentList"], getStudentListAPI)

	const resetStudentsJob = () => {
		alert("직업 초기화!")
	}

	const dropdownList = [
		{
			name: "reset",
			content: null,
			label: "직업 초기화",
			function: resetStudentsJob,
		},
	]

	return (
		<div css={wrapperCSS}>
			<div css={contentTitleCSS}>
				<div css={titleCSS}>
					학생들 <small>({data?.length})</small>
				</div>
				<KebabMenu dropdownList={dropdownList} />
			</div>
			<div css={contentCSS}>
				{data?.map((student, idx) => (
					// key={student.number} 로 추후 수정 필요
					<StudentEnteredListItem key={idx} student={student} idx={idx} />
				))}
			</div>
		</div>
	)
}

const wrapperCSS = css`
	flex: 1;
`

const contentTitleCSS = css`
	display: flex;
	flex-direction: row;
	/* align-items: center; */
	justify-content: space-between;
`

const titleCSS = css`
	font-size: var(--teacher-h3);
	font-weight: bold;
	color: var(--teacher-main-color);
	padding: 10px;
	border-bottom: 2px solid #064f32;
	display: inline-block;
	margin-bottom: 20px;

	> small {
		font-size: var(--teacher-h4);
	}
`

const contentCSS = css`
	display: flex;
	flex-direction: column;
`

export default StudentEnteredList
