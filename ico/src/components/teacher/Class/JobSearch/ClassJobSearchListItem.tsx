import React from "react"
import { css } from "@emotion/react"
import Image from "next/image"

type ClassJobSearchListItemPropsType = {
	mock: {
		id: number
		jobname: string
		needcount: number
		applycount: number
		grade: number
		money: number
	}
}

function ClassJobSearchListItem({ mock }: ClassJobSearchListItemPropsType) {
	return (
		<div css={wrapperCSS}>
			<div css={imageWrapperCSS}></div>
			<div css={contentWrapperCSS}>
				<div css={firstContentCSS}>직업 이름과 모집 인원 수</div>
				<div css={secondContentCSS}>
					<h4>신용 등급</h4>
					<h4>월급</h4>
				</div>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	width: 250px;
	height: 350px;
	background: var(--common-back-color-2);
	border: 1px solid rgba(0, 0, 0, 0.1);
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	transition: all 0.2s;
	overflow: hidden;
	cursor: pointer;

	:hover {
		transform: scale(1.1);
	}
`

const imageWrapperCSS = css`
	height: 240px;
	background-color: #007bc0;
`

const contentWrapperCSS = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const firstContentCSS = css`
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	padding: 10px;
`

const secondContentCSS = css`
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 10px;
`

export default ClassJobSearchListItem
