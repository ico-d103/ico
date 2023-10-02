import { getFinanceDepositAPI } from "@/api/student/finance/getFinanceDepositAPI"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import { getFinanceType } from "@/types/student/apiReturnTypes"
import { useQuery } from "@tanstack/react-query"
import { css } from "@emotion/react"
import FinanceList from "@/components/student/Finance/Bank/FinanceList"
import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { financeTabMenu } from "../../../../components/student/Finance/financeTabMenu"

function index() {
	const depositQuery = useQuery<getFinanceType>(
		["student", "homeFinanceGetRate"],
		getFinanceDepositAPI,
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
			<PageHeader title={"은행"} addComp={<TabMenu menus={financeTabMenu()} selected={0} />} />
			<FinanceList query={depositQuery} />
		</div>
	)
}

export default index
