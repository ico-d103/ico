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
	const [openApplyComp, closeApplyComp, compApplyState] = useCompHandler()
	const [openDeleteComp, closeDeleteComp, compDeleteState] = useCompHandler()
	const [isNavigatingAtom, setIsNavigatingAtom] = useAtom(isNavigating)

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
			{data && data.issue.length !== 0 && (
				<React.Fragment>
					<Modal
						content={
							<ModalContent
								width={"90vw"}
								title={"투자 매도"}
								titleSize={"var(--student-h1)"}
								icon={APPLY_ICON}
								content={<FinanceInvestDeleteModal refetch={refetch} closeComp={closeDeleteComp} diff={calcDiff} />}
								forChild={true}
							/>
						}
						compState={compDeleteState}
						closeComp={closeDeleteComp}
						transition={"scale"}
					/>

					<Modal
						content={
							<ModalContent
								width={"90vw"}
								title={"투자 매수"}
								titleSize={"var(--student-h1)"}
								icon={APPLY_ICON}
								forChild={true}
								content={
									<FinanceInvestApplyModal
										refetch={refetch}
										closeComp={closeApplyComp}
										unit={` ${nation?.currency}`}
										account={data.account}
										price={data.issue[0].amount}
									/>
								}
							/>
						}
						compState={compApplyState}
						closeComp={closeApplyComp}
						transition={"scale"}
					/>
				</React.Fragment>
			)}

			{data && isTimeBetween(data.tradingStart, data.tradingEnd) && (
				<div css={navBarOverlayCSS}>
					{data.myStock.amount === 0 ? (
						<Button
							text={"매수하기"}
							fontSize={`var(--student-h3)`}
							width={"90%"}
							theme={"mobileNormal"}
							onClick={() => {
								openApplyComp()
							}}
						/>
					) : (
						<Button
							text={"매도하기"}
							fontSize={`var(--student-h3)`}
							width={"90%"}
							theme={"mobileSoft"}
							onClick={() => {
								openDeleteComp()
							}}
						/>
					)}
				</div>
			)}
			<PageHeader title={"투자"} />

			<div css={contentWrapperCSS}>
				{!data && (
					<ContentWrapper cssProps={css`flex: 1; display: flex;`}>
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
						현재 종목은 <span>“{data.stock}”</span> 입니다!
					</div>
				)}

				{data && data?.myStock.price !== 0 && (
					<ContentWrapper>
						<div css={lSizeFontCSS}>
							{Math.floor(calcStock).toLocaleString('ko-KR')} {nation?.currency}
						</div>
						<div css={diffLabelCSS({ calcDiff })}>
							{calcDiff > 0 && "+"}
							{Math.floor(calcDiff).toLocaleString('ko-KR')} {nation?.currency}
							&nbsp;
							({calcDiff > 0 && "+"}{((calcRange - 1) * 100).toFixed(2)}%)
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
