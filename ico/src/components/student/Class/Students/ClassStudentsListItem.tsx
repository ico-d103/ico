import { getStudentListType } from "@/types/student/apiReturnTypes"
import { css } from "@emotion/react"

type ClassStudentsListItemPropsType = {
	student: getStudentListType
}

function ClassStudentsListItem({ student }: ClassStudentsListItemPropsType) {
	return (
		<div css={wrapperCSS}>
			<span css={numberCSS}>{student.number}</span>
			<span css={nameCSS}>{student.name}</span>
			<span css={jobCSS}>{student.jobName}</span>
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;

	> span {
		font-size: var(--student-h3);
	}
`

const numberCSS = css`
	width: 25px;
	font-weight: bold;
	color: var(--student-main-color-5);
`

const nameCSS = css`
	width: 70px;
	font-weight: bold;
`

const jobCSS = css`
	color: var(--teacher-gray-color);
`

export default ClassStudentsListItem
