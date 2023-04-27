import React from "react"
import { css } from "@emotion/react"
import StudentEnteredListItem from "./ClassStudentEnteredListItem"

function StudentEnteredList() {
	const mockList = [
		{ id: 0, number: 1, name: "강교철", job: "한국 전력", grade: 3, money: 230 },
		{ id: 1, number: 2, name: "김동주", job: "한국 전력", grade: 3, money: 230 },
		{ id: 2, number: 3, name: "변윤경", job: "한국 전력", grade: 3, money: 230 },
		{ id: 3, number: 4, name: "사공지은", job: "한국 전력", grade: 3, money: 230 },
		{ id: 4, number: 5, name: "서재건", job: "한국 전력", grade: 3, money: 230 },
		{ id: 5, number: 6, name: "오민준", job: "한국 전력", grade: 3, money: 230 },
		{ id: 6, number: 7, name: "사공지은", job: "한국 전력", grade: 3, money: 230 },
		{ id: 7, number: 8, name: "서재건", job: "한국 전력", grade: 3, money: 230 },
		{ id: 8, number: 9, name: "오민준", job: "한국 전력", grade: 3, money: 230 },
	]

	return (
		<div css={wrapperCSS}>
			<div css={contentTitleCSS}>
				학생들 <small>({mockList.length})</small>
			</div>
			<div css={contentCSS}>
				{mockList.map((mock) => (
					<StudentEnteredListItem key={mock.id} mock={mock} />
				))}
			</div>
		</div>
	)
}

const wrapperCSS = css`
	flex: 1;
`

const contentTitleCSS = css`
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
