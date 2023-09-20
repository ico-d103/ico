import React, { useState, useEffect } from "react"

import { postDepositItemAPI } from "@/api/teacher/finance/postDepositItemAPI"
import { css } from "@emotion/react"
import Input from "@/components/common/Input/Input"

import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import Button from "@/components/common/Button/Button"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

type DepositCreateProps = {
	closeHandler: Function
}

type DepositData = {
	title: string
	period: number
	interest: number[]
}

function FinanceDepositCreate(props: DepositCreateProps) {
	const [title, setTitle] = useState("")
	const [period, setPeriod] = useState(0)
	const [interestRates, setInterestRates] = useState<number[]>(Array(10).fill(0))

	const handleTitleChange = (event: any) => {
		const newValue = event.target.value

		if (newValue.length <= 10) {
			setTitle(newValue)
		}
	}

	const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value
		const numericValue = inputValue.replace(/[^0-9.]/g, "") // 숫자와 "."만 추출

		// numericValue가 숫자로 변환 가능한지 확인
		const numericPeriod = parseInt(numericValue, 10) // 정수로 변환

		// isNaN 함수를 사용하여 숫자로 변환 가능한지 확인
		if (!isNaN(numericPeriod)) {
			setPeriod(numericPeriod) // 숫자로 설정
		} else {
			setPeriod(0) // 숫자로 변환할 수 없는 경우 0으로 설정 또는 다른 기본값 설정
		}
	}

	const handleInterestRateChange = (index: number, value: number) => {
		const newInterestRates = [...interestRates]

		// 입력된 값이 유효하지 않은 경우 0으로 초기화
		if (isNaN(value) || value < 0) {
			newInterestRates[index] = 0
		} else {
			newInterestRates[index] = value
		}

		setInterestRates(newInterestRates)
	}

	const queryClient = useQueryClient()
	const noti = useNotification()

	const mutation = useMutation((newData: DepositData) => postDepositItemAPI({ body: newData }), {
		onSuccess: () => {
			queryClient.invalidateQueries(["teacher", "financeDeposit"])
		},
	})

	const handleSubmit = () => {
		const newData = {
			title: title,
			period: period,
			interest: interestRates,
		}
		mutation.mutate(newData)

		noti({
			content: <NotiTemplate type={"ok"} content={"예금 상품을 등록했습니다."} />,
			duration: 5000,
		})

		setTitle("")
		setPeriod(0)
		setInterestRates(Array(10).fill(0))
	}

	return (
		<>
			<div css={borderCSS}>
				<div css={titleCSS}> 예금 상품 생성</div>
				<div css={depositNamePeriodCSS}>
					<div>
						<div css={subTitleCSS}>예금 상품명</div>
						<Input
							value={title}
							onChange={handleTitleChange}
							theme={"default"}
							placeholder="10자 이내의 예금 상품명을 입력해주세요."
						/>
					</div>
					<div>
						<div css={subTitleCSS}>예금 상품 기간</div>
						<Input
							value={period === 0 ? "" : period}
							onChange={handlePeriodChange}
							theme={"default"}
							rightContent={"일"}
						/>
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
						text={"추가"}
						fontSize={"var(--teacher-h5)"}
						width={"110px"}
						theme={"normal"}
						onClick={() => {
							handleSubmit()
							props.closeHandler && props.closeHandler()
						}}
					/>
					<Button
						text={"취소"}
						fontSize={"var(--teacher-h5)"}
						width={"110px"}
						theme={"warning"}
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

const depositNamePeriodCSS = css`
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

export default FinanceDepositCreate
