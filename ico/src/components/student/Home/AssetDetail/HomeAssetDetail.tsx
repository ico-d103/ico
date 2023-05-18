import React from "react"
import { css } from "@emotion/react"
import HomeAssetDetailItem from "./HomeAssetDetailItem"
import { getHomeTransactionHistoryType } from "@/types/student/apiReturnTypes"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"
import { isNavigating } from "@/store/store"
import { useAtom } from "jotai"
import useGetNation from "@/hooks/useGetNation"

type HomeAssetDetailProps = {
	tradeHistory: getHomeTransactionHistoryType
}

function HomeAssetDetail({ tradeHistory }: HomeAssetDetailProps) {
	const [isNavigatingAtom, setIsNavigatingAtom] = useAtom(isNavigating)
	const [nation] = useGetNation()

	const renderHistory = Object.keys(tradeHistory).map((key, dayIdx) => {
		const perDayHistory = tradeHistory[key].map((item, itemIdx) => {
			return (
				<div>
					<HomeAssetDetailItem {...item} unit={` ${nation?.currency}`} />
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
		<React.Fragment>
			{Object.keys(tradeHistory).length === 0 ? (
				<div css={alertWrapperCSS}>
					<div
						css={css`
							width: 128px;
							height: 128px;
						`}
					>
						{isNavigatingAtom === false && <UseAnimations animation={alertCircle} size={128} />}
					</div>
					<div css={labelCSS}>거래 내역이 없어요!</div>
				</div>
			) : (
				<div css={historyWrapperCSS}>{renderHistory}</div>
			)}
		</React.Fragment>
	)
}

const historyWrapperCSS = css`
	width: 100%;
	flex: 1;
`

const sSizeFontCSS = css`
	font-size: var(--student-h4);
	color: rgba(0, 0, 0, 0.6);
	margin-bottom: 20px;
`

const perDayWrapperCSS = css`
	margin: 8px 0px;
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
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 16px;
`

export default HomeAssetDetail
