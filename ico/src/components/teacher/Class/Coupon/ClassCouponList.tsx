import React from "react"
import { css } from "@emotion/react"
import CouponListItem from "./ClassCouponListItem"

function CouponList() {
	const mockList = [
		{ id: 0, title: "노래 틀기", money: 15000, student: "1번 강교철", date: "2023년 04월 07일" },
		{ id: 1, title: "급식 먼저 먹기", money: 15000, student: "2번 김동주", date: "2023년 04월 07일" },
		{ id: 2, title: "숙제 면제", money: 15000, student: "3번 변윤경", date: "2023년 04월 07일" },
		{ id: 3, title: "노래 틀기", money: 15000, student: "4번 사공지은", date: "2023년 04월 07일" },
		{ id: 4, title: "급식 먼저 먹기", money: 15000, student: "5번 서재건", date: "2023년 04월 07일" },
		{ id: 5, title: "숙제 면제", money: 15000, student: "6번 오민준", date: "2023년 04월 07일" },
	]

	return (
		<div css={wrapper}>
			{mockList.map((mock) => (
				<CouponListItem key={mock.id} mock={mock} />
			))}
		</div>
	)
}

const wrapper = css`
	margin-top: 40px;
	display: grid;
	place-items: center;
	grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	grid-column-gap: 20px;
	grid-row-gap: 40px;
`

export default CouponList
