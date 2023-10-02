import React, { useState } from "react"
import { css } from "@emotion/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import useNotification from "@/hooks/useNotification"

import { putDepositItemAPI } from "@/api/teacher/finance/putDepositItemAPI"
import { deleteDepositItemAPI } from "@/api/teacher/finance/deleteDepositItemAPI"

import { depositProductType } from "@/types/teacher/apiReturnTypes"

import Input from "@/components/common/Input/Input"
import Button from "@/components/common/Button/Button"
import useModal from "@/components/common/Modal/useModal"
import ModalAlert from "@/components/common/Modal/ModalAlert"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

import FinanceDepositStudentList from "./FinanceDepositStudentList"

type FinanceDepositListProps = {
	data: depositProductType
}

function FinanceDepositList({ data }: FinanceDepositListProps) {
	const [title, setTitle] = useState(data.title)
	const [period, setPeriod] = useState(data.period)
	const [interestRates, setInterestRates] = useState([...data.interest])

	const [initTitle, initSetTitle] = useState(data.title)
	const [initPeriod, initSetPeriod] = useState(data.period)
	const [initInterestRates, initSetInterestRates] = useState([...data.interest])

	const isArraySame = (array1: any, array2: any) => {
		for (let i = 0; i < array1.length; i++) {
			if (array1[i] !== array2[i]) {
				return false
			}
		}
		return true
	}

	const modal = useModal()

	const handleTitleChange = (event: any) => {
		const newValue = event.target.value

		if (newValue.length <= 10) {
			setTitle(newValue)
		}
	}

	const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value
		const numericValue = inputValue.replace(/[^0-9.]/g, "")

		const numericPeriod = parseInt(numericValue, 10)

		if (!isNaN(numericPeriod)) {
			setPeriod(numericPeriod)
		} else {
			setPeriod(0)
		}
	}

	const handleInterestRateChange = (index: number, value: number) => {
		const newInterestRates = [...interestRates]

		if (isNaN(value) || value < 0) {
			newInterestRates[index] = 0
		} else {
			newInterestRates[index] = value
		}

		setInterestRates(newInterestRates)
	}

	const mutation = useMutation(putDepositItemAPI)
	const queryClient = useQueryClient()
	const noti = useNotification()

	const updateDepositItem = async () => {
		try {
			const updatedBody = {
				title: title,
				period: period,
				interest: interestRates,
			}

			await mutation.mutateAsync({ idx: data.id, body: updatedBody })

			initSetTitle(title)
			initSetPeriod(period)
			initSetInterestRates(interestRates)

			noti({
				content: <NotiTemplate type={"ok"} content={"예금 상품을 수정했습니다."} />,
				duration: 5000,
			})
		} catch (error) {
			noti({
				content: <NotiTemplate type={"ok"} content={"신용 등급간 이자율을 확인해주세요"} />,
				duration: 5000,
			})
		}
	}

	const deleteMutation = useMutation(deleteDepositItemAPI, {
		onSuccess: () => {
			queryClient.invalidateQueries(["teacher", "financeDeposit"])
			noti({
				content: <NotiTemplate type={"ok"} content={"예금 상품을 삭제했습니다."} />,
				duration: 5000,
			})
		},
		onError: () => {
			console.log("hello")
		},
	})

	const handleDeleteItem = (itemId: any) => {
		deleteMutation.mutate({ idx: itemId })
	}

	return (
		<div css={borderCSS}>
			{modal(
				<ModalAlert
					title={"예금 상품을 삭제합니다."}
					titleSize={"var(--teacher-h2)"}
					proceed={() => handleDeleteItem(data.id)}
					width={"480px"}
					content={["학생들이 보유한 예금 상품은 전량 매도됩니다."]}
				/>,
			)}

			<div css={depositNamePeriodCSS}>
				<div>
					<div css={titleCSS}>예금 상품명</div>
					<Input
						value={title}
						onChange={handleTitleChange}
						theme={"default"}
						placeholder={"10자 이내의 예금 상품명을 입력해주세요."}
					/>
				</div>
				<div>
					<div css={titleCSS}>예금 상품 기간</div>
					<Input
						value={period === 0 ? "" : period}
						onChange={handlePeriodChange}
						theme={"default"}
						rightContent={"일"}
					/>
				</div>
			</div>
			<div css={titleCSS}>이자율</div>
			<div>
				<table style={{ tableLayout: "fixed", width: "100%" }}>
					<thead style={{ borderBottom: "1px solid #d9d9d9" }}>
						<tr>
							<th style={{ borderRight: "1px solid #d9d9d9" }}>신용등급</th>
							{interestRates.map((_, index) => (
								<th key={index}>{index + 1}등급</th>
							))}
						</tr>
					</thead>
					<tbody>
						<tr>
							<td style={{ borderRight: "1px solid #d9d9d9", textAlign: "center" }}>이자율(%)</td>
							{interestRates.map((rate, index) => (
								<td key={index}>
									<div>
										<Input
											value={rate}
											onChange={(e) => handleInterestRateChange(index, parseFloat(e.target.value))}
											theme={"default"}
											textAlign="center"
										/>
									</div>
								</td>
							))}
						</tr>
					</tbody>
				</table>
			</div>

			<div css={buttonCSS}>
				<Button
					text={"수정하기"}
					fontSize={"var(--teacher-h5)"}
					width={"110px"}
					theme={"normal"}
					onClick={updateDepositItem}
					disabled={
						title === initTitle && period === initPeriod && isArraySame(interestRates, initInterestRates) && true
					}
				/>
				<Button
					text={"삭제하기"}
					fontSize={"var(--teacher-h5)"}
					width={"110px"}
					theme={"warning"}
					onClick={modal.open}
				/>
			</div>

			{data.students && data.students.length > 0 ? (
				<div>
					<div css={titleCSS}>가입자 목록</div>
					<table style={{ tableLayout: "fixed", width: "100%" }}>
						<thead style={{ borderBottom: "1px solid #d9d9d9" }}>
							<tr>
								<th style={{ borderRight: "1px solid #d9d9d9" }} css={tableHeadCSS}>
									이름
								</th>
								<th style={{ borderRight: "1px solid #d9d9d9" }} css={tableHeadCSS}>
									투자금
								</th>
								<th style={{ borderRight: "1px solid #d9d9d9" }} css={tableHeadCSS}>
									만기
								</th>
								<th css={tableHeadCSS}>가입일</th>
							</tr>
						</thead>
						<tbody css={tbodyCSS}>
							{data.students.map((item) => (
								<FinanceDepositStudentList key={item.number} student={item} />
							))}
						</tbody>
					</table>
				</div>
			) : null}
		</div>
	)
}

const tbodyCSS = css`
	tr {
		text-align: center;
		padding-bottom: 50px; /* Add padding instead of margin */
	}
`

const borderCSS = css`
	border: 1px solid black;
	border-radius: 20px;
	padding: 20px;

	margin-top: 20px;

	& > div:first-of-type {
		margin-bottom: 20px;
	}

	& > div:nth-of-type(2) {
		margin-bottom: 10px;
	}

	& > div:nth-of-type(3) {
		margin-bottom: 20px;
	}
`

const titleCSS = css`
	font-size: var(--teacher-h4);
	margin-bottom: 10px;
	font-weight: 550;
`

const depositNamePeriodCSS = css`
	display: flex;
	gap: 30px;

	& > div {
		flex: 1;
	}
`

const tableHeadCSS = css`
	font-size: var(--teacher-h4);
	font-weight: 650;
`

const buttonCSS = css`
	display: flex;
	justify-content: flex-end;

	gap: 10px;
`

export default FinanceDepositList