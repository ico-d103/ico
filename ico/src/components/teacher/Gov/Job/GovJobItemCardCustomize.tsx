import React, { useState } from "react"
import Input from "@/components/common/Input/Input"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import useNotification from "@/hooks/useNotification"
import UseAnimations from "react-useanimations"
import alertTriangle from "react-useanimations/lib/alertTriangle"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import { deleteFinanceDepositAPI } from "@/api/student/finance/deleteFinanceDepositAPI"
import GovJobCard from "./GovJobItemCard"

type GovJobCreateModalProps = {
	closeComp: () => void
	inputState: any
	colorPicker: any
	illustPicker: any
}

function GovJobItemCardCustomize({ closeComp, colorPicker, inputState, illustPicker }: GovJobCreateModalProps) {
	return (
		<div css={wrapperCSS}>
			<div css={cardWrapperCSS}>
				<div css={buttonCSS} onClick={() => illustPicker(true)}>
					〈
				</div>

				<GovJobCard
					job={inputState.job}
					salary={inputState.salary}
					backgroundColor={inputState.color}
					imgUrl={inputState.image}
				/>

				<div css={buttonCSS} onClick={() => illustPicker()}>
					〉
				</div>
			</div>

			<div css={colorPickerWrapperCSS}>{colorPicker}</div>

			<div css={buttonWrapperCSS}>
				<Button
					text={"확인"}
					fontSize={"var(--student-h3)"}
					width={"47%"}
					theme={"positive"}
					onClick={closeComp}
				/>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const colorPickerWrapperCSS = css`
	display: flex;
`

const cardWrapperCSS = css`
	display: flex;
	align-items: center;
`

const buttonWrapperCSS = css`
	width: 100%;
	margin-top: 24px;
	display: flex;
	justify-content: center;
`

const buttonCSS = css`
	font-size: 36px;
	transition-property: color;
	transition-duration: 0.3s;
	user-select: none;
	cursor: pointer;

	& :hover {
		color: rgba(0, 0, 0, 0.6);
	}
`

export default GovJobItemCardCustomize
