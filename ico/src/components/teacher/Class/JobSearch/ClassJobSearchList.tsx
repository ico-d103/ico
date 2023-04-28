import React from "react"
import { css } from "@emotion/react"
import ClassJobSearchListItem from "./ClassJobSearchListItem"

function ClassJobSearchList() {
	const mockList = [
		{ id: 0, jobname: "기상캐스터", needcount: 1, applycount: 6, grade: 6, money: 17000 },
		{ id: 1, jobname: "소방관", needcount: 2, applycount: 13, grade: 3, money: 32000 },
		{ id: 2, jobname: "경찰", needcount: 0, applycount: 0, grade: 2, money: 20000 },
		{ id: 3, jobname: "기상캐스터", needcount: 1, applycount: 6, grade: 6, money: 17000 },
		{ id: 4, jobname: "소방관", needcount: 2, applycount: 13, grade: 3, money: 32000 },
		{ id: 5, jobname: "경찰", needcount: 0, applycount: 0, grade: 2, money: 20000 },
	]

	return (
		<div css={wrapper}>
			{mockList.map((mock) => (
				<ClassJobSearchListItem key={mock.id} mock={mock} />
			))}
		</div>
	)
}

const wrapper = css`
	margin-top: 40px;
	display: grid;
	place-items: center;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	grid-column-gap: 20px;
	grid-row-gap: 30px;
`

export default ClassJobSearchList
