// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsivePie } from "@nivo/pie"
import { PieSvgProps } from "@nivo/pie"
import React from "react"
import { css } from "@emotion/react"
import { DefaultRawDatum } from "@nivo/pie"

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const GovEconomyPie = ({ data }: {data: PieSvgProps<any>["data"]}) => {
	return (
		<div
			css={css`
				width: 100%;
				height: 40vh;
				overflow: hidden;
				margin-bottom: 16px;
			`}
		>
			<ResponsivePie
				data={data}
				margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
				innerRadius={0.5}
				padAngle={0.7}
				cornerRadius={3}
				activeOuterRadiusOffset={8}
				borderWidth={1}
				borderColor={{
					from: "color",
					modifiers: [["darker", 0.2]],
				}}
				arcLinkLabelsSkipAngle={10}
				arcLinkLabelsTextColor="#333333"
				arcLinkLabelsThickness={2}
				arcLinkLabelsColor={{ from: "color" }}
				arcLabelsSkipAngle={10}
				arcLabelsTextColor={{
					from: "color",
					modifiers: [["darker", 2]],
				}}
				defs={[
					{
						id: "dots",
						type: "patternDots",
						background: "inherit",
						color: "rgba(255, 255, 255, 0.3)",
						size: 4,
						padding: 1,
						stagger: true,
					},
					{
						id: "lines",
						type: "patternLines",
						background: "inherit",
						color: "rgba(255, 255, 255, 0.3)",
						rotation: -45,
						lineWidth: 6,
						spacing: 10,
					},
				]}
				// fill={[
				// 	{
				// 		match: {
				// 			id: "ruby",
				// 		},
				// 		id: "dots",
				// 	},
				// 	{
				// 		match: {
				// 			id: "c",
				// 		},
				// 		id: "lines",
				// 	},
				// ]}
				legends={[
					{
						anchor: "bottom",
						direction: "row",
						justify: false,
						translateX: 0,
						translateY: 56,
						itemsSpacing: 0,
						itemWidth: 100,
						itemHeight: 18,
						itemTextColor: "#999",
						itemDirection: "left-to-right",
						itemOpacity: 1,
						symbolSize: 18,
						symbolShape: "circle",
						effects: [
							{
								on: "hover",
								style: {
									itemTextColor: "#000",
								},
							},
						],
					},
				]}
			/>
		</div>
	)
}

export default GovEconomyPie
