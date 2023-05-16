import { getStudentListType } from "@/types/student/apiReturnTypes"
import { css } from "@emotion/react"

type ClassStudentsListItemPropsType = {
	student: getStudentListType
}

function ClassStudentsListItem({ student }: ClassStudentsListItemPropsType) {
	return (
		<div css={wrapperCSS}>
			<div>
				<span css={numberCSS}>{student.number}번</span>
				<span css={nameCSS}>{student.name}</span>
			</div>
			<span css={jobCSS}>{student.jobName ? student.jobName : "아직 직업이 없어요"}</span>
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	span {
		font-size: var(--student-h3);
	}

	> div {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
`

const numberCSS = css`
	width: 40px;
	font-weight: bold;
	color: var(--student-main-color-5);
`

const nameCSS = css`
	font-weight: bold;
`

const jobCSS = css`
	color: var(--teacher-gray-color);
`

export default ClassStudentsListItem
