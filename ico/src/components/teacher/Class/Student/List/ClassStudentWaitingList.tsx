import { css } from "@emotion/react"
import StudentWaitingListItem from "./ClassStudentWaitingListItem"
import { getImmigrationListType } from "@/types/teacher/apiReturnTypes"

type StudentWaitingListPropsType = {
	waitingList: getImmigrationListType[]
}

function StudentWaitingList({ waitingList }: StudentWaitingListPropsType) {
	return (
		<div css={wrapperCSS}>
			<h5>대기중인 학생을 승인 또는 반려해주세요.</h5>
			{waitingList.map((student) => (
				<StudentWaitingListItem key={student.id} student={student} />
			))}
		</div>
	)
}

const wrapperCSS = css`
	flex: 1;

	> h5 {
		font-size: var(--teacher-h5);
		margin-bottom: 15px;
	}
`

export default StudentWaitingList
