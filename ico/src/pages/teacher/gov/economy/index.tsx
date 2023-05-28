import React, { useEffect, useState } from "react"
import { css } from "@emotion/react"
import { useQuery } from "@tanstack/react-query"
import { getGovEconomyType } from "@/types/teacher/apiReturnTypes"
import { getGovEconomyAPI } from "@/api/teacher/gov/getGovEconomyAPI"
import { LineSvgProps } from "@nivo/line"
import { BarDatum, BarSvgProps } from "@nivo/bar"
import GovEconomyChart from "@/components/teacher/Gov/Economy/Chart/GovEconomyChart"
import GovEconomyBar from "@/components/teacher/Gov/Economy/Chart/GovEconomyBar"
import useGetNation from "@/hooks/useGetNation"

function index() {
	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getGovEconomyType[]>(
		["teacher", "govExchequer"],
		getGovEconomyAPI,
		// { staleTime: 200000 },
	)

	// const [barData, setBarData] = useState<BarSvgProps<BarDatum>["data"] | null>(null)

	// useEffect(() => {
	// 	if (data) {
	// 		const temp: BarSvgProps<BarDatum>["data"] = []

	// 		if (data.length !== 0) {

	// 			for (let i = 6; i >= 0; i--) {
	// 				if (data.length > i) {
	// 					const date = new Date(data[i].date)
	// 					const mfDate: string = `${date.getMonth() + 1}.${date.getDate()}`
	// 					temp.push({ date: mfDate, '거래 총액': data[i].totalAccount, '계좌 총액': data[i].totalAmount })
	// 				}
	// 			}
	// 		}

	// 		//   data.issue.forEach((el, idx) => {
	// 		//     temp[0].data.push({x: el.date, y: el.amount})
	// 		//     if (idx >= 7) {
	// 		//         return false
	// 		//     }
	// 		//   })
	// 		setBarData(() => temp)
	// 	}
	// }, [data])
	const [nation] = useGetNation()
	const [chartData, setChartData] = useState<LineSvgProps["data"] | null>(null)

	useEffect(() => {
		if (data) {
			const temp: LineSvgProps["data"] = [
				{
					id: "계좌 총액",
					color: "rgba(0, 0, 0, 1)",
					data: [],
				},
				{
					id: "거래 총액",
					color: "rgba(0, 0, 0, 1)",
					data: [],
				},
			]

			if (data.length !== 0) {
				for (let i = 6; i >= 0; i--) {
					if (data.length > i) {
						const date = new Date(data[i].date)
						const mfDate: string = `${date.getMonth() + 1}.${date.getDate()}`
						temp[0].data.push({ x: mfDate, y: data[i].totalAccount })
						temp[1].data.push({ x: mfDate, y: data[i].totalAmount })
					}
				}
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


	const formatXAxisValue = (value:any) => {
		const date = new Date(value)
		return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
	};

	return (
		<React.Fragment>
			<div css={contentWrapperCSS}>
				<div css={titleCSS}>경제 현황</div>
				<div css={descCSS}>국가 내 분기별 화폐 유통량을 조회합니다.</div>

				{data && chartData && <GovEconomyChart data={chartData} />}
				{/* {barData && <GovEconomyBar data={barData} />} */}
			</div>

			<div css={contentWrapper2CSS}>
				<div css={titleCSS}>분기 정보</div>
				<div css={descCSS}>이번 분기의 국가 경제에 대한 정보를 조회합니다.</div>

				{data && (
					<div css={textContentWrapperCSS}>
						<div css={quarterTitleCSS}>
							<div css={decoCSS} />
							분기일
						</div>
						<div>{formatXAxisValue(data[0].date)}</div>

						<div css={css`width: 100%; height: 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.2); margin-top: 24px;`} />
						<div css={quarterContentCSS}>
				
							계좌 총액
						</div>
						<div>{`${data[0].totalAccount.toLocaleString("ko-KR")} ${nation.currency}`}</div>

						<div css={quarterContentCSS}>
			
							거래 총액
						</div>
						<div>{`${data[0].totalAmount.toLocaleString("ko-KR")} ${nation.currency}`}</div>
					</div>
				)}
			</div>
		</React.Fragment>
	)
}

const contentWrapperCSS = css`
	flex: 1;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`

const contentWrapper2CSS = css`
	flex: 1;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
	margin-top: 24px;
`

const titleCSS = css`
	font-size: var(--teacher-h1);
	font-weight: 700;
	margin-bottom: 12px;
	display: flex;
	justify-content: space-between;
	height: 35px;
`

const descCSS = css`
	margin-bottom: 36px;
	font-size: var(--teacher-h5);
`

const textContentWrapperCSS = css`
	margin-top: 24px;
`

const quarterTitleCSS = css`
	height: 24px;
	display: flex;
	align-items: center;
	gap: 12px;
	margin-top: 16px;
	font-size: 1.4rem;
	font-weight: 600;
	margin-top: 24px;
	margin-bottom: 12px;
`

const quarterContentCSS = css`
	height: 20px;
	display: flex;
	align-items: center;
	gap: 6px;
	margin-top: 16px;
	font-size: 1.1rem;
	font-weight: 600;
	margin-top: 24px;
	margin-bottom: 8px;
`

const decoCSS = css`
	height: 100%;
	width: 12px;
	border-radius: 2px;
	background-color: var(--teacher-highlight-color);
`


export default index
