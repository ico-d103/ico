import React from "react"
import { css } from "@emotion/react"
import PropertyListItem from "./PropertyListItem"

function PropertyList() {
	const mockList = [
		{ date: "2023.04.18", money: "+ 3500 미소", content: "정기 세금", name: "국민들" },
		{ date: "2023.04.18", money: "- 4500 미소", content: "쓰레기봉투", name: "공동 구매" },
		{ date: "2023.04.17", money: "- 3000 미소", content: "전기세", name: "국민들" },
	]

	return (
		<div css={wrapperCSS}>
			{mockList.map((mock, idx) => (
				<PropertyListItem key={idx} mock={mock} />
			))}
		</div>
	)
}

const wrapperCSS = css`
	margin-top: 30px;
`

export default PropertyList
