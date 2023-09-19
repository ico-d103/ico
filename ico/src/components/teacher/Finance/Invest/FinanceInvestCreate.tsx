import React, { useState, useEffect } from "react"

import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import Input from "@/components/common/Input/Input"

import { useQueryClient, useMutation } from "@tanstack/react-query"

import { postInvestItemAPI } from "@/api/teacher/finance/postInvestItemAPI"

type InvestCreateProps = {
	closeHandler: Function
}

type InvestCreateType = {
	title: string
	content: string
	amount: string
	issue: string
}

const FinanceInvestCreate = (props: InvestCreateProps) => {
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")
	const [issue, setIssue] = useState("")
	const [amount, setAmount] = useState("")

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value)
	}

	const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setContent(event.target.value)
	}

	const handleIssueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIssue(event.target.value)
	}

	const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(event.target.value)
	}

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
						<Input value={amount} onChange={handleAmountChange} theme={"default"} />
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
