import React from "react"
import { css } from "@emotion/react"

type PaginationButtonPropsType = {
	pgNumber: string
}

function PaginationButton({ pgNumber }: PaginationButtonPropsType) {
	return <button css={buttonCSS}>{pgNumber}</button>
}

const buttonCSS = css`
	font-size: var(--teacher-h3);
	width: 35px;
	height: 35px;
	background-color: var(--common-back-color-2);
	border: 1px solid rgb(240, 240, 240);
	border-radius: 5px;
	transition: all 0.1s;

	:hover {
		background-color: var(--teacher-main-color-2);
		color: var(--common-back-color-2);
	}
`

export default PaginationButton
