import * as React from "react"
import { useEffect, useState } from "react"

import { css } from "@emotion/react"

import useCompHandler from "@/hooks/useCompHandler"

import FormCreator from "../../common/Form/FormCreator"
import FinanceInvestCreate from "./FinanceInvestCreate"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getInvestItemAPI } from "@/api/teacher/finanace/getInvestItemAPI"

import dayjs from "dayjs"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { MultiSectionDigitalClock } from "@mui/x-date-pickers/MultiSectionDigitalClock"

function FinanceInvestStartForm() {
	const [openComp, closeComp, compState] = useCompHandler()

	useEffect(() => {
		getInvestItemAPI().then((res) => {
			console.log(res)
		})
	}, [])

	return (
		<>
			<div css={contentCSS}>투자 종목 주제</div>
			<input css={inputCSS} />

			<div css={contentCSS} style={{ marginBottom: "5px" }}>
				거래 시간 설정
			</div>

			<div style={{ display: "flex" }}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<div>
						<div>거래 시작 시간</div>
						<MultiSectionDigitalClock defaultValue={dayjs("2022-04-17T00:00")} ampm />
					</div>
					<div>
						<div>거래 종료 시간</div>
						<MultiSectionDigitalClock defaultValue={dayjs("2022-04-17T00:00")} ampm />
					</div>
				</LocalizationProvider>
			</div>

			<FormCreator
				subComp={<FinanceInvestCreate />}
				showIdx={0}
				subInit={{ taxation: 0, value: 0 }}
				compState={compState}
				isNoTitle={true}
			/>
		</>
	)
}

const contentCSS = css`
	font-size: 1.1rem;
	margin-top: 20px;
`

const inputCSS = css`
	border: none;
	background-color: var(--common-back-color);
	height: 45px;
	border-radius: 10px;
`

const buttonsCSS = css`
	display: flex;
	flex-direction: row;
	gap: 5px;
`

export default FinanceInvestStartForm
