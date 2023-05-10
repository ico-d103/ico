import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import React, { useEffect, useState } from "react"
import { css } from "@emotion/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getFinanceInvestAPI } from "@/api/student/finance/getFinanceInvestAPI"
import { getFinanceInvestType } from "@/types/student/apiReturnTypes"
import FinanceInvestChart from "@/components/student/Finance/Invest/Chart/FinanceInvestChart"
import { LineSvgProps } from "@nivo/line"
import ContentWrapper from "@/components/student/common/ContentWrapper/ContentWrapper"
import FinanceInvestIssueList from "@/components/student/Finance/Invest/IssueList/FinanceInvestIssueList"
import Button from "@/components/common/Button/Button"

type chartData = {
	id: string
	color: string
	data: {
		x: string
		y: number
	}[]
}

function index() {
	const [chartData, setChartData] = useState<LineSvgProps["data"] | null>(null)
	const [calcStock, setCalcStock] = useState<number>(0)
	const [calcDiff, setCalcDiff] = useState<number>(0)
	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getFinanceInvestType>(
		["student", "financeInvest"],
		getFinanceInvestAPI,
		// { staleTime: 200000 },
	)

	useEffect(() => {
		if (data) {
			const temp: LineSvgProps["data"] = [
				{
					id: data.stock,
					color: "rgba(0, 0, 0, 1)",
					data: [],
				},
			]

			for (let i = 6; i >= 0; i--) {
				const date = new Date(data.issue[i].date)
				const mfDate: string = `${date.getMonth() + 1}.${date.getDate()}`
				temp[0].data.push({ x: mfDate, y: data.issue[i].amount })
			}

			//   data.issue.forEach((el, idx) => {
			//     temp[0].data.push({x: el.date, y: el.amount})
			//     if (idx >= 7) {
			//         return false
			//     }
			//   })
			setChartData(() => temp)
		}
	}, [data])

	useEffect(() => {
		console.log(data)
		if (data) {
			const range = data.issue[0].amount / data.myStock.price
			const stock = data.myStock.amount * range
			const diff = stock - data.myStock.amount

			setCalcStock(() => stock)
			setCalcDiff(() => diff)
		}
	}, [data])

	return (
		<div>
			{data && (
				<div css={navBarOverlayCSS}>
					{data.myStock.amount === 0 ? (
						<Button
							text={"매수하기"}
							fontSize={`var(--student-h3)`}
							width={"90%"}
							theme={"mobileNormal"}
							onClick={() => {}}
						/>
					) : (
						<Button
							text={"매도하기"}
							fontSize={`var(--student-h3)`}
							width={"90%"}
							theme={"mobileSoft"}
							onClick={() => {}}
						/>
					)}
				</div>
			)}
			<PageHeader title={"투자"} />

			<div css={contentWrapperCSS}>
				{chartData && <FinanceInvestChart data={chartData} />}
				{data && (
					<div css={stockMentWrapperCSS}>
						현재 종목은 <span>“{data.stock}”</span> 입니다!
					</div>
				)}
				{data && data?.myStock.price !== 0 && (
					<ContentWrapper>
						<div css={lSizeFontCSS}>{calcStock.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 단위연결!</div>
						<div css={diffLabelCSS({ calcDiff })}>
							{calcDiff > 0 && "+"}
							{calcDiff.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 단위연결!
						</div>
					</ContentWrapper>
				)}
				{data && (
					<ContentWrapper>
						<FinanceInvestIssueList issueList={data.issue} />
					</ContentWrapper>
				)}
			</div>
		</div>
	)
}

const contentWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const lSizeFontCSS = css`
	font-size: var(--student-h1);
	font-weight: 700;
	line-height: 150%;
`

const stockMentWrapperCSS = css`
	width: 95%;
	margin: 0px 0px 16px 0px;
	font-size: var(--student-h2);
	font-weight: 500;

	& span {
		font-weight: 700;
	}
`

const diffLabelCSS = ({ calcDiff }: { calcDiff: number }) => {
	return css`
		font-size: var(--student-h3);
		font-weight: 700;
		color: ${calcDiff > 0 ? "#0066FF" : "rgba(0, 0, 0, 0.6)"};
	`
}

const sSizeFontCSS = css`
	font-size: var(--student-h4);
	color: rgba(0, 0, 0, 0.6);
`

const navBarOverlayCSS = css`
	width: 100%;
	height: 64px;
	background-color: var(--student-main-color);
	position: fixed;
	bottom: 0;
	z-index: 999999999999;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0px 16px;

	opacity: 0%;
	animation: fadein 0.6s ease-in forwards;

	@keyframes fadein {
		from {
			opacity: 0%;
		}

		to {
			opacity: 100%;
		}
	}
`

export default index
