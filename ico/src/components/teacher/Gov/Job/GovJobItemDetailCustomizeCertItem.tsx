import React from "react"
import { css } from "@emotion/react"

type GovJobItemDetailCustomizeCertItemProps = {
	arrIdx: number
	id: number
	subject: string
	rating: number
	ratingHandler: any
}
function GovJobItemDetailCustomizeCertItem({ arrIdx, id, subject, rating, ratingHandler }: GovJobItemDetailCustomizeCertItemProps) {
	return (
		<div css={itemWrapperCSS}>
			<div>{subject}</div>
			<div
				css={[decreaseButtonCSS, buttonCSS]}
				onClick={() => {
					ratingHandler({ id: id, reverse: false })
				}}
			>
				<svg width="23" height="23" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="20" height="20" rx="10" fill="#d9d9d9"></rect>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M16.6667 10.8334L3.33333 10.8334C2.8731 10.8334 2.5 10.4603 2.5 10.0001C2.5 9.53985 2.8731 9.16675 3.33333 9.16675L16.6667 9.16675C17.1269 9.16675 17.5 9.53984 17.5 10.0001C17.5 10.4603 17.1269 10.8334 16.6667 10.8334Z"
						fill="white"
					></path>
				</svg>
			</div>
			<div css={ratingCSS}>{rating === -1 ? "X" : rating}</div>
			<div
				css={[increaseButtonCSS, buttonCSS]}
				onClick={() => {
					ratingHandler({ id: id, reverse: true })
				}}
			>
				<svg width="23" height="23" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="20" height="20" rx="10" fill="#38735a"></rect>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M2.5 10.0001C2.5 9.53984 2.8731 9.16675 3.33333 9.16675H16.6667C17.1269 9.16675 17.5 9.53984 17.5 10.0001C17.5 10.4603 17.1269 10.8334 16.6667 10.8334H3.33333C2.8731 10.8334 2.5 10.4603 2.5 10.0001Z"
						fill="white"
					></path>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M9.99967 2.5C10.4599 2.5 10.833 2.8731 10.833 3.33333L10.833 16.6667C10.833 17.1269 10.4599 17.5 9.99967 17.5C9.53944 17.5 9.16634 17.1269 9.16634 16.6667L9.16634 3.33333C9.16634 2.8731 9.53944 2.5 9.99967 2.5Z"
						fill="white"
					></path>
				</svg>
			</div>
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

export default GovJobItemDetailCustomizeCertItem
