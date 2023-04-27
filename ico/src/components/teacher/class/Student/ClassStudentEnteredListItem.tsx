import React from "react"
import { css } from "@emotion/react"

type StudentEnteredListItemPropsType = {
	mock: {
		id: number
		number: number
		name: string
		job: string
		grade: number
		money: number
	}
}

function StudentEnteredListItem({ mock }: StudentEnteredListItemPropsType) {
	return (
		<div css={wrapperCSS(mock.id)}>
			<div css={leftWrapperCSS}>
				<h4>{mock.number}</h4>
				<h4>{mock.name}</h4>
				<h4>{mock.job}</h4>
			</div>
			<div css={rightWrapperCSS}>
				<div>{mock.grade}등급</div>
				<div>{mock.money} 미소</div>
			</div>
		</div>
	)
}

const wrapperCSS = (id: number) => {
	return css`
		width: 100%;
		padding: 10px 15px;
		background-color: ${id % 2 === 0 ? `var(--teacher-main-color-op-2)` : `var(--common-back-color-2)`};
		border-radius: 10px;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
		transition: all 0.2s;

		:hover {
			filter: brightness(93%);
		}
	`
}

const leftWrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 15px;

	> h4 {
		font-size: var(--teacher-h4);
	}

	> h4:nth-of-type(1) {
		font-weight: bold;
	}
`

const rightWrapperCSS = css`
	padding: 3px;
	background-color: var(--teacher-main-color);
	border-radius: 5px;

	display: flex;
	flex-direction: row;
	align-items: center;

	> div {
		padding: 10px;
	}

	> div:nth-of-type(1) {
		color: var(--common-back-color-2);
	}

	> div:nth-of-type(2) {
		background-color: var(--common-back-color-2);
		border-radius: 0px 3px 3px 0px;
	}
`

export default StudentEnteredListItem
