import React from "react"
import { css } from "@emotion/react"

type PropertyListItemPropsType = {
	mock: {
		date: string
		money: string
		content: string
		name: string
	}
}

function PropertyListItem({ mock }: PropertyListItemPropsType) {
	return (
		<div css={wrapperCSS}>
			<div css={leftCSS}>
				<h4>{mock.date}</h4>
				<h3>{mock.money}</h3>
				<h3>{mock.content}</h3>
			</div>
			<h3>{mock.name}</h3>
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 15px;
	border-radius: 10px;
	transition: all 0.1s;
	cursor: pointer;

	:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}

	h3 {
		font-size: var(--teacher-h3);
	}

	h4 {
		font-size: var(--teacher-h4);
	}
`

const leftCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;

	> h4 {
		color: var(--teacher-gray-color);
	}

	> h3:nth-of-type(1) {
		margin: 0 20px;
		font-weight: bold;
		color: var(--teacher-blue-color);
	}
`

export default PropertyListItem
