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
import { jobLicenseListType } from "@/types/teacher/apiReturnTypes"
import GovJobItemDetailCustomizeCertItem from "./GovJobItemDetailCustomizeCertItem"
import { empoweredType, getGovPowerType } from "@/types/teacher/apiReturnTypes"
import GovJobItemDetailCustomizePowerItem from "./GovJobItemDetailCustomizePowerItem"

type GovJobItemCardCustomizeProps = {
	closeComp: () => void
	jobLicenseList: jobLicenseListType[]
	ratingHandler: any
	empowered: empoweredType[]
	powerList: getGovPowerType[]
	empoweredInputHandler: Function
}

function GovJobItemDetailCustomize({
	jobLicenseList,
	ratingHandler,
	empoweredInputHandler,
	closeComp,
	empowered,
	powerList,
}: GovJobItemCardCustomizeProps) {
	const renderCertField = jobLicenseList?.map((el, idx) => {
		return (
			<GovJobItemDetailCustomizeCertItem
				arrIdx={idx}
				id={el.id}
				subject={el.subject}
				rating={el.rating}
				ratingHandler={ratingHandler}
			/>
		)
	})

	const renderPowerField = powerList.map((el, idx) => {
		const isChecked = empowered.includes(String(el.id))
		return (
			<GovJobItemDetailCustomizePowerItem
				isChecked={isChecked}
				id={el.id}
				detail={el.detail}
				empoweredInputHandler={empoweredInputHandler}
			/>
		)
	})

	return (
		<div css={wrapperCSS}>
			<div css={cardWrapperCSS}>
				<div css={certInnerFieldCSS}>{renderCertField}</div>
				<div css={certInnerFieldCSS}>{renderPowerField}</div>
			</div>
			<div css={buttonWrapperCSS}>
				<Button text={"확인"} fontSize={"var(--student-h3)"} width={"47%"} theme={"positive"} onClick={closeComp} />
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
	gap: 16px;
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
	background-color: white;
	border-radius: 10px;
	padding: 8px;
`

export default GovJobItemDetailCustomize
