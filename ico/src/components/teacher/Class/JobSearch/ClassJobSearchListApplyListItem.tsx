import React from "react"
import { css } from "@emotion/react"
import { CLASS_APPLY_APPROVE, CLASS_APPLY_DENY } from "../ClassIcons"

type ClassJobSearchListApplyListItemPropsType = {
	mockList: {
		id: number
		number: number
		name: string
		grade: number
	}
}

function ClassJobSearchListApplyListItem({ mockList }: ClassJobSearchListApplyListItemPropsType) {
	const approveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
		e.stopPropagation() // 이벤트 버블링 방지
		alert("승인!")
	}

	const denyHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
		e.stopPropagation()
		alert("반려!")
	}

	return (
		<div css={wrapperCSS}>
			<div>
				<div css={numberCSS}>{mockList.number}</div>
				<h5 css={nameCSS}>{mockList.name}</h5>
				<h6>{mockList.grade}등급</h6>
			</div>
			<div css={buttonWrapperCSS}>
				<div onClick={approveHandler}>{CLASS_APPLY_APPROVE}</div>
				<div onClick={denyHandler}>{CLASS_APPLY_DENY}</div>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	padding: 10px 0;

	h5 {
		font-size: var(--teacher-h5);
	}

	h6 {
		font-size: var(--teacher-h6);
	}

	> div {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
`

const numberCSS = css`
	width: 20px;
	height: 20px;
	border-radius: 100%;
	background-color: var(--teacher-main-color);
	font-size: var(--teacher-h6);
	color: var(--common-back-color-2);
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 5px;
`

const nameCSS = css`
	width: 65px;
`

const buttonWrapperCSS = css`
	gap: 10px;
	margin-right: 3px;

	> div {
		transition: all 0.2s;

		:hover {
			transform: scale(1.3);
		}
	}
`

export default ClassJobSearchListApplyListItem