import React, { useState } from "react"
import Input from "@/components/common/Input/Input"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import useNotification from "@/hooks/useNotification"
import UseAnimations from "react-useanimations"
import alertTriangle from "react-useanimations/lib/alertTriangle"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import { deleteFinanceDepositAPI } from "@/api/student/finance/deleteFinanceDepositAPI"
import GovJobCard from "./GovJobCard"
import { certificationType } from "./GovJobItemType"
import GovJobItemCertItem from "./GovJobItemCertItem"

type GovJobItemCardCustomizeProps = {
	closeComp: Function
	certification: certificationType[]
	ratingHandler: any
}

function GovJobItemDetailCustomize({ certification, ratingHandler, closeComp  }: GovJobItemCardCustomizeProps) {
	const renderCertField = certification?.map((el, idx) => {
		return (
			<GovJobItemCertItem
				arrIdx={idx}
				id={el.id}
				subject={el.subject}
				rating={el.rating}
				ratingHandler={ratingHandler}
			/>
		)
	})
	return (
		<div css={wrapperCSS}>
			<div css={cardWrapperCSS}>
				<div css={certInnerFieldCSS}>
					{renderCertField}
				</div>
				
			</div>
			<div css={buttonWrapperCSS}>
				<Button
					text={"확인"}
					fontSize={"var(--student-h3)"}
					width={"47%"}
					theme={"positive"}
					onClick={() => {
						closeComp()
					}}
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

const certInnerFieldCSS = css`
	min-height: 200px;
	height: 1px;
	overflow-y: scroll;
	background-color: white;;
	border-radius: 10px;;
	padding: 8px;
`




export default GovJobItemDetailCustomize
