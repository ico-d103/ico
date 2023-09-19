import React, { useState, useEffect } from "react"

import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import Input from "@/components/common/Input/Input"

import { useQueryClient, useMutation } from "@tanstack/react-query"

import { postSavingItemAPI } from "@/api/teacher/finance/postSavingItemAPI"

type InvestCreateProps = {
	closeHandler: Function
}

type SavingCreateType = {
	title: string
	count: number
	amount: number
	interest: number[]
}

const FinanceSavingCreate = (props: InvestCreateProps) => {
	const [title, setTitle] = useState("")
	const [count, setCount] = useState<number>(0)
	const [amount, setAmount] = useState<number>(0)
	const [interestRates, setInterestRates] = useState<number[]>(Array(10).fill(0))

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value)
	}

	const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCount(Number(event.target.value))
	}

	const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(Number(event.target.value))
	}

	const handleInterestChange = (index: number, value: number) => {
		const newInterest = [...interestRates]

		// 입력된 값이 유효하지 않은 경우 0으로 초기화
		if (isNaN(value) || value < 0) {
			newInterest[index] = 0
		} else {
			newInterest[index] = value
		}

		setInterestRates(newInterest)
	}

	const queryClient = useQueryClient()

	const mutation = useMutation((newData: SavingCreateType) => postSavingItemAPI({ body: newData }), {
		onSuccess: () => {
			queryClient.invalidateQueries(["teacher", "financeSaving"])
		},
	})

	const handleSubmit = () => {
		const newData = {
			title: title,
			count: count,
			amount: amount,
			interest: interestRates,
		}
		mutation.mutate(newData)
	}

	return (
		<>
			<div css={borderCSS}>
				<div css={titleCSS}>투자 상품 생성</div>
				<div css={investTitlePeriodCSS}>
					<div>
						<div css={subTitleCSS}>투자 상품명</div>
						<Input value={title} onChange={handleTitleChange} theme={"default"} />
					</div>
					<div>
						<div css={subTitleCSS}>투자 횟수</div>
						<Input value={count} onChange={handleCountChange} theme={"default"} />
					</div>
					<div>
						<div css={subTitleCSS}>납입액</div>
						<Input value={amount} onChange={handleAmountChange} theme={"default"} />
					</div>
				</div>

				<div css={subTitleCSS}>신용등급에 따른 이자율</div>
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
								<td style={{ borderRight: "1px solid #d9d9d9", textAlign: "center" }}>이자율</td>
								{interestRates.map((rate, index) => (
									<td key={index}>
										<div>
											<Input
												value={rate}
												onChange={(e) => handleInterestChange(index, parseFloat(e.target.value))}
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
						text={"등록"}
						fontSize={`var(--teacher-h5)`}
						width={"84px"}
						theme={"normal"}
						onClick={() => {
							handleSubmit()
							props.closeHandler && props.closeHandler()
						}}
					/>

					<Button
						text={"취소"}
						fontSize={`var(--teacher-h5)`}
						width={"84px"}
						theme={"cancelDark"}
						onClick={() => {
							props.closeHandler && props.closeHandler()
						}}
					/>
				</div>
			</div>
		</>
	)
}

const borderCSS = css`
	border: 1px solid black;
	border-radius: 20px;
	padding: 20px;
	margin-bottom: 20px;

	& > div:first-of-type {
		margin-bottom: 20px;
	}

	& > div:nth-of-type(2) {
		margin-bottom: 20px;
	}

	& > div:nth-of-type(3) {
		margin-bottom: 10px;
	}

	& > div:nth-of-type(4) {
		margin-bottom: 10px;
	}
`

const titleCSS = css`
	font-size: var(--teacher-h2);
	font-weight: 800;
	text-align: center;
`

const subTitleCSS = css`
	font-size: var(--teacher-h4);
	margin-bottom: 10px;
	font-weight: 550;
`

const investTitlePeriodCSS = css`
	display: flex;
	gap: 30px;

	& > div {
		flex: 1;
	}
`

const buttonCSS = css`
	display: flex;
	justify-content: flex-end;

	gap: 10px;
`

export default FinanceSavingCreate
