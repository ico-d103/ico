import React from "react"
import { css } from "@emotion/react"
import HomeAssetDetailItem from "./HomeAssetDetailItem"
import { getHomeTransactionHistoryType } from "@/types/student/apiReturnTypes"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"

type HomeAssetDetailProps = {
	tradeHistory: getHomeTransactionHistoryType
}

function HomeAssetDetail({ tradeHistory }: HomeAssetDetailProps) {
	const renderHistory = Object.keys(tradeHistory).map((key, dayIdx) => {
		const perDayHistory = tradeHistory[key].map((item, itemIdx) => {
			return (
				<div>
					<HomeAssetDetailItem {...item} unit={" 단위연결!"} />
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

	return (
		<div css={historyWrapperCSS}>
			{Object.keys(tradeHistory).length === 0 ? (
				<div css={alertWrapperCSS}>
					<UseAnimations animation={alertCircle} size={128} />
					<div css={labelCSS}>거래 내역이 없어요!</div>
				</div>
			) : (
				renderHistory
			)}
		</div>
	)
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

const labelCSS = css`
	margin-top: 12px;
	font-size: 24px;
	font-weight: 500;
	color: rgba(0, 0, 0, 0.6);
`

const alertWrapperCSS = css`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 16px;
`

export default HomeAssetDetail
