import React from "react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import ContentWrapper from "@/components/student/common/ContentWrapper/ContentWrapper"
import HomeAssetDetail from "@/components/student/Home/AssetDetail/HomeAssetDetail"
import { css } from "@emotion/react"
import { getHomeExchequerHistoryType } from "@/types/student/apiReturnTypes"
import { getHomeExchequerHistoryAPI } from "@/api/student/home/getHomeExchequerHistoryAPI"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Loading from "@/components/student/common/Loading/Loading"
import useGetNation from "@/hooks/useGetNation"
import { useAtom } from "jotai"
import { isNavigating } from "@/store/store"

function asset() {
	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getHomeExchequerHistoryType>(
		["student", "homeTransactionHistory"],
		getHomeExchequerHistoryAPI,
		// { staleTime: 200000 },
	)
	const [nation] = useGetNation()
	const [isNavigatingAtom, setIsNavigatingAtom] = useAtom(isNavigating)

	return (
		<div>
			<PageHeader title={"국고"} />
			<div css={assetWrapperCSS}>
				<ContentWrapper>
					<div css={sSizeFontCSS}>남은 예산</div>
					<div css={lSizeFontCSS}>
						{data
							? Object.keys(data).length === 0
								? `0 ${nation?.currency}`
								: `${data[Object.keys(data)[0]][0].balance} ${nation?.currency}`
							: "금액을 조회중이에요."}
					</div>
				</ContentWrapper>
				<ContentWrapper>


				

					{isLoading && (
						<div css={css`width: 128px; height: 128px;`}>
						{isNavigatingAtom === false && <Loading
							size={96}
							labelSize={18}
							labelMargin={"24px 0px 16px 0px"}
							label={"거래 내역을 불러오는 중이에요!"}
						/>}
						</div>
					)}
					{data && <HomeAssetDetail tradeHistory={data} />}
				</ContentWrapper>
			</div>
		</div>
	)
}

export async function getServerSideProps() {
	return {
	  props: {},
	};
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
