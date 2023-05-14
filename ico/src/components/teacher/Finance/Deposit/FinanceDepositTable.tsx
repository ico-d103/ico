import React, { useState, useEffect } from "react"
import { css } from "@emotion/react"
import TableGenerator from "../../../common/TableGenerator/TableGenerator"
import Button from "@/components/common/Button/Button"

import { getDepositInterestListAPI } from "@/api/teacher/finanace/getDepositInterestListAPI"
import { putDepositInterestListAPI } from "@/api/teacher/finanace/putDepositInterestListAPI"

function FinanceDepositTable() {
	const [longPeriod, setLongPeriod] = useState<string[]>([])
	const [shortPeriod, setShortPeriod] = useState<string[]>([])

	useEffect(() => {
		getDepositInterestListAPI().then((res) => {
			setLongPeriod(res.longPeriod)
			setShortPeriod(res.shortPeriod)
		})
	}, [])

	const handleShortPeriodChange = (index: number, value: string) => {
		const newShortPeriod = [...shortPeriod]
		newShortPeriod[index] = value
		setShortPeriod(newShortPeriod)
	}

	const handleLongPeriodChange = (index: number, value: string) => {
		const newLongPeriod = [...longPeriod]
		newLongPeriod[index] = value
		setLongPeriod(newLongPeriod)
	}

	const creditRating = [
		["등급", "1등급", "2등급", "3등급", "4등급", "5등급", "6등급", "7등급", "8등급", "9등급", "10등급"],
		[
			"7일",
			...shortPeriod.map((value, index) => (
				<input
					css={inputCSS}
					type="text"
					value={value}
					onChange={(e) => handleShortPeriodChange(index, e.target.value)}
				/>
			)),
		],
		[
			"21일",
			...longPeriod.map((value, index) => (
				<input
					css={inputCSS}
					key={`long-${index}`}
					type="text"
					value={value}
					onChange={(e) => handleLongPeriodChange(index, e.target.value)}
				/>
			)),
		],
	]

	const pushInterst = () => {
		putDepositInterestListAPI({ body: { shortPeriod: shortPeriod, longPeriod: longPeriod } }).then((res) => {
			console.log(res)
		})
	}

	console.log(longPeriod, shortPeriod)

	return (
		<>
			<TableGenerator table={creditRating} perHeight={"48px"} />
			<div css={buttonCSS}>
				<Button
					text={"이자율 저장"}
					fontSize={`var(--teacher-h4)`}
					width={"190px"}
					theme={"normal"}
					onClick={pushInterst}
				/>
			</div>
		</>
	)
}

const inputCSS = css`
	width: 95%;
	height: 95%;
	border: none;
	font-size: 1rem;
	text-align: center;
`

const buttonCSS = css`
	display: flex;
	justify-content: end;

	margin-top: 20px;
`
export default FinanceDepositTable
