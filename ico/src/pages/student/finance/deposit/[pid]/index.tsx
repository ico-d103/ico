import React from "react"
import { css } from "@emotion/react"
import { getFinanceDepositDetailAPI } from "@/api/student/finance/getFinanceDepositDetailAPI"
import { myDepositType } from "@/types/student/apiReturnTypes"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import FinanceDepositDetail from "@/components/student/Finance/Deposit/FinanceDepositDetail"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"






function DetailPage() {
    
  const router = useRouter()
    const { pid } = router.query


  const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<myDepositType>(
    ["student", "homeFinanceGetRate"], () => getFinanceDepositDetailAPI({ id: String(pid) }))


    return (
        <React.Fragment>
            <PageHeader title={'예금'}/>
            {data && <FinanceDepositDetail data={data}/>}
        </React.Fragment>
    )

  
}

export default DetailPage
