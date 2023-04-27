import { ResponsiveLine } from "@nivo/line"

function FinanceInvestChart() {
	const data = [
		{
			id: "japan",
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
		<div style={{ width: "100%", height: "50vh", padding: "10px" }}>
			<ResponsiveLine
				data={data}
				margin={{ top: 50, right: 10, bottom: 50, left: 50 }}
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
		</div>
	)
}

export default FinanceInvestChart
