import PageHeader from '@/components/student/layout/PageHeader/PageHeader'
import React, {useEffect, useState} from 'react'
import { css } from "@emotion/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getFinanceInvestAPI } from '@/api/student/finance/getFinanceInvestAPI'
import { getFinanceInvestType } from '@/types/student/apiReturnTypes'
import FinanceInvestChart from '@/components/student/Finance/Invest/Chart/FinanceInvestChart'
import { LineSvgProps } from '@nivo/line'

type chartData = {
    "id": string
    "color": string
    "data": {
        "x": string,
        "y": number,
      }[]
  }


function index() {
    const [chartData, setChartData] = useState<LineSvgProps['data'] | null>(null)
    const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getFinanceInvestType>(
		["student", "financeInvest"],
		getFinanceInvestAPI,
		// { staleTime: 200000 },
	)

    useEffect(() => {
        if (data) {
            const temp: LineSvgProps['data'] = [{
                id: data.stock,
                color: 'rgba(0, 0, 0, 1)',
                data: []
              }]
              
              let count = 0
              for (const el of data.issue) {
                
                temp[0].data.push({x: el.date, y: el.amount})
                count += 1
                if (count >= 7) {
                    break
                }
              }
            //   data.issue.forEach((el, idx) => {
            //     temp[0].data.push({x: el.date, y: el.amount})
            //     if (idx >= 7) {
            //         return false
            //     }
            //   })
              setChartData(() => temp)
        }
        
    
    
    }, [data])

    useEffect(() => {
        console.log(chartData)
    }, [chartData])
    

  return (
    <div>
        <PageHeader title={"투자"}/>
        <div css={contentWrapperCSS}>
            {chartData && <FinanceInvestChart data={chartData}/>}

        </div>
    </div>
  )
}

const contentWrapperCSS = css`
    display: flex;
    flex-direction: column;
    align-items: center;

`

export default index