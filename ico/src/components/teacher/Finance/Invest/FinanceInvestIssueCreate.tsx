import { css } from "@emotion/react"
import FinanceInvestToggleButton from "./FinanceInvestToggleButton"
import React, { useEffect, useState } from "react"
import Dropdown from "@/components/common/Dropdown/Dropdown"
import useCompHandler from "@/hooks/useCompHandler"
import { postInvestItemAPI } from "@/api/teacher/finanace/postInvestItemAPI"

function FinanceInvestIssueCreate({
	subInputChangeHandler,
	inputState,
	buttons,
	price,
}: {
	subInputChangeHandler?: any
	inputState?: any
	buttons?: any
	price?: any
}) {
	const [openDropdown, closeDropdown, dropdownState] = useCompHandler()

	const pushInvestIssue = async () => {
		postInvestItemAPI({
			body: {
				amount: inputState?.sub.value,
				content: inputState?.content,
				price: price,
			},
		})
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const submitHandler = () => {
		pushInvestIssue()
	}

	const setTaxPercent = () => {
		subInputChangeHandler && subInputChangeHandler({ key: "taxation", value: 0 })
		subInputChangeHandler && subInputChangeHandler({ key: "value", value: 0 })
	}

	const setTaxAbsolute = () => {
		subInputChangeHandler && subInputChangeHandler({ key: "taxation", value: 1 })
		subInputChangeHandler && subInputChangeHandler({ key: "value", value: 0 })
	}

	const dropdownList = [
		{
			name: "edit",
			content: <div css={iconBlackWrapperCSS}>사과</div>,
			label: "상승",
			function: setTaxPercent,
		},
		{
			name: "delete",
			content: <div css={iconBlackWrapperCSS}>사과</div>,
			label: "하락",
			function: setTaxAbsolute,
		},
	]

	const taxPercent = <div css={taxationSelectCSS}>상승</div>
	const taxAbsolute = <div css={taxationSelectCSS}>하락</div>

	const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (
			(inputState?.sub.taxation === 0 && Number(event.target.value) <= 100) ||
			(inputState?.sub.taxation === 1 && Number(event.target.value) <= 100)
		) {
			subInputChangeHandler && subInputChangeHandler({ key: "value", event })
		}
	}

	return (
		<>
			<div css={footerWrapperCSS}>
				<div css={addInfoWrapperCSS}>
					<div css={taxationSelectWrapperCSS} onClick={openDropdown}>
						<Dropdown
							compState={dropdownState}
							closeComp={closeDropdown}
							width={"100px"}
							height={"48px"}
							element={dropdownList}
							align={"left"}
						/>
						{inputState?.sub.taxation === 0 ? taxPercent : taxAbsolute}
					</div>
					<div css={taxValueInputWrapperCSS}>
						<input
							value={inputState?.sub.value}
							onChange={(event) => {
								inputHandler(event)
							}}
							type={"number"}
							css={taxInputCSS}
						/>
						%
					</div>
				</div>
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

const taxationSelectWrapperCSS = css`
	position: relative;
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 10px;
	transition-property: background-color;
	transition-duration: 0.3s;
	margin-right: 8px;

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

const submitWrapperCSS = css`
	display: flex;
`

const taxationSelectCSS = css`
	height: 40px;
	width: 100px;

	display: flex;
	padding-left: 20px;
	/* justify-content:center; */
	align-items: center;
	color: var(--common-back-color-2);
	cursor: pointer;
	user-select: none;
`

const iconCSS = css`
	margin-right: 6px;
`

const iconBlackWrapperCSS = css`
	& path {
		stroke: rgba(0, 0, 0, 0.8);
	}
`

export default FinanceInvestIssueCreate
