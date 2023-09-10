import { ResponsiveLine } from "@nivo/line"
import { LineSvgProps } from "@nivo/line"
import { css } from "@emotion/react"
import React, { useEffect, useState } from "react"
import useGetNation from "@/hooks/useGetNation"

const FinanceInvestChart = ({ data }: LineSvgProps) => {
	const [nation] = useGetNation()
	const formatXAxisValue = (value: any) => {
		const date = new Date(value)
		return `${date.getMonth() + 1}월 ${date.getDate()}일`
	}
	const formatYAxisValue = (value: any, space = true) =>
		`${Number(value).toLocaleString("ko-KR")} ${nation.currency}${space ? `\u00A0 \u00A0 \u00A0 \u00A0 \u00A0` : ""}`

	// console.log(data[0].data)

	return (
		<div
			css={css`
				width: 100%;
				height: 40vh;
				overflow: hidden;
				margin-bottom: 16px;
			`}
		>
			<ResponsiveLine
				data={data}
				margin={{ top: 60, right: 140, bottom: 30, left: 140 }}
				xScale={{ type: "point" }}
				yScale={{
					type: "linear",
					min: "auto",
					max: "auto",
					stacked: true,
					reverse: false,
				}}
				yFormat=" >-.2f"
				axisTop={null}
				axisRight={null}
				axisLeft={{
					format: formatYAxisValue, // 축 서식화 함수 적용
				}}
				axisBottom={{
					format: formatXAxisValue, // 축 서식화 함수 적용
				}}
				// axisBottom={{
				// 	// orient: "bottom",
				// 	tickSize: 5,
				// 	tickPadding: 5,
				// 	tickRotation: 0,
				// 	legend: "날짜",
				// 	legendOffset: 36,
				// 	legendPosition: "middle",
				// }}
				// axisLeft={{
				// 	// orient: "left",
				// 	tickSize: 5,
				// 	tickPadding: 5,
				// 	tickRotation: 0,
				// 	legend: "count",
				// 	legendOffset: -40,
				// 	legendPosition: "middle",
				// }}
				enablePointLabel={true}
				pointLabel={(data) => {
					return formatYAxisValue(data.y, false)
				}}
				pointSize={10}
				pointColor={{ theme: "background" }}
				pointBorderWidth={2}
				pointBorderColor={{ from: "serieColor" }}
				pointLabelYOffset={-12}
				useMesh={true}
				curve={"monotoneX"}
				enableArea={true}
				// areaBaselineValue={4}
				gridYValues={5}
				// enableGridX={false}
				// enableGridY={false}

				// tooltip={({data[0].data }) => (
				// 	<div
				// 		style={{
				// 			borderRadius: 25,
				// 			padding: 12,
				// 			background: "#333333",
				// 		}}
				// 	>
				// 		<strong>{x}</strong>
				// 	</div>
				// )}

				tooltip={(data) => (
					<div
						css={css`
							border-radius: 25px;
							padding: 12px;
							color: #ffffff;
							background: rgba(0, 0, 0, 0.4);
							font-size: 12px;
						`}
					>
						<div>
							{formatXAxisValue(data.point.data.xFormatted)}의 종목 가격은{" "}
							{formatYAxisValue(data.point.data.yFormatted, false)}입니다.
						</div>
					</div>
				)}
			/>
		</div>
	)
}

export default FinanceInvestChart
