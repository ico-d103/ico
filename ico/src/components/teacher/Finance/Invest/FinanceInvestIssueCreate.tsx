import { css } from "@emotion/react"
import FinanceInvestToggleButton from "../Legacy/FinanceInvestToggleButton"
import React, { useEffect, useState } from "react"
import Dropdown from "@/components/common/Dropdown/Dropdown"
import useCompHandler from "@/hooks/useCompHandler"
import { postInvestItemAPI } from "@/api/teacher/finance/postInvestItemAPI"
import { useQueryClient } from "@tanstack/react-query"
import { useMutation, useQuery } from "@tanstack/react-query"

import { putInvestIssueAPI } from "@/api/teacher/finance/putInvestIssueAPI"

function FinanceInvestIssueCreate({
	subInputChangeHandler,
	inputState,
	buttons,
	closeHandler,
	price,
	amount,
	id,
}: {
	subInputChangeHandler?: any
	inputState?: any
	buttons?: any
	closeHandler?: Function
	price?: number
	amount?: any
	id: number
}) {
	const queryClient = useQueryClient()
	// 투자 이슈 등록은 put method로 바꿔줘야 하고 content랑 price만 받는다. 밑에 대충만 만듬
	// const createMutation = useMutation((a: number) =>
	// 	postInvestItemAPI({ body: { amount: inputState?.sub.value, content: inputState?.content, price: price } }),
	// )
	const [openDropdown, closeDropdown, dropdownState] = useCompHandler()

	const updateMutation = useMutation((idx: number) =>
		putInvestIssueAPI({
			idx,
			body: { content: inputState.content, price: Number(price) + Number(inputState.sub.value) },
		}),
	)

	const submitHandler = () => {
		if (inputState?.sub.taxation === 1) {
			subInputChangeHandler && subInputChangeHandler({ key: "value", value: -inputState?.sub.value })
		}

		updateMutation.mutate(id, {
			onSuccess: () => {
				closeHandler && closeHandler()
				return queryClient.invalidateQueries(["teacher", id])
			},
		})
	}

	const setIssueRise = () => {
		subInputChangeHandler && subInputChangeHandler({ key: "taxation", value: 0 })
		subInputChangeHandler && subInputChangeHandler({ key: "value", value: 0 })
	}

	const setIssueFall = () => {
		subInputChangeHandler && subInputChangeHandler({ key: "taxation", value: 1 })
		subInputChangeHandler && subInputChangeHandler({ key: "value", value: 0 })
	}

	const dropdownList = [
		{
			name: "rise ",
			content: (
				<div css={iconBlackWrapperCSS}>
					<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M5.8 19C5.51997 19 5.37996 19 5.273 18.9455C5.17892 18.8976 5.10243 18.8211 5.0545 18.727C5 18.62 5 18.48 5 18.2V8H1L8 1L15 8H11V18.2C11 18.48 11 18.62 10.9455 18.727C10.8976 18.8211 10.8211 18.8976 10.727 18.9455C10.62 19 10.48 19 10.2 19H5.8Z"
							stroke="#D94A4A"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					&nbsp;
				</div>
			),
			label: "상승",
			function: setIssueRise,
		},
		{
			name: "fall",
			content: (
				<div css={iconBlackWrapperCSS}>
					<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M5 1.8C5 1.51997 5 1.37996 5.0545 1.273C5.10243 1.17892 5.17892 1.10243 5.273 1.0545C5.37996 1 5.51997 1 5.8 1H10.2C10.48 1 10.62 1 10.727 1.0545C10.8211 1.10243 10.8976 1.17892 10.9455 1.273C11 1.37996 11 1.51997 11 1.8V12H15L8 19L1 12H5V1.8Z"
							stroke="#1e7bff"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					&nbsp;
				</div>
			),
			label: "하락",
			function: setIssueFall,
		},
	]

	const taxPercent = (
		<div css={taxationSelectCSS}>
			<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M5.8 19C5.51997 19 5.37996 19 5.273 18.9455C5.17892 18.8976 5.10243 18.8211 5.0545 18.727C5 18.62 5 18.48 5 18.2V8H1L8 1L15 8H11V18.2C11 18.48 11 18.62 10.9455 18.727C10.8976 18.8211 10.8211 18.8976 10.727 18.9455C10.62 19 10.48 19 10.2 19H5.8Z"
					fill="#D94A4A"
					stroke="rgba(255, 255, 255, 0.4	)"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			&nbsp; 상승
		</div>
	)

	const taxAbsolute = (
		<div css={taxationSelectCSS}>
			<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M5 1.8C5 1.51997 5 1.37996 5.0545 1.273C5.10243 1.17892 5.17892 1.10243 5.273 1.0545C5.37996 1 5.51997 1 5.8 1H10.2C10.48 1 10.62 1 10.727 1.0545C10.8211 1.10243 10.8976 1.17892 10.9455 1.273C11 1.37996 11 1.51997 11 1.8V12H15L8 19L1 12H5V1.8Z"
					fill="#1e7bff"
					stroke="rgba(255, 255, 255, 0.4	)"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			&nbsp; 하락
		</div>
	)

	const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (
			(inputState?.sub.taxation === 0 && Number(event.target.value) <= 100) ||
			(inputState?.sub.taxation === 1 && Number(event.target.value) <= 100)
		) {
			subInputChangeHandler && subInputChangeHandler({ key: "value", event })
		}
	}

	console.log(inputState.sub.value)

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
	stroke: rgba(0, 0, 0, 0.8);
`

export default FinanceInvestIssueCreate
