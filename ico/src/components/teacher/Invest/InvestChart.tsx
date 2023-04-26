import { ResponsiveLine } from "@nivo/line"

function InvestChart() {
	const data = [
		{
			id: "japan",
			color: "hsl(266, 70%, 50%)",
			data: [
				{ x: "plane", y: 107 },
				{ x: "helicopter", y: 239 },
				{ x: "boat", y: 184 },
				{ x: "train", y: 68 },
				{ x: "subway", y: 175 },
				{ x: "bus", y: 41 },
			],
		},
	]

	return (
		<>
			<ResponsiveLine
				data={data}
				height={200}
				margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
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
				axisBottom={{
					// orient: "bottom",
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: "transportation",
					legendOffset: 36,
					legendPosition: "middle",
				}}
				axisLeft={{
					// orient: "left",
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: "count",
					legendOffset: -40,
					legendPosition: "middle",
				}}
				pointSize={10}
				pointColor={{ theme: "background" }}
				pointBorderWidth={2}
				pointBorderColor={{ from: "serieColor" }}
				pointLabelYOffset={-12}
				useMesh={true}
			/>
		</>
	)
}

export default InvestChart
