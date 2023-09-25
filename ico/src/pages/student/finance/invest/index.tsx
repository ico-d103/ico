// import { getFinanceDepositRateAPI } from "@/api/student/finance/getFinanceDepositRateAPI"
import { getFinanceDepositAPI } from "@/api/student/finance/getFinanceDepositAPI"
import ContentWrapper from "@/components/student/common/ContentWrapper/ContentWrapper"
// import DetailPage from "@/components/student/Finance/Deposit/DetailPage/DetailPage"
// import GuidePage from "@/components/student/Finance/Deposit/GuidePage/GuidePage"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
// import { getFinanceDepositRateType } from "@/types/student/apiReturnTypes"
import { getFinanceInvestListStockItemType, getFinanceInvestListMyItemType } from "@/types/student/apiReturnTypes"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"
import { isNavigating } from "@/store/store"
import { useAtom } from "jotai"
import { css } from "@emotion/react"
import { getFinanceInvestListAPI } from "@/api/student/finance/getFinanceInvestListAPI"
import FinanceInvestList from "@/components/student/Finance/Invest/FinanceInvestList"
import { getFinanceInvestMyListAPI } from "@/api/student/finance/getFinanceInvestMyListAPI"

function index() {
	const [isNavigatingAtom, setIsNavigatingAtom] = useAtom(isNavigating)

	const investProductQueries = useQuery<getFinanceInvestListStockItemType[]>(
		["student", "homeFinanceInvestList"],
		getFinanceInvestListAPI,
		// { staleTime: 200000 },
	)

	const investMyProductQueries = useQuery<getFinanceInvestListMyItemType[]>(
		["student", "homeFinanceInvestMyList"],
		getFinanceInvestMyListAPI,
		// { staleTime: 200000 },
	)

	return (
		<div
			css={css`
				flex: 1;
				display: flex;
				flex-direction: column;
				margin-bottom: 16px;
			`}
		>
			<PageHeader title={"투자"} />
			<FinanceInvestList investProductQueries={investProductQueries} investMyProductQueries={investMyProductQueries} />
		</div>
	)
}

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

const labelCSS = css`
	margin-top: 12px;
	font-size: 24px;
	font-weight: 500;
	color: rgba(0, 0, 0, 0.6);
`

export default index
