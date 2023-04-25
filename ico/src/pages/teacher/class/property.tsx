import React from "react"
import { css } from "@emotion/react"

function property() {
	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<h1>국고</h1>
				<button>국고 사용</button>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	width: 100%;
	height: 100%;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`

const headerCSS = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	> h1 {
		font-size: var(--teacher-h1);
		font-weight: bold;
	}
`

export default property
