import React from "react"
import { css } from "@emotion/react"
import CheckBox from "../../common/CheckBox/CheckBox"

type GovJobItemDetailCustomizePowerItemProps = {
	id: number
	detail: string
	empoweredInputHandler: any
	isChecked: boolean
}
function GovJobItemDetailCustomizePowerItem({id, detail, empoweredInputHandler, isChecked }: GovJobItemDetailCustomizePowerItemProps) {
	return (
		<div css={itemWrapperCSS}>
			<div>{detail}</div>
			<div >
			<CheckBox onChange={(e) => empoweredInputHandler(e, id)} 
        checked={isChecked}/>
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

export default GovJobItemDetailCustomizePowerItem
