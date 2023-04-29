import React from "react"
import { css } from "@emotion/react"
import { CLASS_ACCEPT, CLASS_DENY } from "../ClassIcons"

type CouponListItemPropsType = {
	mock: {
		id: number
		title: string
		money: number
		student: string
		date: string
	}
}

function CouponListItem({ mock }: CouponListItemPropsType) {
	return (
		<div css={wrapperCSS}>
			<div css={leftWrapperCSS}>
				<div css={leftCSS}>
					<h3>{mock.title}</h3>
					<h4>{mock.money} 미소</h4>
				</div>
				<div css={rightCSS}>
					<h4>{mock.student}</h4>
					<div>
						<div></div>
						<h5>{mock.date}</h5>
					</div>
				</div>
			</div>
			<div css={rightWrapperCSS}>
				<div></div>
				<button>{CLASS_ACCEPT}</button>
				<button>{CLASS_DENY}</button>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	width: 300px;
	height: 200px;
	background: var(--common-back-color-2);
	border: 1px solid rgba(0, 0, 0, 0.1);
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	border-radius: 10px;

	display: flex;
	flex-direction: row;
	overflow: hidden;
`

const leftWrapperCSS = css`
	width: 270px;
	height: 100%;
	background-color: var(--common-back-color-2);
	padding: 25px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const leftCSS = css`
	display: flex;
	flex-direction: column;
	gap: 20px;

	> h3 {
		font-size: var(--teacher-h3);
		font-weight: bold;
	}

	> h4 {
		font-size: var(--teacher-h4);
	}
`

const rightCSS = css`
	display: flex;
	flex-direction: column;
	gap: 10px;

	> h4 {
		font-size: var(--teacher-h4);
		text-align: right;
	}

	> div {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: right;

		> div {
			width: 10px;
			height: 10px;
			background-color: var(--teacher-highlight-color);
			margin-right: 5px;
			border-radius: 100%;
		}

		> h5 {
			font-size: var(--teacher-h5);
		}
	}
`

const rightWrapperCSS = css`
	width: 80px;
	height: 100%;
	background-color: var(--teacher-coupon-color);

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 60px;
	position: relative;

	> div {
		position: absolute;
		width: 38px;
		height: 38px;
		border-radius: 100%;
		background-color: var(--common-back-color-2);
		right: 50px;
	}

	> button {
		background-color: var(--common-back-color-2);
		border: 1px solid var(--teacher-gray2-color);
		width: 38px;
		height: 38px;
		border-radius: 100%;
		transition: all 0.2s linear;

		:hover {
			transform: scale(1.1);
		}
	}
`

export default CouponListItem
