import React, { useState } from "react"
import { css } from "@emotion/react"

import { putInvestTimeAPI } from "@/api/teacher/finance/putInvestTimeAPI"

import Input from "@/components/common/Input/Input"
import Button from "@/components/common/Button/Button"

function FinanceInvestTradingTime(data: any) {
	const [tradingStart, setTradingStart] = useState(data.tradingStart)
	const [tradingEnd, setTradingEnd] = useState(data.tradingEnd)

	if (!data) {
		return null
	}

	const [initTradingStart, setInitTradingStart] = useState(data.tradingStart)
	const [initTradingEnd, setInitTradingEnd] = useState(data.tradingEnd)

	const updateInvestTime = () => {
		putInvestTimeAPI({ body: { tradingStart: tradingStart, tradingEnd: tradingEnd } })

		setInitTradingStart(tradingStart)
		setInitTradingEnd(tradingEnd)
	}

	const handleTradingStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTradingStart(event.target.value)
	}

	const handleTradingEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTradingEnd(event.target.value)
	}

	return (
		<>
			<div css={tradingTimeCSS}>
				<div>
					<div>현재 거래 가능 시간은</div>
					<Input
						type="time"
						theme={"greenDefault"}
						customCss={css`
							width: 175px;
						`}
						value={tradingStart}
						onChange={handleTradingStartChange}
					/>
					<div>부터</div>
					<Input
						type="time"
						theme={"greenDefault"}
						customCss={css`
							width: 175px;
						`}
						value={tradingEnd}
						onChange={handleTradingEndChange}
					/>
					<div>까지 입니다.</div>
				</div>

				<div>
					<Button
						text={"거래 가능 시간 변경"}
						fontSize={"var(--teacher-h5)"}
						width={"160px"}
						height={"45px"}
						theme={"white"}
						onClick={updateInvestTime}
						disabled={tradingStart === initTradingStart && tradingEnd === initTradingEnd && true}
					/>
				</div>
			</div>
		</>
	)
}

const tradingTimeCSS = css`
	display: flex;
	justify-content: space-between;

	& > div {
		font-size: 24px;
	}

	&>div: first-of-type {
		display: flex;
		align-items: center;
		gap: 10px;
	}
`

export default FinanceInvestTradingTime
