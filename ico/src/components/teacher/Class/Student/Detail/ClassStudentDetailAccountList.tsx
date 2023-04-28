import React from "react"
import { css } from "@emotion/react"
import ClassStudentDetailAccountListItem from "./ClassStudentDetailAccountListItem"

function ClassStudentDetailAccountList() {
	let prevDate: string | null = null
	const mockList = [
		{ id: 0, date: "2023.04.17", money: "+ 3500미소", content: "전기세" },
		{ id: 1, date: "2023.04.16", money: "+ 3500미소", content: "쓰레기봉투" },
		{ id: 2, date: "2023.04.15", money: "- 3500미소", content: "지각비" },
		{ id: 3, date: "2023.04.15", money: "+ 3500미소", content: "쓰레기봉투" },
		{ id: 0, date: "2023.04.15", money: "+ 3500미소", content: "지각비" },
		{ id: 1, date: "2023.04.14", money: "- 3500미소", content: "전기세" },
		{ id: 2, date: "2023.04.12", money: "+ 3500미소", content: "전기세" },
		{ id: 3, date: "2023.04.12", money: "- 3500미소", content: "지각비" },
	]

	return (
		<div css={wrapperCSS}>
			<h4>거래 내역</h4>
			{mockList.map((mock) => {
				const showDate = mock.date !== prevDate
				prevDate = mock.date

				return <ClassStudentDetailAccountListItem key={mock.id} mock={mock} showDate={showDate} />
			})}
		</div>
	)
}

const wrapperCSS = css`
	width: 100%;
	padding: 30px;
	margin-top: 30px;
	border: 1px solid #dde3ea;
	background-color: var(--common-back-color-2);
	border-radius: 10px;

	> h4 {
		font-size: var(--teacher-h4);
		font-weight: bold;
		margin-bottom: 20px;
	}
`

export default ClassStudentDetailAccountList
