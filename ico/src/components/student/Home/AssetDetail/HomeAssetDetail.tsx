import React from "react"
import { css } from "@emotion/react"
import HomeAssetDetailItem from "./HomeAssetDetailItem"



type HomeAssetDetailProps = {
	tradeHistory: {
		[prop: string]: {
			title: string
			amount: number
			balance: number
			source?: string
		}[]
	}
}

function HomeAssetDetail({ tradeHistory }: HomeAssetDetailProps) {
	const renderHistory = Object.keys(tradeHistory).map((key, dayIdx) => {
		const perDayHistory = tradeHistory[key].map((item, itemIdx) => {
			return (
				<div>
					<HomeAssetDetailItem {...item} unit={"미소"} />
				</div>
			)
		})

		return (
			<div css={perDayWrapperCSS}>
				<div css={sSizeFontCSS}>{key}</div>
				{perDayHistory}
			</div>
		)
	})

	return <div css={historyWrapperCSS}>{renderHistory}</div>
}

const historyWrapperCSS = css`
	width: 100%;
`

const sSizeFontCSS = css`
	font-size: var(--student-h4);
	color: rgba(0, 0, 0, 0.6);
	margin-bottom: 20px;
`

const perDayWrapperCSS = css`
	margin-bottom: 42px;
	width: 100%;
`

export default HomeAssetDetail
