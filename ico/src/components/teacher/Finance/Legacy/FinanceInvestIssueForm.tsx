// import React, { useEffect, useState } from "react"
// import useCompHandler from "@/hooks/useCompHandler"
// import { css } from "@emotion/react"

// import Button from "@/components/common/Button/Button"
// import FormCreator from "../../common/Form/FormCreator"

// import CommonListElement from "../../common/CommonListElement/CommonListElement"
// import { getInvestItemAPI } from "@/api/teacher/finanace/getInvestItemAPI"
// import FinanceInvestIssueCreate from "./FinanceInvestIssueCreate"
// import FinanceInvestChart from "./FinanceInvestChart"
// import FinanceInvestIssueDetail from "./FinanceInvestIssueDetail"

// import { LineSvgProps } from "@nivo/line"
// import { useQuery, useQueryClient } from "@tanstack/react-query"
// import { getFinanceInvestIssueType } from "@/types/student/apiReturnTypes"
// import { dateFormatter } from "@/util/dateFormatter"
// import Input from "@/components/common/Input/Input"

// import { putInvestTimeAPI } from "@/api/teacher/finanace/putInvestTimeAPI"
// import useNotification from "@/hooks/useNotification"
// import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

// type FinanceInvestIssueFormProps = {
// 	data: getFinanceInvestIssueType
// }

// function FinanceInvestIssueForm({ data }: FinanceInvestIssueFormProps) {
// 	const [chartData, setChartData] = useState<LineSvgProps["data"] | null>(null)

// 	const noti = useNotification()

// 	const [tradingStart, setTradingStart] = useState(data.tradingStart)
// 	const [tradingEnd, setTradingEnd] = useState(data.tradingEnd)
// 	const [initTradingStart, setInitTradingStart] = useState(data.tradingStart)
// 	const [initTradingEnd, setInitTradingEnd] = useState(data.tradingEnd)

// 	const price = data?.issue[0].amount

// 	const pushInvestTime = () => {
// 		putInvestTimeAPI({ body: { tradingStart: tradingStart, tradingEnd: tradingEnd } })
// 			.then((res) => {
// 				setInitTradingStart(() => tradingStart)
// 				setInitTradingEnd(() => tradingEnd)
// 				noti({ content: <NotiTemplate type={"ok"} content={"투자 시간 변경이 완료되었습니다!"} />, duration: 5000 })
// 				console.log(res)
// 			})
// 			.catch((err) => {
// 				noti({ content: <NotiTemplate type={"alert"} content={"투자 시간 변경에 실패하였습니다!"} />, duration: 5000 })
// 			})
// 	}

// 	useEffect(() => {
// 		if (data) {
// 			const temp: LineSvgProps["data"] = [
// 				{
// 					id: data.stock,
// 					color: "rgba(0, 0, 0, 1)",
// 					data: [],
// 				},
// 			]

// 			if (data.issue.length !== 0) {
// 				for (let i = 6; i >= 0; i--) {
// 					if (data.issue.length > i) {
// 						const date = new Date(data.issue[i].date)
// 						const mfDate: string = `${date.getMonth() + 1}.${date.getDate()}`
// 						temp[0].data.push({ x: mfDate, y: data.issue[i].amount })
// 					}
// 				}
// 			}

// 			setChartData(() => temp)
// 		}
// 	}, [data])

// 	const [openComp, closeComp, compState] = useCompHandler()

// 	const renderRule =
// 		data?.issue &&
// 		data?.issue.map((el, idx) => {
// 			return <FinanceInvestIssueDetail showIdx={idx} date={el.date} amount={el.amount} content={el.content} />
// 		})

// 	const handleTradingStartChange = (event: any) => {
// 		setTradingStart(event.target.value)
// 	}

// 	const handleTradingEndChange = (event: any) => {
// 		setTradingEnd(event.target.value)
// 	}

// 	return (
// 		<>
// 			<div css={titleCSS}>
// 				현재 투자 종목은&nbsp;<div style={{ fontWeight: "700" }}>{data.stock}</div>&nbsp;입니다.
// 			</div>
// 			// 차트에 해당하는 부분
// 			<div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }}>
// 				{chartData && <FinanceInvestChart data={chartData} />}
// 			</div>
// 			{/* <div css={setTradeTimeCSS}>
// 				<div style={{ marginBottom: "10px" }}>현재 거래 시간</div>
// 				<div style={{ display: "flex", justifyContent: "space-between" }}>
// 					<div style={{ display: "flex", width: "80%", gap: "12px" }}>
// 						<Input
// 							type="time"
// 							customCss={[
// 								css`
// 									width: 25%;
// 									text-align: left;
// 								`,
// 							]}
// 							theme={"greenDefault"}
// 							value={tradingStart}
// 							onChange={handleTradingStartChange}
// 						/>
// 						<Input
// 							type="time"
// 							customCss={[
// 								css`
// 									width: 25%;
// 									text-align: left;
// 								`,
// 							]}
// 							theme={"greenDefault"}
// 							value={tradingEnd}
// 							onChange={handleTradingEndChange}
// 						/>
// 						<Button
// 							text={"거래 시간 변경"}
// 							fontSize={"var(--teacher-h5)"}
// 							width={"120px"}
// 							height={"45px"}
// 							theme={"normal"}
// 							onClick={pushInvestTime}
// 							disabled={tradingStart === initTradingStart && tradingEnd === initTradingEnd && true}
// 						/>
// 					</div>
// 					<div>
// 						{!compState && (
// 							<div>
// 								<Button
// 									text={"이슈 추가 등록"}
// 									fontSize={"var(--teacher-h5)"}
// 									width={"120px"}
// 									height={"45px"}
// 									theme={"normal"}
// 									onClick={() => {
// 										openComp()
// 									}}
// 								/
// 							</div>
// 						)}
// 					</div>
// 				</div>
// 				<div></div>
// 			</div> */}
// 			// form
// 			<FormCreator
// 				subComp={<FinanceInvestIssueCreate />}
// 				showIdx={1}
// 				subInit={{ taxation: 0, value: 0 }}
// 				// titlePlaceHolder={"투자 주제를 입력해주세요."}
// 				contentPlaceHolder={"내일의 이슈를 입력해주세요."}
// 				isNoTitle={true}
// 				compState={compState}
// 				closeComp={closeComp}
// 			/>
// 			{renderRule}
// 		</>
// 	)
// }

// const titleCSS = {
// 	display: "flex",
// 	fontSize: "1.3rem",
// }

// const setTradeTimeCSS = {
// 	gap: "16px",
// }

// export default FinanceInvestIssueForm
