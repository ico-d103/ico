import React from "react"
import { css } from "@emotion/react"
import CouponListItem from "./CouponListItem"

function CouponList() {
	const mockList = [
		{ id: 0, title: "노래 틀기", money: 15000, student: "4번 사공지은", date: "2023년 04월 07일" },
		{ id: 1, title: "노래 틀기", money: 15000, student: "4번 사공지은", date: "2023년 04월 07일" },
		{ id: 2, title: "노래 틀기", money: 15000, student: "4번 사공지은", date: "2023년 04월 07일" },
		{ id: 3, title: "노래 틀기", money: 15000, student: "4번 사공지은", date: "2023년 04월 07일" },
		{ id: 4, title: "노래 틀기", money: 15000, student: "4번 사공지은", date: "2023년 04월 07일" },
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
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	grid-column-gap: 20px;
	grid-row-gap: 30px;
`

export default CouponList
