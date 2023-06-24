import React from 'react'
import { css } from "@emotion/react"
import FinanceDepositListProduct from './FinanceDepositListProduct'
import FinanceDepositListMyProduct from './FinanceDepositListMyProduct'
import { getFinanceDepositType } from '@/types/student/apiReturnTypes'

function FinanceDepositList(props: getFinanceDepositType) {

    const renderProduct = props.depositProduct.map((item, idx) => {
        return <FinanceDepositListProduct {...item} />
    })

    const renderMyProduct = props.myDeposit.map((item, idx) => {
        return <FinanceDepositListMyProduct {...item} />
    })


  return (
    <div>
        <div>
            {renderProduct}
        </div>
        <div>
            {renderMyProduct}
        </div>
    </div>
  )
}


const listWrapperCSS = css`
    	@media (max-width: 1024px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
	
	@media (min-width: 1025px) {
		/* margin-left: 16px; */
		min-width: 568px;
		max-width: 1024px;
		width: 60vw;
		display: grid;
		grid-template-columns: 50% 50%;
		/* place-items: center; */
		justify-items: center;
	}
`

export default FinanceDepositList