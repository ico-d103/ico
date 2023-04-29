import React, { useState } from "react"
import { css } from "@emotion/react"
import ClassJobSearchListItemFront from "./ClassJobSearchListItemFront"
import ClassJobSearchListItemBack from "./ClassJobSearchListItemBack"

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
	const [isReverse, setIsReverse] = useState<boolean>(false)

	return (
		<div css={wrapperCSS} onClick={() => setIsReverse(!isReverse)}>
			{!isReverse ? <ClassJobSearchListItemFront mock={mock} /> : <ClassJobSearchListItemBack mock={mock} />}
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
	overflow: scroll;
	cursor: pointer;

	:hover {
		transform: scale(1.1);
	}
`

export default ClassJobSearchListItem
