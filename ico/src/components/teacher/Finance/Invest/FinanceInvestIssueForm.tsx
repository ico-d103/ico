import React, { useEffect, useState } from "react"
import useCompHandler from "@/hooks/useCompHandler"

import Button from "@/components/common/Button/Button"
import FormCreator from "../../common/Form/FormCreator"

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
		</>
	)
}

export default FinanceInvestIssueForm
