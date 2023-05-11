import { css } from "@emotion/react"
import StudentWaitingListItem from "./ClassStudentWaitingListItem"
import { getImmigrationListType } from "@/types/teacher/apiReturnTypes"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"

type StudentWaitingListPropsType = {
	waitingList: getImmigrationListType[]
}

function StudentWaitingList({ waitingList }: StudentWaitingListPropsType) {
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
	const queryClient = useQueryClient()

	const sseConnectHandler = () => {
		const sse = new EventSource(`${BASE_URL}/immigration/connect`) // SSE 연결 요청

		sse.addEventListener("connect", (e) => {
			const { data: receivedConnectData } = e
			console.log(`SSE ${receivedConnectData}`)
		})

		sse.addEventListener("studentList", (e) => {
			const { data: receivedListData } = e

			// 리스트 자동 업데이트
			return queryClient.invalidateQueries(["studentList"])
		})

		sse.onerror = () => sse.close()
	}

	useEffect(() => {
		sseConnectHandler()
	}, [])

	return (
		<div css={wrapperCSS}>
			{waitingList.length > 0 && <h5>대기중인 학생을 승인 또는 반려해주세요.</h5>}
			{waitingList.map((student, idx) => (
				<StudentWaitingListItem key={student.immigrationId} student={student} idx={idx} />
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
