import React from "react"
import useCompHandler from "@/hooks/useCompHandler"
import { css } from "@emotion/react"
import Dropdown from "@/components/common/Dropdown/Dropdown"
import { useQueryClient } from '@tanstack/react-query';
import { useMutation, useQuery } from "@tanstack/react-query";
import { postGovExchequerAPI } from "@/api/teacher/gov/postGovExchequerAPI";
import { putGovExchequerAPI } from "@/api/teacher/gov/putGovExchequerAPI";

function GovExchequerCreate({
	subInputChangeHandler,
	inputState,
	buttons,
	closeHandler,
	idx,
}: {
	subInputChangeHandler?: any
	inputState?: any
	buttons?: any
	closeHandler?: Function
	idx?: number
}) {
	const [openDropdown, closeDropdown, dropdownState] = useCompHandler()

	


	const queryClient = useQueryClient();
	const createMutation = useMutation((a: number) => postGovExchequerAPI({body: {title: inputState.title, detail: inputState.content, type: inputState.sub.taxation, amount: inputState.sub.value}}));
	const updateMutation = useMutation((idx: number) => putGovExchequerAPI({idx, body: {title: inputState.title, detail: inputState.content, type: inputState.sub.taxation, amount: inputState.sub.value}}));


	const submitHandler = () => {
		if (typeof idx === 'number') {
			updateMutation.mutate(idx, {
				onSuccess: formData => {
					closeHandler && closeHandler()
				  return queryClient.invalidateQueries(["teacher", "govExchequer"]); // 'return' wait for invalidate
				}})
		} else {
			createMutation.mutate(1, {
				onSuccess: formData => {
					closeHandler && closeHandler()
				  return queryClient.invalidateQueries(["teacher", "govExchequer"]); // 'return' wait for invalidate
				}})
		}
	}


	const taxPercentIcon = (
		<svg css={iconCSS} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M9 1.87494V8.99994M9 8.99994L15.375 5.45822M9 8.99994L2.625 5.45822M9 8.99994V16.1249M15.375 12.5416L9.58277 9.3237C9.37007 9.20553 9.26372 9.14645 9.15109 9.12329C9.05141 9.10278 8.9486 9.10278 8.84891 9.12329C8.73628 9.14645 8.62993 9.20553 8.41723 9.3237L2.625 12.5416M15.75 12.0439V5.95603C15.75 5.69904 15.75 5.57055 15.7121 5.45595C15.6786 5.35457 15.6239 5.26151 15.5515 5.18299C15.4697 5.09424 15.3574 5.03184 15.1328 4.90704L9.58277 1.8237C9.37007 1.70553 9.26372 1.64645 9.15109 1.62329C9.05141 1.60278 8.9486 1.60278 8.84891 1.62329C8.73628 1.64645 8.62993 1.70553 8.41723 1.8237L2.86723 4.90704C2.64259 5.03184 2.53026 5.09424 2.44847 5.18299C2.37612 5.26151 2.32136 5.35457 2.28786 5.45595C2.25 5.57055 2.25 5.69904 2.25 5.95603V12.0439C2.25 12.3008 2.25 12.4293 2.28786 12.5439C2.32136 12.6453 2.37612 12.7384 2.44847 12.8169C2.53026 12.9056 2.64259 12.968 2.86723 13.0928L8.41723 16.1762C8.62993 16.2943 8.73628 16.3534 8.84891 16.3766C8.9486 16.3971 9.05141 16.3971 9.15109 16.3766C9.26372 16.3534 9.37007 16.2943 9.58277 16.1762L15.1328 13.0928C15.3574 12.968 15.4697 12.9056 15.5515 12.8169C15.6239 12.7384 15.6786 12.6453 15.7121 12.5439C15.75 12.4293 15.75 12.3008 15.75 12.0439Z"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)

	const taxAbsoluteIcon = (
		<svg css={iconCSS} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M15.375 12H6M6 12V2.625M6 12L2.625 15.375M2.625 6H12M12 6V15.375M12 6L15.375 2.625M15.75 11.5029V2.85C15.75 2.63998 15.75 2.53497 15.7091 2.45475C15.6732 2.38419 15.6158 2.32683 15.5452 2.29087C15.465 2.25 15.36 2.25 15.15 2.25H6.49706C6.31361 2.25 6.22189 2.25 6.13558 2.27072C6.05905 2.2891 5.98589 2.3194 5.91879 2.36052C5.8431 2.4069 5.77824 2.47176 5.64853 2.60147L2.60147 5.64853C2.47176 5.77824 2.4069 5.8431 2.36052 5.91879C2.3194 5.98589 2.2891 6.05905 2.27072 6.13558C2.25 6.22189 2.25 6.31361 2.25 6.49706V15.15C2.25 15.36 2.25 15.465 2.29087 15.5452C2.32683 15.6158 2.38419 15.6732 2.45475 15.7091C2.53497 15.75 2.63998 15.75 2.85 15.75H11.5029C11.6864 15.75 11.7781 15.75 11.8644 15.7293C11.941 15.7109 12.0141 15.6806 12.0812 15.6395C12.1569 15.5931 12.2218 15.5282 12.3515 15.3985L15.3985 12.3515C15.5282 12.2218 15.5931 12.1569 15.6395 12.0812C15.6806 12.0141 15.7109 11.941 15.7293 11.8644C15.75 11.7781 15.75 11.6864 15.75 11.5029Z"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)

	const setTaxPercent = () => {
		subInputChangeHandler && subInputChangeHandler({ key: "taxation", value: 0 })
		subInputChangeHandler && subInputChangeHandler({ key: "value", value: 1 })
	}

	const setTaxAbsolute = () => {
		subInputChangeHandler && subInputChangeHandler({ key: "taxation", value: 1 })
		subInputChangeHandler && subInputChangeHandler({ key: "value", value: 1 })
	}

	const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (
			(inputState?.sub.taxation === 0 && Number(event.target.value) <= 20) ||
			(inputState?.sub.taxation === 1 && Number(event.target.value) <= 1000000)
		) {
			subInputChangeHandler && subInputChangeHandler({ key: "value", event })
		}
	}

	const dropdownList = [
		{
			name: "edit",
			content: <div css={iconBlackWrapperCSS}>{taxPercentIcon}</div>,
			label: "비율 기준으로 과세",
			function: setTaxPercent,
		},
		{
			name: "delete",
			content: <div css={iconBlackWrapperCSS}>{taxAbsoluteIcon}</div>,
			label: "절대값 기준으로 과세",
			function: setTaxAbsolute,
		},
	]

	const taxPercent = (
		<div css={taxationSelectCSS}>
			{taxPercentIcon}
			비율 기준으로 과세
		</div>
	)

	const taxAbsolute = (
		<div css={taxationSelectCSS}>
			{taxAbsoluteIcon}
			절대값 기준으로 과세
		</div>
	)

	return (
		<React.Fragment>
			<div css={footerWrapperCSS}>
				<div css={addInfoWrapperCSS}>
					<div css={taxationSelectWrapperCSS} onClick={openDropdown}>
						<Dropdown
							compState={dropdownState}
							closeComp={closeDropdown}
							width={"200px"}
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
							min={1}
							max={20}
							css={taxInputCSS}
						/>
						{inputState?.sub.taxation === 0 ? "%" : "미소"}
					</div>
					
				</div>
			</div>
			{buttons(submitHandler)}
		</React.Fragment>
	)
}

const footerWrapperCSS = css`
	display: flex;
	justify-content: space-between;
	/* padding: 8px; */
`

const submitWrapperCSS = css`
	display: flex;
`

const taxationSelectCSS = css`
	height: 40px;
	width: 200px;

	display: flex;
	padding-left: 20px;
	/* justify-content:center; */
	align-items: center;
	color: var(--common-back-color-2);
	cursor: pointer;
	user-select: none;
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

const iconCSS = css`
	margin-right: 6px;
`

const iconBlackWrapperCSS = css`
	& path {
		stroke: rgba(0, 0, 0, 0.8);
	}
`

const addInfoWrapperCSS = css`
	display: flex;
`
export default GovExchequerCreate
