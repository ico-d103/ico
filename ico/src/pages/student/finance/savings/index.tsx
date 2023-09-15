import { getFinanceDepositAPI } from "@/api/student/finance/getFinanceDepositAPI"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import { getFinanceDepositType } from "@/types/student/apiReturnTypes"
import { useQuery } from "@tanstack/react-query"
import { css } from "@emotion/react"
import FinanceDepositList from "@/components/student/Finance/Deposit/FinanceDepositList"
import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { financeTabMenu } from "../../../../components/student/Finance/financeTabMenu"

function index() {
	const depositQuery = useQuery<getFinanceDepositType>(
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
			<PageHeader title={"은행"} addComp={<TabMenu menus={financeTabMenu()} selected={1} />} />
			<FinanceDepositList query={depositQuery} />
		</div>
	)
}

export default index
