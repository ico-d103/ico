// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line

import { ResponsiveLine } from "@nivo/line"
import { LineSvgProps } from "@nivo/line"
import React from "react"
import { css } from "@emotion/react"
import useGetNation from "@/hooks/useGetNation"

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const FinanceInvestChart = ({ data }: LineSvgProps) => {
	const [nation] = useGetNation()
	const formatXAxisValue = (value:any) => {
		const date = new Date(value)
		return `${date.getMonth() + 1}월 ${date.getDate()}일`
	};
    const formatYAxisValue = (value:any) => `${value.toLocaleString('ko-KR')}`;

    
	return (
		<div css={css`width: 100vw; height: 40vh; overflow: hidden; margin-bottom: 16px;`}>
			<ResponsiveLine
				data={data}
				margin={{ top: 10, right: 25, bottom: 30, left: 40 }}
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
				pointSize={10}
				pointColor={{ theme: "background" }}
				pointBorderWidth={2}
				pointBorderColor={{ from: "serieColor" }}
				pointLabelYOffset={-12}
				useMesh={true}
                curve={'monotoneX'}
                enableArea={true}
                // areaBaselineValue={4}
                gridYValues={5}
                // enableGridX={false}
                // enableGridY={false}
			/>
		</div>
	)
}

export default FinanceInvestChart
