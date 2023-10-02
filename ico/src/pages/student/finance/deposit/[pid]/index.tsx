import React from "react"
import { css } from "@emotion/react"
import { getFinanceDepositDetailAPI } from "@/api/student/finance/getFinanceDepositDetailAPI"
import { myInfoTypeForDeposit } from "@/types/student/apiReturnTypes"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import FinanceDetail from "@/components/student/Finance/Bank/FinanceDetail"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import QueryAdapter from "@/components/common/Adapter/QueryAdapter"

function DetailPage() {
	const router = useRouter()
	const { pid } = router.query

	const depositQuery = useQuery<myInfoTypeForDeposit>(["student", "homeFinanceGetRate"], () =>
		getFinanceDepositDetailAPI({ id: String(pid) }),
	)

	return (
		<div
			css={css`
				height: 100%;
				display: flex;
				flex-direction: column;
			`}
		>
			<PageHeader title={"예금"} />
			<QueryAdapter query={depositQuery} isEmpty={false}>
				{depositQuery.data && <FinanceDetail data={depositQuery.data} type={'deposit'} startDate={depositQuery.data.startDate} endDate={depositQuery.data.endDate} />}
			</QueryAdapter>
		</div>
	)
}

export default DetailPage
