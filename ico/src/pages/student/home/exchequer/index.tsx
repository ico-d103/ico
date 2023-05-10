import React from "react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import ContentWrapper from "@/components/student/common/ContentWrapper/ContentWrapper"
import HomeAssetDetail from "@/components/student/Home/AssetDetail/HomeAssetDetail"
import { css } from "@emotion/react"
import { getHomeExchequerHistoryType } from "@/types/student/apiReturnTypes"
import { getHomeExchequerHistoryAPI } from "@/api/student/home/getHomeExchequerHistoryAPI"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Loading from "@/components/student/common/Loading/Loading"

function asset() {
	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getHomeExchequerHistoryType>(
		["student", "homeTransactionHistory"],
		getHomeExchequerHistoryAPI,
		// { staleTime: 200000 },
	)

	return (
		<div>
			<PageHeader title={"자산"} />
			<div css={assetWrapperCSS}>
				<ContentWrapper>
					<div css={sSizeFontCSS}>일반 계좌</div>
					<div css={lSizeFontCSS}>
						{data
							? Object.keys(data).length === 0
								? "0 단위연결!"
								: `${data[Object.keys(data)[0]][0].balance} 단위연결!`
							: "잔액을 조회중이에요."}
					</div>
				</ContentWrapper>
				<ContentWrapper>
					{isLoading && (
						<Loading
							size={96}
							labelSize={18}
							labelMargin={"24px 0px 16px 0px"}
							label={"거래 내역을 불러오는 중이에요!"}
						/>
					)}
					{data && <HomeAssetDetail tradeHistory={data} />}
				</ContentWrapper>
			</div>
		</div>
	)
}

const assetWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
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
