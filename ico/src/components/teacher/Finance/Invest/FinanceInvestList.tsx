import React, { useState, useEffect } from "react"

import { investListType } from "@/types/teacher/apiReturnTypes"
import { css } from "@emotion/react"
import { getInvestItemAPI } from "@/api/teacher/finance/getInvestItemAPI"
import Button from "@/components/common/Button/Button"
import Input from "@/components/common/Input/Input"

import { useQuery } from "@tanstack/react-query"
import { investItemType } from "@/types/teacher/apiReturnTypes"

import FormCreator from "../../common/Form/FormCreator"
import useCompHandler from "@/hooks/useCompHandler"

import FinanceInvestDetail from "./FinanceInvestDetail"
import FinanceInvestIssueDetail from "./FinanceInvestIssueDetail"
import FinanceInvestIssueCreate from "./FinanceInvestIssueCreate"
import FinanceInvestChart from "./FinanceInvestChart"

import { LineSvgProps } from "@nivo/line"

type FinanceInvestListProps = {
	data: investListType
	id: number
}

const FinanceInvestList = ({ data: InvestData, id }: FinanceInvestListProps) => {
	const [openComp, closeComp, compState] = useCompHandler()

	const { data } = useQuery<investItemType>(["teacher", InvestData.id], () => getInvestItemAPI({ id: InvestData.id }))

	const [chartData, setChartData] = useState<LineSvgProps["data"] | null>(null)

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

	if (!data) {
		return null
	}

	const price = data.issue[0].amount

	console.log(id)

	return (
		<div css={borderCSS}>
			<FinanceInvestDetail data={data} id={id} />

			{/* 차트가 들어갈 부분 */}
			{chartData && <FinanceInvestChart data={chartData} />}

			<FormCreator
				subComp={<FinanceInvestIssueCreate price={price} id={id} />}
				showIdx={1}
				subInit={{ taxation: 0, value: 0 }}
				// titlePlaceHolder={"투자 주제를 입력해주세요."}
				contentPlaceHolder={"내일의 이슈를 입력해주세요."}
				isNoTitle={true}
				compState={compState}
				closeComp={closeComp}
			/>

			{/* 한 종목의 이슈 추가 생성폼 */}
			<div>
				{!compState && (
					<div>
						<Button
							text={"이슈 추가 등록"}
							fontSize={"var(--teacher-h5)"}
							width={"120px"}
							height={"45px"}
							theme={"normal"}
							onClick={() => {
								openComp()
							}}
						/>
					</div>
				)}
			</div>

			{/* 한 종목의 이슈 리스트들 자세히 보기 */}
			{data.issue
				? data.issue.map((el, idx) => (
						<FinanceInvestIssueDetail
							key={el.content}
							showIdx={idx + 1}
							date={el.date}
							amount={el.amount}
							content={el.content}
						/>
				  ))
				: null}
		</div>
	)
}

const borderCSS = css`
	border: 1px solid black;
	border-radius: 20px;
	padding: 20px;

	margin-bottom: 10px;
`

const titleCSS = {
	display: "flex",
	fontSize: "1.3rem",
	alignItems: "center",
}

export default FinanceInvestList
