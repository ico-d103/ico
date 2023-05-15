import { getFinanceDepositRateAPI } from "@/api/student/finance/getFinanceDepositRateAPI"
import ContentWrapper from "@/components/student/common/ContentWrapper/ContentWrapper"
import DetailPage from "@/components/student/Finance/Deposit/DetailPage/DetailPage"
import GuidePage from "@/components/student/Finance/Deposit/GuidePage/GuidePage"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import { getFinanceDepositRateType } from "@/types/student/apiReturnTypes"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"
import { isNavigating } from "@/store/store"
import { useAtom } from "jotai"
import { css } from "@emotion/react"

function index() {
	const [isNavigatingAtom, setIsNavigatingAtom] = useAtom(isNavigating)
	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getFinanceDepositRateType>(
		["student", "homeFinanceGetRate"],
		getFinanceDepositRateAPI,
		// { staleTime: 200000 },
	)
	return (
		<div>
			<PageHeader title={"예금"} />
			{data && data.myDeposit.interest === 0 && <GuidePage data={data} refetch={refetch} />}
			{data && data.myDeposit.interest !== 0 && <DetailPage data={data} refetch={refetch} />}

			{!data && (
				<div
					css={css`
						width: 100%;
						display: flex;
						justify-content: center;
					`}
				>
					<ContentWrapper>
						<div css={alertWrapperCSS}>
							<div
								css={css`
									width: 128px;
									height: 128px;
								`}
							>
								{isNavigatingAtom === false && <UseAnimations animation={alertCircle} size={128} />}
							</div>
							<div css={labelCSS}>은행이 아직 열리지 않았어요!</div>
						</div>
					</ContentWrapper>
				</div>
			)}
		</div>
	)
}

const alertWrapperCSS = css`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 16px;
`

const labelCSS = css`
	margin-top: 12px;
	font-size: 24px;
	font-weight: 500;
	color: rgba(0, 0, 0, 0.6);
`

export default index
