import React from "react"
import { css } from "@emotion/react"
import StudentWaitingListItem from "./ClassStudentWaitingListItem"

function StudentWaitingList() {
	const mockWaitList = [
		{ id: 0, number: 6, name: "김종혁" },
		{ id: 1, number: 7, name: "김현영" },
		{ id: 2, number: 8, name: "박선용" },
		{ id: 3, number: 9, name: "박정은" },
		{ id: 4, number: 10, name: "성광현" },
	]

	return (
		<div css={wrapperCSS}>
			<h5>대기중인 학생을 승인 또는 반려해주세요.</h5>
			{mockWaitList.map((mock) => (
				<StudentWaitingListItem key={mock.id} mock={mock} />
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
