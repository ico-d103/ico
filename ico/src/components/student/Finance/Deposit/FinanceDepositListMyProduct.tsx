import React from 'react'
import { myDepositType } from '@/types/student/apiReturnTypes'
import { css } from "@emotion/react"



function FinanceDepositListMyProduct(props: myDepositType) {
  return (
    <div css={itemWrapperCSS}>
        <div>{props.title}</div>
        <div>{props.amount}</div>
    </div>
  )
}

const itemWrapperCSS = css`
  width: 100%;
`

export default FinanceDepositListMyProduct