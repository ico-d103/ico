import { css } from "@emotion/react"
import StudentEnteredList from "./ClassStudentEnteredList"
import StudentWaitingList from "./ClassStudentWaitingList"
import { getImmigrationListType } from "@/types/teacher/apiReturnTypes"
import { getImmigrationListAPI } from "@/api/teacher/class/getImmigrationListAPI"
import { useQuery } from "@tanstack/react-query"

function StudentList() {
	const { data } = useQuery<getImmigrationListType[]>(["studentList", "immigration"], getImmigrationListAPI)

	return (
		<>
			<h1 css={headerCSS}>학생 정보</h1>
			<div css={listWrapperCSS}>
				{data && <StudentWaitingList waitingList={data} />}
				{data && data.length > 0 && (
					<>
						<div css={divideLineCSS}></div>
					</>
				)}
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
