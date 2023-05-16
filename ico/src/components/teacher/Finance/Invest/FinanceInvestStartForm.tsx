import { useState } from "react"

import { css } from "@emotion/react"

import useCompHandler from "@/hooks/useCompHandler"

import FormCreator from "../../common/Form/FormCreator"
import FinanceInvestCreate from "./FinanceInvestStartCreate"

function FinanceInvestStartForm() {
	const [openComp, closeComp, compState] = useCompHandler()

	const [stock, setStock] = useState("")
	const [tradingStart, setTradingStart] = useState("")
	const [tradingEnd, setTradingEnd] = useState("")

	const handleStockChange = (event: any) => {
		setStock(event.target.value)
	}

	const handleTradingStartChange = (event: any) => {
		setTradingStart(event.target.value)
	}

	const handleTradingEndChange = (event: any) => {
		setTradingEnd(event.target.value)
	}

	const pushTradingStart = tradingStart + ":00"
	const pushTradingEnd = tradingEnd + ":00"

	return (
		<>
			<div css={contentCSS}>
				<div>
					<div css={titleCSS}>투자 종목 주제</div>
					<input css={inputCSS} style={{ textAlign: "left" }} value={stock} onChange={handleStockChange} />
				</div>
				<div>
					<div css={titleCSS}>거래 시작 시간</div>
					<input type="time" css={inputCSS} value={tradingStart} onChange={handleTradingStartChange} />
				</div>
				<div>
					<div css={titleCSS}>거래 종료 시간</div>
					<input type="time" css={inputCSS} value={tradingEnd} onChange={handleTradingEndChange} />
				</div>
			</div>

			<FormCreator
				subComp={<FinanceInvestCreate stock={stock} tradingStart={pushTradingStart} tradingEnd={pushTradingEnd} />}
				showIdx={1}
				subInit={{ taxation: 0, value: 0 }}
				titlePlaceHolder={"투자 주제를 입력해주세요."}
				contentPlaceHolder={"오늘의 이슈를 입력해주세요."}
				isNoTitle={true}
				compState={compState}
			/>
		</>
	)
}

const contentCSS = css`
	font-size: 1.1rem;
	margin-top: 20px;
	display: flex;
	justify-content: space-between;
	margin-bottom: 15px;

	div:nth-child(1) {
		flex-grow: 3;
		margin-right: 10px;
	}
	div:nth-child(2) {
		flex-grow: 1;
		margin-right: 10px;
		margin-left: 10px;
	}
	div:nth-child(3) {
		flex-grow: 1;
		margin-left: 10px;
	}
`

const titleCSS = css`
	margin-bottom: 10px;
`

const inputCSS = css`
	width: 100%;
	height: 45px;

	border: none;
	background-color: var(--common-back-color);
	border-radius: 10px;
	text-align: center;
	font-size: 1.1rem;
	outline: none;
	padding: 0 15px;
`

export default FinanceInvestStartForm
