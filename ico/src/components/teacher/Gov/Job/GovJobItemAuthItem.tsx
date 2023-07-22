import React from "react"
import { css } from "@emotion/react"

type GovJobItemCertItemProps = {
	arrIdx: number
	id: number
	subject: string
	rating: number
	ratingHandler: any
}
function GovJobItemCertItem({ arrIdx, id, subject, rating, ratingHandler }: GovJobItemCertItemProps) {
	return (
		<div css={itemWrapperCSS}>
			<div>{subject}</div>

	
		</div>
	)
}

const itemWrapperCSS = css`
	display: flex;
	/* margin: 8px; */
	padding: 8px;
	align-items: center;
	width: 100%;
	justify-content: end;
	gap: 8px;
	user-select: none;
`

const decreaseButtonCSS = css`
	background-color: rgb(217, 217, 217);
`

const increaseButtonCSS = css`
	background-color: var(--teacher-main-color-2);
`

const buttonCSS = css`
	width: 23px;
	height: 23px;
	border-radius: 100%;

	transition-property: transform;
	transition-duration: 0.2s;
	cursor: pointer;

	&:hover {
		transform: scale(120%);
	}
`

const ratingCSS = css`
	width: 16px;
	text-align: center;
`

export default GovJobItemCertItem
