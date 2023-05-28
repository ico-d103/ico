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

const GovEconomyChart = ({ data }: LineSvgProps) => {
	const [nation] = useGetNation()
	const formatXAxisValue = (value:any) => {
		const date = new Date(value)
		return `${date.getMonth() + 1}월 ${date.getDate()}일`
	};
    const formatYAxisValue = (value:any, space=true) => `${Number(value).toLocaleString('ko-KR')} ${nation.currency}${space ? `\u00A0 \u00A0` : ''}`;

	return (
		<div css={css`width: 100%; height: 40vh; overflow: hidden; margin-bottom: 16px;`}>
			<ResponsiveLine
				data={data}
				margin={{ top: 50, right: 120, bottom: 30, left: 120 }}
				xScale={{ type: "point" }}
				yScale={{
					type: "linear",
					min: "auto",
					max: "auto",
					stacked: false,
					reverse: false,
				}}
				// yFormat=" >-.2f"
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
				enablePointLabel={true}
                // enableGridX={false}
                // enableGridY={false}
				legends={[
					{
						anchor: 'bottom-right',
						direction: 'column',
						justify: false,
						translateX: 100,
						translateY: 0,
						itemsSpacing: 0,
						itemDirection: 'left-to-right',
						itemWidth: 80,
						itemHeight: 20,
						itemOpacity: 0.75,
						symbolSize: 12,
						symbolShape: 'circle',
						symbolBorderColor: 'rgba(0, 0, 0, .5)',
						effects: [
							{
								on: 'hover',
								style: {
									itemBackground: 'rgba(0, 0, 0, .03)',
									itemOpacity: 1
								}
							}
						]
					}
				]}

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
                        <div>{formatXAxisValue(data.point.data.xFormatted)}의 {data.point.serieId}은 {formatYAxisValue(data.point.data.yFormatted, false)}입니다.</div>
                    </div>
                )}
			/>
		</div>
	)
}

export default GovEconomyChart
