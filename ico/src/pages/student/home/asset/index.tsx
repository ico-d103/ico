import React from "react"
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



function asset() {

	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getHomeTransactionHistoryType>(
		["student", "homeTransactionHistory"],
		getHomeTransactionHistoryAPI,
		// { staleTime: 200000 },
	)


	return (
		<div>
			<PageHeader title={"자산"} />
			<div css={assetWrapperCSS}>
				<ContentWrapper>
                    <div css={sSizeFontCSS}>
                        일반 계좌
                    </div>
                    <div css={lSizeFontCSS}>
                        {data && data[Object.keys(data)[0]][0].balance} 단위연결!
                    </div>
                </ContentWrapper>
				<ContentWrapper>
					<Loading size={48} fontSize={18} label={'로딩중'} />

                    {data && <HomeAssetDetail tradeHistory={data} />}
					{data && <div>fewfwefwefew</div>}
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
