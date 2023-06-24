import React from 'react'
import { depositProductType } from '@/types/student/apiReturnTypes'
import { css } from "@emotion/react"



function FinanceDepositListProduct(props: depositProductType) {
  return (
    <div css={itemWrapperCSS}>
        <div>{props.title}</div>
        <div>{props.interest}퍼센트</div>
        <div>{props.period}일 </div>
    </div>
  )
}

const itemWrapperCSS = css`
  width: 100%;
`

export default FinanceDepositListProduct