import { css } from "@emotion/react"
import FinanceInvestToggleButton from "./FinanceInvestToggleButton"

function FinanceInvestCreate({
	subInputChangeHandler,
	inputState,
	buttons,
}: {
	subInputChangeHandler?: any
	inputState?: any
	buttons?: any
}) {
	const submitHandler = () => {
		// 제출 함수
	}

	const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (inputState?.sub.taxation === 0 && Number(event.target.value) <= 20) {
			subInputChangeHandler && subInputChangeHandler({ key: "value", event })
		}
	}

	return (
		<>
			<div css={footerWrapperCSS}>
				<div css={addInfoWrapperCSS}>
					<div css={taxValueInputWrapperCSS}>
						<input
							value={inputState?.sub.value}
							onChange={(event) => {
								inputHandler(event)
							}}
							type={"number"}
							min={1}
							max={20}
							css={taxInputCSS}
						/>
						%
					</div>
				</div>
				<FinanceInvestToggleButton leftLabel="판매" rightLabel="대여" />
			</div>
			{buttons(submitHandler)}
		</>
	)
}

const footerWrapperCSS = css`
	display: flex;
`

const taxValueInputWrapperCSS = css`
	height: 40px;
	width: 100px;
	color: var(--common-back-color-2);
	display: flex;
	box-sizing: border-box;
	padding: 8px;
	justify-content: end;
	align-items: center;
	position: relative;
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 10px;
	transition-property: background-color;
	transition-duration: 0.3s;
	white-space: nowrap;
	&:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}
`

const taxInputCSS = css`
	width: 100%;
	height: 100%;
	background-color: rgba(255, 255, 255, 0);
	border: none;
	outline: none;
	color: var(--common-back-color-2);
	text-align: right;
	&::-webkit-inner-spin-button {
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
	}
`

const addInfoWrapperCSS = css`
	display: flex;
	margin-right: 10px;
`

export default FinanceInvestCreate
