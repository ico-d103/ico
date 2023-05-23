import React, { useEffect } from "react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import ContentWrapper from "@/components/student/common/ContentWrapper/ContentWrapper"
import HomeAssetDetail from "@/components/student/Home/AssetDetail/HomeAssetDetail"
import { css } from "@emotion/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getHomeTransactionHistoryAPI } from "@/api/student/home/getHomeTransactionHistoryAPI"
import { getHomeTransactionHistoryType } from "@/types/student/apiReturnTypes"
import UseAnimations from "react-useanimations"
import loading from "react-useanimations/lib/loading"
import Loading from "@/components/student/common/Loading/Loading"
import useGetNation from "@/hooks/useGetNation"
import { useAtom } from "jotai"
import { isNavigating } from "@/store/store"
import { getHomeAccountAPI } from "@/api/student/home/getHomeAccountAPI"
import { getHomeAccountType } from "@/types/student/apiReturnTypes"

function asset() {
	const tradeHistory = useQuery<getHomeTransactionHistoryType>(
		["student", "asset", "homeTransactionHistory"],
		getHomeTransactionHistoryAPI,
		// { staleTime: 200000 },
	)

	const account = useQuery<getHomeAccountType>(
		["student", "asset", "homeAccount"],
		getHomeAccountAPI,
		// { staleTime: 200000 },
	)

	const [nation] = useGetNation()
	const [isNavigatingAtom, setIsNavigatingAtom] = useAtom(isNavigating)

	return (
		<React.Fragment>
			<PageHeader title={"자산"} />
			<div css={assetWrapperCSS}>
				<ContentWrapper>
					<div css={sSizeFontCSS}>일반 계좌</div>
					<div css={lSizeFontCSS}>
						{/* {data
							? Object.keys(data).length === 0
								? `0 ${nation?.currency}`
								: `${data[Object.keys(data)[0]][0].balance} ${nation?.currency}`
							: "잔액을 조회중이에요."} */}
							{account.data
							? account.data.account
								? `0 ${nation?.currency}`
								: `${account.data.account} ${nation?.currency}`
							: "잔액을 조회중이에요."}
					</div>
				</ContentWrapper>
				<ContentWrapper
					cssProps={css`
						flex: 1;
						display: flex;
						flex-direction: column;
						
					`}
				>
					{tradeHistory.isLoading && (
						<div
							css={css`
								flex: 1;
								display: flex;
								justify-content: center;
								align-items: center;
								
							`}
						>
			
								{isNavigatingAtom === false && (
									<Loading
										size={96}
										labelSize={18}
										labelMargin={"24px 0px 16px 0px"}
										label={"거래 내역을 불러오는 중이에요!"}
									/>
								)}
				
						</div>
					)}
					{tradeHistory.data && <HomeAssetDetail tradeHistory={tradeHistory.data} />}
				</ContentWrapper>
			</div>
		</React.Fragment>
	)
}

export async function getServerSideProps() {
	return {
		props: {},
	}
}

const assetWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
`

const lSizeFontCSS = css`
	font-size: var(--student-h1);
	font-weight: 700;
	line-height: 150%;
`

const sSizeFontCSS = css`
	font-size: var(--student-h4);
	color: rgba(0, 0, 0, 0.6);
`

export default asset
