import React, { useState } from "react"
import { css } from "@emotion/react"
import { useQueryClient, useMutation } from "@tanstack/react-query"

import useNotification from "@/hooks/useNotification"
import useGetNation from "@/hooks/useGetNation"

import { postInvestItemAPI } from "@/api/teacher/finance/postInvestItemAPI"

import Button from "@/components/common/Button/Button"
import Input from "@/components/common/Input/Input"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

type InvestCreateProps = {
	closeHandler: Function
}

type InvestCreateType = {
	title: string
	content: string
	amount: number
	issue: string
}

const FinanceInvestCreate = (props: InvestCreateProps) => {
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")
	const [issue, setIssue] = useState("")
	const [amount, setAmount] = useState(0)

	const [nation] = useGetNation()

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value

		if (newValue.length <= 10) {
			setTitle(newValue)
		}
	}

	const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setContent(event.target.value)
	}

	const handleIssueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIssue(event.target.value)
	}

	const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value
		const numericValue = inputValue.replace(/[^0-9.]/g, "") // 숫자와 "."만 추출

		// numericValue가 숫자로 변환 가능한지 확인
		const numericPeriod = parseInt(numericValue, 10) // 정수로 변환

		// isNaN 함수를 사용하여 숫자로 변환 가능한지 확인
		if (!isNaN(numericPeriod)) {
			setAmount(numericPeriod) // 숫자로 설정
		} else {
			setAmount(0) // 숫자로 변환할 수 없는 경우 0으로 설정 또는 다른 기본값 설정
		}
	}

	const noti = useNotification()
	const queryClient = useQueryClient()

	const mutation = useMutation((newData: InvestCreateType) => postInvestItemAPI({ body: newData }), {
		onSuccess: () => {
			queryClient.invalidateQueries(["teacher", "financeInvest"])
		},
	})

	const handleSubmit = () => {
		const newData = {
			title: title,
			content: content,
			amount: amount,
			issue: issue,
		}
		mutation.mutate(newData)

		noti({
			content: <NotiTemplate type={"ok"} content={"예금 상품을 등록했습니다."} />,
			duration: 5000,
		})

		setTitle("")
		setContent("")
		setAmount(0)
		setIssue("")
	}

	return (
		<>
			<div css={borderCSS}>
				<div css={titleCSS}>투자 상품 생성</div>
				<div css={investTitlePeriodCSS}>
					<div>
						<div css={subTitleCSS}>투자 상품명</div>
						<Input
							value={title}
							onChange={handleTitleChange}
							theme={"default"}
							placeholder="10자 이내의 투자 상품명을 입력해주세요."
						/>
					</div>
					<div>
						<div css={subTitleCSS}>투자 상품 설명</div>
						<Input value={content} onChange={handleContentChange} theme={"default"} />
					</div>
				</div>

				<div css={investTitlePeriodCSS}>
					<div>
						<div css={subTitleCSS}>첫번째 이슈</div>
						<Input value={issue} onChange={handleIssueChange} theme={"default"} />
					</div>
					<div>
						<div css={subTitleCSS}>투자 시작가</div>
						<Input
							value={amount === 0 ? "" : amount}
							onChange={handleAmountChange}
							theme={"default"}
							rightContent={nation.currency}
						/>
					</div>
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

export default FinanceInvestCreate
