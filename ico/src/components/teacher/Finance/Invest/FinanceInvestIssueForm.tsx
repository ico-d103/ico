import React, { useEffect, useState } from "react"
import useCompHandler from "@/hooks/useCompHandler"
import { css } from "@emotion/react"

import Button from "@/components/common/Button/Button"
import FormCreator from "../../common/Form/FormCreator"

import CommonListElement from "../../common/CommonListElement/CommonListElement"
import { getInvestItemAPI } from "@/api/teacher/finanace/getInvestItemAPI"
import FinanceInvestIssueCreate from "./FinanceInvestIssueCreate"
import FinanceInvestChart from "./FinanceInvestChart"

import { LineSvgProps } from "@nivo/line"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getFinanceInvestIssueType } from "@/types/student/apiReturnTypes"

function FinanceInvestIssueForm() {
	const [chartData, setChartData] = useState<LineSvgProps["data"] | null>(null)

	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getFinanceInvestIssueType>(
		["financeInvest"],
		getInvestItemAPI,
	)

	const price = data?.issue[0].amount

	useEffect(() => {
		if (data) {
			const temp: LineSvgProps["data"] = [
				{
					id: data.stock,
					color: "rgba(0, 0, 0, 1)",
					data: [],
				},
			]

			if (data.issue.length !== 0) {
				for (let i = 6; i >= 0; i--) {
					if (data.issue.length > i) {
						const date = new Date(data.issue[i].date)
						const mfDate: string = `${date.getMonth() + 1}.${date.getDate()}`
						temp[0].data.push({ x: mfDate, y: data.issue[i].amount })
					}
				}
			}

			setChartData(() => temp)
		}
	}, [data])

	const [openComp, closeComp, compState] = useCompHandler()

	return (
		<>
			{chartData && <FinanceInvestChart data={chartData} />}

			{!compState && (
				<Button
					text={"이슈 추가 등록"}
					fontSize={"var(--teacher-h5)"}
					width={"110px"}
					theme={"normal"}
					onClick={() => {
						openComp()
					}}
				/>
			)}

			<FormCreator
				subComp={<FinanceInvestIssueCreate price={price} />}
				showIdx={1}
				subInit={{ taxation: 0, value: 0 }}
				titlePlaceHolder={"투자 주제를 입력해주세요."}
				contentPlaceHolder={"오늘의 이슈를 입력해주세요."}
				isNoTitle={true}
				compState={compState}
				closeComp={closeComp}
			/>

			{/* <CommonListElement idx={showIdx}>
				<div css={detailWrapperCSS}>
					<div>
						<div css={titleCSS}>{title}</div>
						<div css={contentCSS}>{content}</div>
					</div>
					<div css={dateCSS}>{date}</div>
				</div>
			</CommonListElement> */}
		</>
	)
}

const detailWrapperCSS = css`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-top: 12px;
	/* align-items: center; */
`
const titleCSS = css`
	font-weight: 700;
	margin-bottom: 10px;
`

const dateCSS = css`
	height: 100%;
	min-width: 100px;
	font-size: var(--teacher-h6);
	font-weight: 600;
	color: rgba(0, 0, 0, 0.6);

	margin: 4px 16px 0px 16px;
`

const contentCSS = css`
	line-height: 130%;
	word-break: normal;
	white-space: pre;
`

export default FinanceInvestIssueForm
