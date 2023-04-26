import React from "react"
import { css } from "@emotion/react"
import PropertyListItem from "./PropertyListItem"

function PropertyList() {
	let prevDate: string | null = null
	const mockList = [
		{ id: 0, date: "2023.04.18", money: "+ 3500 미소", content: "정기 세금", name: "국민들" },
		// { id: 1, date: "2023.04.18", money: "- 4500 미소", content: "쓰레기봉투", name: "공동 구매" },
		// { id: 2, date: "2023.04.17", money: "- 3000 미소", content: "전기세", name: "국민들" },
		// { id: 3, date: "2023.04.18", money: "+ 3500 미소", content: "정기 세금", name: "국민들" },
		// { id: 4, date: "2023.04.18", money: "- 4500 미소", content: "쓰레기봉투", name: "공동 구매" },
		// { id: 5, date: "2023.04.17", money: "- 3000 미소", content: "전기세", name: "국민들" },
		// { id: 6, date: "2023.04.18", money: "+ 3500 미소", content: "정기 세금", name: "국민들" },
		// { id: 7, date: "2023.04.18", money: "- 4500 미소", content: "쓰레기봉투", name: "공동 구매" },
		// { id: 8, date: "2023.04.17", money: "- 3000 미소", content: "전기세", name: "국민들" },
		// { id: 9, date: "2023.04.18", money: "- 4500 미소", content: "쓰레기봉투", name: "공동 구매" },
		// { id: 10, date: "2023.04.17", money: "- 3000 미소", content: "전기세", name: "국민들" },
		// { id: 11, date: "2023.04.18", money: "+ 3500 미소", content: "정기 세금", name: "국민들" },
		// { id: 12, date: "2023.04.18", money: "- 4500 미소", content: "쓰레기봉투", name: "공동 구매" },
		// { id: 13, date: "2023.04.17", money: "- 3000 미소", content: "전기세", name: "국민들" },
		// { id: 14, date: "2023.04.18", money: "- 4500 미소", content: "쓰레기봉투", name: "공동 구매" },
		// { id: 15, date: "2023.04.17", money: "- 3000 미소", content: "전기세", name: "국민들" },
	]

	return (
		<div css={wrapperCSS}>
			{mockList.map((mock) => {
				const showDate = mock.date !== prevDate
				prevDate = mock.date

				return <PropertyListItem key={mock.id} mock={mock} showDate={showDate} />
			})}
		</div>
	)
}

const wrapperCSS = css`
	margin-top: 10px;
`

export default PropertyList
