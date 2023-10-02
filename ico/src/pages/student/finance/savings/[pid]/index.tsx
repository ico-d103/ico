import React, {useEffect, useState} from "react"
import { css } from "@emotion/react"
import { getFinanceDepositDetailAPI } from "@/api/student/finance/getFinanceDepositDetailAPI"
import { myInfoTypeForSaving } from "@/types/student/apiReturnTypes"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import FinanceDetail from "@/components/student/Finance/Bank/FinanceDetail"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import QueryAdapter from "@/components/common/Adapter/QueryAdapter"
import { getFinanceSavingsDetailAPI } from "@/api/student/finance/getFinanceSavingsDetailAPI"

function DetailPage() {
	const router = useRouter()
	const { pid } = router.query
	const [endDate, setEndDate] = useState<string>('')

	const savingQuery = useQuery<myInfoTypeForSaving>(["student", "homeFinanceGetRate"], () =>
	getFinanceSavingsDetailAPI({ id: String(pid) }),
	)

	useEffect(() => {
		if (savingQuery.data) {
			const getSavingItem = savingQuery.data as myInfoTypeForSaving
			const startDate = new Date(getSavingItem.startDate)
			const endDate = startDate
			endDate.setDate(startDate.getDate() + ((getSavingItem.count + 2) * 7))
			const endDateString = endDate.toDateString()
			setEndDate(() => endDateString)
		}

	}, [savingQuery.data])
	

	return (
		<div
			css={css`
				height: 100%;
				display: flex;
				flex-direction: column;
			`}
		>
			<PageHeader title={"예금"} />
			<QueryAdapter query={savingQuery} isEmpty={false}>
				{savingQuery.data && endDate && <FinanceDetail data={savingQuery.data} type={"saving"} startDate={savingQuery.data.startDate} endDate={endDate} />}
			</QueryAdapter>
		</div>
	)
}

export default DetailPage
