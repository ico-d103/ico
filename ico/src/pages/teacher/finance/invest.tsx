import { css } from "@emotion/react"
import Button from "@/components/common/Button"
import { ResponsiveLine } from "@nivo/line"

function invest() {
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
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<div css={titleCSS}>투자</div>
				<Button text={"투자 종목 삭제"} fontSize={`var(--teacher-h5)`} width={"128px"} theme={"normal"} />
			</div>
			<div>
				<div css={subTitleCSS}>투자 종목 설정을 설정하고 이슈를 등록해 투자 상품을 관리할 수 있습니다.</div>
			</div>
			<ResponsiveLine
				data={data}
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
					orient: "bottom",
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: "transportation",
					legendOffset: 36,
					legendPosition: "middle",
				}}
				axisLeft={{
					orient: "left",
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

const wrapperCSS = css`
	width: 100%;
	height: 100%;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`

const headerCSS = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	> h1 {
		font-size: var(--teacher-h1);
		font-weight: bold;
	}
`

const titleCSS = css`
	font-size: 2rem;
	font-weight: bold;
`

const subTitleCSS = css`
	font-size: 0.9rem;
`

export default invest
