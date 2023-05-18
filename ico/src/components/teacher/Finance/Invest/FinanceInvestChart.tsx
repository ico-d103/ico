import { ResponsiveLine } from "@nivo/line"
import { LineSvgProps } from "@nivo/line"
import { css } from "@emotion/react"
import React, { useEffect, useState } from "react"

const FinanceInvestChart = ({ data }: LineSvgProps) => {
	console.log(data[0].data)
	return (
		<div
			css={css`
				width: 65vw;
				height: 40vh;
				overflow: hidden;
				margin-bottom: 16px;
			`}
		>
			<ResponsiveLine
				data={data}
				margin={{ top: 4, right: 15, bottom: 30, left: 30 }}
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
			/>
		</div>
	)
}

export default FinanceInvestChart
