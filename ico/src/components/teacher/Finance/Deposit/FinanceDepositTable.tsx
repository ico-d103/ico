import React, { useState } from "react"
import { css } from "@emotion/react"
import TableGenerator from "../../common/TableGenerator/TableGenerator"
import Button from "@/components/common/Button/Button"

function FinanceDepositTable() {
	const dayList = ["", "7일", "21일"]
	const gradeList = ["1등급", "2등급", "3등급", "4등급", "5등급", "6등급", "7등급", "8등급", "9등급", "10등급"]

	const [test, setTest] = useState([
		{ value: 15, editable: false },
		{ value: 12, editable: false },
		{ value: 10, editable: false },
		{ value: 8, editable: false },
		{ value: 6, editable: false },
		{ value: 5, editable: false },
		{ value: 4, editable: false },
		{ value: 3, editable: false },
		{ value: 0, editable: false },
		{ value: 0, editable: false },
	])

	const [test2, setTest2] = useState([
		{ value: 40, editable: false },
		{ value: 35, editable: false },
		{ value: 30, editable: false },
		{ value: 26, editable: false },
		{ value: 22, editable: false },
		{ value: 19, editable: false },
		{ value: 16, editable: false },
		{ value: 13, editable: false },
		{ value: 10, editable: false },
		{ value: 10, editable: false },
	])

	const [isEditing, setIsEditing] = useState(false)

	const creditRating = [
		[dayList[0], ...gradeList],
		[
			dayList[1],
			...test.map((item) =>
				item.editable ? (
					<input
						css={inputCSS}
						// type="number"
						value={item.value}
						onChange={(e) => {
							item.value = parseInt(e.target.value)
							setTest([...test])
						}}
					/>
				) : (
					item.value
				),
			),
		],
		[
			dayList[2],
			...test2.map((item) =>
				item.editable ? (
					<input
						css={inputCSS}
						// type="number"
						value={item.value}
						onChange={(e) => {
							item.value = parseInt(e.target.value)
							setTest2([...test2])
						}}
					/>
				) : (
					item.value
				),
			),
		],
	]

	const editDepositTable = () => {
		setTest(test.map((item) => ({ ...item, editable: true })))
		setTest2(test2.map((item) => ({ ...item, editable: true })))

		setIsEditing(true)
	}

	const saveDepositTable = () => {
		setTest(test.map((item) => ({ ...item, editable: false })))
		setTest2(test2.map((item) => ({ ...item, editable: false })))

		setIsEditing(false)
	}

	return (
		<>
			<TableGenerator table={creditRating} perHeight={"48px"} />
			<div css={buttonCSS}>
				<Button
					text={isEditing ? "저장하기" : "수정하기"}
					fontSize={`var(--teacher-h4)`}
					width={"190px"}
					theme={"normal"}
					onClick={isEditing ? saveDepositTable : editDepositTable}
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
