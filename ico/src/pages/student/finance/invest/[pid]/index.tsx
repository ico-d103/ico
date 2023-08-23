import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import React, { useEffect, useState } from "react"
import { css } from "@emotion/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getFinanceInvestListItemAPI } from "@/api/student/finance/getFinanceInvestListItemAPI"
import { getFinanceInvestType } from "@/types/student/apiReturnTypes"
import FinanceInvestChart from "@/components/student/Finance/Invest/Chart/FinanceInvestChart"
import { LineSvgProps } from "@nivo/line"
import ContentWrapper from "@/components/student/common/ContentWrapper/ContentWrapper"
import FinanceInvestIssueList from "@/components/student/Finance/Invest/IssueList/FinanceInvestIssueList"
import Button from "@/components/common/Button/Button"
import useGetNation from "@/hooks/useGetNation"
import Modal from "@/components/common/Modal/Modal"
import ModalContent from "@/components/common/Modal/ModalContent"
import FinanceInvestApplyModal from "@/components/student/Finance/Invest/Modal/FinanceInvestApplyModal"
import useCompHandler from "@/hooks/useCompHandler"
import FinanceInvestDeleteModal from "@/components/student/Finance/Invest/Modal/FinanceInvestDeleteModal"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"
import { isNavigating } from "@/store/store"
import { useAtom } from "jotai"
import useModal from "@/components/common/Modal/useModal"
import { useRouter } from "next/router"

type chartData = {
	id: string
	color: string
	data: {
		x: string
		y: number
	}[]
}

const APPLY_ICON = (
	<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M24.9993 29V17M18.9992 23H30.9993M24.9993 40C34.3881 40 41.9992 32.3888 41.9992 23C41.9992 13.6112 34.3881 6 24.9993 6C15.6104 6 7.99925 13.6112 7.99925 23C7.99925 24.9 8.31094 26.7272 8.88599 28.4332C9.10239 29.0752 9.21059 29.3962 9.2301 29.6429C9.24938 29.8864 9.23481 30.0571 9.17456 30.2939C9.11354 30.5336 8.97884 30.783 8.70944 31.2816L5.43812 37.3367C4.9715 38.2004 4.73819 38.6323 4.79041 38.9655C4.83589 39.2558 5.00674 39.5115 5.2576 39.6645C5.5456 39.8402 6.03385 39.7897 7.01033 39.6887L17.2524 38.63C17.5625 38.598 17.7176 38.5819 17.859 38.5873C17.998 38.5927 18.0961 38.6057 18.2317 38.637C18.3696 38.6687 18.5429 38.7355 18.8896 38.8691C20.7857 39.5996 22.8457 40 24.9993 40Z"
			stroke="black"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

function index() {
	const [chartData, setChartData] = useState<LineSvgProps["data"] | null>(null)
	const [calcRange, setCalcRange] = useState<number>(0)
	const [calcStock, setCalcStock] = useState<number>(0)
	const [calcDiff, setCalcDiff] = useState<number>(0)
	const [nation] = useGetNation()
	// const [openApplyComp, closeApplyComp, compApplyState] = useCompHandler()
	// const [openDeleteComp, closeDeleteComp, compDeleteState] = useCompHandler()
	const applyModal = useModal()
	const deleteModal = useModal()
	const [isNavigatingAtom, setIsNavigatingAtom] = useAtom(isNavigating)
  const router = useRouter()
  const {pid} = router.query

	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getFinanceInvestType>(
		["student", "financeInvest"],
		() => getFinanceInvestListItemAPI({id: Number(pid)}),
		// { staleTime: 200000 },
	)

	// type getFinanceInvestType = {
	// 	stock: string
	// 	account: number
	// 	tradingStart: string
	// 	tradingEnd: string
	// 	myStock: {
	// 		price: number
	// 		amount: number
	// 	}
	// 	issue: {
	// 		date: string
	// 		amount: number
	// 		content: string
	// 	}[]
	// }
	// const data: getFinanceInvestType = {
	// 	stock: "조선시대 역사",
	// 	account: 150,
	// 	tradingStart: "10:30",
	// 	tradingEnd: "14:30",
	// 	myStock: {
	// 		price: 100, // 상승폭?
	// 		amount: 1500, // 투자했던 돈
	// 	},
	// 	issue: [
	// 		{
	// 			date: "2023.05.18",
	// 			amount: 318,
	// 			content: "임진왜란이 끝나면서 이순신 장군은 어떻게 되었을까요?",
	// 		},
	// 		{
	// 			date: "2023.05.17",
	// 			amount: 418,
	// 			content: "1598년 어떤 일이 일어났을까요?",
	// 		},
	// 		{
	// 			date: "2023.05.16",
	// 			amount: 216,
	// 			content: "1592년, 임진왜란이 발발했어요. 과연 조선의 국운은 어떻게 흘러갈까요?",
	// 		},
	// 		{
	// 			date: "2023.05.15",
	// 			amount: 439,
	// 			content:
	// 				"1504년, 갑자사화가 발발했어요. 이 사건으로 조선의 부정부패가 사라지고 더 발전했을까요? 아니면 더 퇴보했을까요?",
	// 		},
	// 		{
	// 			date: "2023.05.14",
	// 			amount: 592,
	// 			content: "1446년, 훈민정음이 반포되었어요.",
	// 		},
	// 		{
	// 			date: "2023.05.13",
	// 			amount: 375,
	// 			content: "1418년 8월, 지금까지도 큰 영향을 미치고 있는 인물이 왕이 되요.",
	// 		},
	// 		{
	// 			date: "2023.05.12",
	// 			amount: 171,
	// 			content: "1408년 5월, 태조 이성계에게 무슨 일이 일어났을까요?",
	// 		},
	// 		{
	// 			date: "2023.05.11",
	// 			amount: 247,
	// 			content: "1392년, 태조 이성계가 조선을 건국했어요.",
	// 		},
	// 		{
	// 			date: "2023.05.10",
	// 			amount: 100,
	// 			content: "이성계가 위화도 회군을 했어요.",
	// 		},
	// 	],
	// }

	// const refetch = () => {}

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
		if (data && data.issue.length !== 0) {
			const range = data.issue[0].amount / data.myStock.price
			const stock = data.myStock.amount * range
			const diff = stock - data.myStock.amount

			setCalcStock(() => stock)
			setCalcDiff(() => diff)
			setCalcRange(() => range)
		}
	}, [data])

	function isTimeBetween(startTime: string, endTime: string): boolean {
		const startTimeArr = startTime.split(":")
		const startHour = Number(startTimeArr[0])
		const startMinute = Number(startTimeArr[1])
		const endTimeArr = endTime.split(":")
		const endHour = Number(endTimeArr[0])
		const endMinute = Number(endTimeArr[1])
		const currentTime = new Date()
		const currentHour = currentTime.getHours()
		const currentMinute = currentTime.getMinutes()

		if (currentHour > startHour && currentHour < endHour) {
			return true
		} else if (currentHour === startHour && currentMinute >= startMinute) {
			return true
		} else if (currentHour === endHour && currentMinute <= endMinute) {
			return true
		}

		return false
	}

	return (
		<React.Fragment>
			{/* {data && data.issue.length !== 0 && ( */}
				<React.Fragment>

					{deleteModal(
            <>
            {data && calcDiff && 
            <ModalContent
            width={"300px"}
            title={"투자 매도"}
            titleSize={"var(--student-h1)"}
            icon={APPLY_ICON}
            content={<FinanceInvestDeleteModal refetch={refetch} closeComp={deleteModal.close} diff={calcDiff} />}
            forChild={true}
          />
            }
            </>
						
         
					)}



					{applyModal(
            <>
            {data && 
            <ModalContent
            width={"300px"}
            title={"투자 매수"}
            titleSize={"var(--student-h1)"}
            icon={APPLY_ICON}
            forChild={true}
            content={
              <FinanceInvestApplyModal
                refetch={refetch}
                closeComp={applyModal.close}
                unit={` ${nation?.currency}`}
                account={data.account}
                price={data.issue[0].amount}
              />
            }
          />
            }
            </>
						
        
					)}
				</React.Fragment>
			{/* )} */}


			<PageHeader title={"투자"} />

			<div css={contentWrapperCSS}>
				{!data && (
					<ContentWrapper
						cssProps={css`
							flex: 1;
							display: flex;
						`}
					>
						<div css={alertWrapperCSS}>
							<div
								css={css`
									width: 128px;
									height: 128px;
								`}
							>
								{isNavigatingAtom === false && <UseAnimations animation={alertCircle} size={128} />}
							</div>
							<div css={labelCSS}>투자 종목이 없어요!</div>
						</div>
					</ContentWrapper>
				)}

				{chartData && <FinanceInvestChart data={chartData} />}

				{data && (
					<div css={stockMentWrapperCSS}>
						<div>
							현재 종목은 <span>“{data.stock}”</span> 입니다!
						</div>

						{data && isTimeBetween(data.tradingStart, data.tradingEnd) && (
							<div
								css={css`
									width: 240px;
								`}
							>
								{data.myStock.amount === 0 ? (
									<Button
										text={"매수하기"}
										fontSize={`var(--student-h3)`}
										width={"100%"}
										theme={"mobileNormal"}
										onClick={() => {
											// openApplyComp()
											applyModal.open()
										}}
									/>
								) : (
									<Button
										text={"매도하기"}
										fontSize={`var(--student-h3)`}
										width={"100%"}
										theme={"mobileSoft"}
										onClick={() => {
											// openDeleteComp()
											deleteModal.open()
										}}
									/>
								)}
							</div>
						)}
					</div>
				)}

				{data && data?.myStock.price !== 0 && (
					<ContentWrapper>
						<div css={lSizeFontCSS}>
							{Math.floor(calcStock).toLocaleString("ko-KR")} {nation?.currency}
						</div>
						<div css={diffLabelCSS({ calcDiff })}>
							{calcDiff > 0 && "+"}
							{Math.floor(calcDiff).toLocaleString("ko-KR")} {nation?.currency}
							&nbsp; ({calcDiff > 0 && "+"}
							{((calcRange - 1) * 100).toFixed(2)}%)
						</div>
					</ContentWrapper>
				)}
				{data && (
					<ContentWrapper>
						<div css={mSizeFontCSS}>뉴스</div>
						{data && !isTimeBetween(data.tradingStart, data.tradingEnd) && (
							<div
								css={css`
									display: flex;
									flex-direction: column;
									align-items: center;
								`}
							>
								지금은 거래 시간이 아니에요!
								<div css={sSizeFontCSS}>
									{data.tradingStart} ~ {data.tradingEnd}
								</div>
							</div>
						)}
						<FinanceInvestIssueList issueList={data.issue} />
					</ContentWrapper>
				)}
			</div>
		</React.Fragment>
	)
}

const contentWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
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

	display: flex;
	justify-content: space-between;
	align-items: center;
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
	width: var(--student-full-width);
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
	animation: fadein 0.2s ease-in forwards;

	@keyframes fadein {
		from {
			opacity: 0%;
		}

		to {
			opacity: 100%;
		}
	}
`

const mSizeFontCSS = css`
	font-size: var(--student-h2);
	font-weight: 700;
	line-height: 150%;
`

const alertWrapperCSS = css`
	/* width: 100%;
	height: 100%; */
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 16px;
	flex: 1;
`

const labelCSS = css`
	margin-top: 12px;
	font-size: 24px;
	font-weight: 500;
	color: rgba(0, 0, 0, 0.6);
`

export default index
