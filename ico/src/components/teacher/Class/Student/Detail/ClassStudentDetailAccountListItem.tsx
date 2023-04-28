import React from "react"
import { css } from "@emotion/react"

type ClassStudentDetailAccountListItemPropsType = {
	mock: {
		id: number
		date: string
		money: string
		content: string
	}
	showDate: boolean
}

function ClassStudentDetailAccountListItem({ mock, showDate }: ClassStudentDetailAccountListItemPropsType) {
	return (
		<div css={wrapperCSS}>
			<h5 css={dateCSS({ showDate })}>{mock.date}</h5>
			<h5 css={mock.money.includes("+") ? plusMoneyCSS : minusMoneyCSS}>{mock.money}</h5>
			<h5 css={contentCSS}>{mock.content}</h5>
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 15px;
	border-radius: 10px;
	transition: all 0.1s;
	cursor: pointer;

	:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}

	h4 {
		font-size: var(--teacher-h4);
	}

	h5 {
		font-size: var(--teacher-h5);
	}
`

const dateCSS = ({ showDate }: { showDate: boolean }) => {
	return css`
		visibility: ${showDate ? "visible" : "hidden"};
		min-width: 80px;
		color: var(--teacher-gray-color);
	`
}

const plusMoneyCSS = css`
	min-width: 100px;
	text-align: right;
	margin-right: 50px;
	font-weight: bold;
	color: var(--teacher-blue-color);
`

const minusMoneyCSS = css`
	min-width: 100px;
	text-align: right;
	margin-right: 50px;
	font-weight: bold;
	color: var(--teacher-warning-color);
`

const contentCSS = css`
	min-width: 140px;
`

export default ClassStudentDetailAccountListItem
