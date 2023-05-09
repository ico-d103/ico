import PageHeader from '@/components/student/layout/PageHeader/PageHeader'
import React, {useEffect, useState} from 'react'
import { css } from "@emotion/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getFinanceInvestAPI } from '@/api/student/finance/getFinanceInvestAPI'
import { getFinanceInvestType } from '@/types/student/apiReturnTypes'
import FinanceInvestChart from '@/components/student/Finance/Invest/Chart/FinanceInvestChart'
import { LineSvgProps } from '@nivo/line'
import ContentWrapper from '@/components/student/common/ContentWrapper/ContentWrapper'

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
              

        
              for (let i = 6; i >= 0; i--) {
                const date = new Date(data.issue[i].date)
                const mfDate: string = `${date.getMonth() + 1}.${date.getDate()}`
                temp[0].data.push({x: mfDate, y: data.issue[i].amount})
          
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
        console.log(data)
    }, [data])
    

  return (
    <div>
        <PageHeader title={"투자"}/>
        <div css={contentWrapperCSS}>
            {chartData && <FinanceInvestChart data={chartData}/>}
            <ContentWrapper>
                    <div css={sSizeFontCSS}>
                        일반 계좌
                    </div>
                    {data && data?.myStock.price !== 0 &&
                    <div css={lSizeFontCSS}>
                        {data.myStock.price} 단위연결! ({data.myStock.amount}주)
                    </div>}
            </ContentWrapper>
        </div>
    </div>
  )
}

const contentWrapperCSS = css`
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


export default index