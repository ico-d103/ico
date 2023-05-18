import React, { useState, useEffect } from "react"
import { css } from "@emotion/react"
import TableGenerator from "../../../common/TableGenerator/TableGenerator"
import Button from "@/components/common/Button/Button"

import { getDepositInterestListAPI } from "@/api/teacher/finanace/getDepositInterestListAPI"
import { putDepositInterestListAPI } from "@/api/teacher/finanace/putDepositInterestListAPI"
import Input from "@/components/common/Input/Input"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

function FinanceDepositTable() {
	const [longPeriod, setLongPeriod] = useState<string[]>([])
	const [shortPeriod, setShortPeriod] = useState<string[]>([])
	const [longInitValue, setLongInitValue] = useState<string[]>([])
	const [shortInitValue, setShortInitValue] = useState<string[]>([])
	const noti = useNotification()

	useEffect(() => {
		getDepositInterestListAPI().then((res) => {
			setLongPeriod(res.longPeriod)
			setShortPeriod(res.shortPeriod)
		})
	}, [])


	useEffect(() => {
		setLongInitValue(longPeriod)
		setShortInitValue(shortPeriod)
	}, [longPeriod.length === 0 && shortPeriod.length === 0])

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
			noti({content: <NotiTemplate type={'ok'} content={`이자율 수정이 완료되었습니다!`}/>, duration: 3000})
			setLongInitValue(longPeriod)
			setShortInitValue(shortPeriod)
			console.log(res)
		})
		.catch((error) => {
			noti({content: <NotiTemplate type={'alert'} content={`${error.response.data.message}`}/>, duration: 5000})
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
					disabled={(longInitValue === longPeriod && shortInitValue === shortPeriod) &&  true}
				/>
			</div>
		</>
	)
}

const inputCSS = css`
	width: 100%;
	height: 100%;
	border: none;
	font-size: 1rem;
	text-align: center;
	background-color: rgba(0, 0, 0, 0);
	
	transition-property: background-color box-shadow font-weight;
	transition-duration: 0.3s;

	& :focus {
		outline: none;
		background-color: rgba(0, 0, 0, 0.05);
		box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.4);
		font-weight: 700;
	}
`

const buttonCSS = css`
	display: flex;
	justify-content: end;

	margin-top: 20px;
`
export default FinanceDepositTable
