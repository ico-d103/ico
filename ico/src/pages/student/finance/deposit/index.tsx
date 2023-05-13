import { getFinanceDepositRateAPI } from '@/api/student/finance/getFinanceDepositRateAPI'
import DetailPage from '@/components/student/Finance/Deposit/DetailPage/DetailPage'
import GuidePage from '@/components/student/Finance/Deposit/GuidePage/GuidePage'
import PageHeader from '@/components/student/layout/PageHeader/PageHeader'
import { getFinanceDepositRateType } from '@/types/student/apiReturnTypes'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

function index() {
	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getFinanceDepositRateType>(
		["student", "homeFinanceGetRate"],
		getFinanceDepositRateAPI,
		// { staleTime: 200000 },
	)
  return (
	<div>
		<PageHeader title={"예금"} />
		{data && data.myDeposit.interest === 0 && 
			<GuidePage data={data} refetch={refetch}/>
		}
		{data && data.myDeposit.interest !== 0 && 
			<DetailPage data={data} refetch={refetch}/>
		}

	</div>
  )
}

export default index