import React from "react"
import { css } from "@emotion/react"
import FinanceDepositListProduct from "./FinanceDepositListProduct"
import FinanceDepositListMyProduct from "./FinanceDepositListMyProduct"
import { getFinanceDepositType } from "@/types/student/apiReturnTypes"

function FinanceDepositList(props: getFinanceDepositType) {
	const renderProduct = props.depositProduct.map((item, idx) => {
		return <FinanceDepositListProduct data={item} account={props.account} />
	})

	const renderMyProduct = props.myDeposit.map((item, idx) => {
		return <FinanceDepositListMyProduct data={item} />
	})

	return (
		<div css={contentParentCSS}>
			<div css={depositWrapperCSS}>
                <div css={itemWrapperCSS}>
                    <div css={titleLabelCSS}>내가 신청한 예금</div>
                    {renderMyProduct}
                </div>
                <div css={lineCSS}/>
				<div css={itemWrapperCSS}>
                    <div css={titleLabelCSS}>예금 상품</div>
                    {renderProduct}
                </div>
			</div>
		</div>
	)
}

// const listWrapperCSS = css`
// 	@media (max-width: 1024px) {
// 		display: flex;
// 		flex-direction: column;
// 		align-items: center;
// 		width: 100%;
// 	}

// 	@media (min-width: 1025px) {
// 		/* margin-left: 16px; */
// 		min-width: 568px;
// 		max-width: 1024px;
// 		width: 60vw;
// 		display: grid;
// 		grid-template-columns: 50% 50%;
// 		/* place-items: center; */
// 		justify-items: center;
// 	}
// `

const contentParentCSS = css`
	/* background-color: red; */
	display: flex;
	flex-direction: column;
	align-items: center;
`

const depositWrapperCSS = css`
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
        direction: rtl;
        
		/* place-items: center; */
		justify-items: center;
	}
`

const itemWrapperCSS = css`
	
	/* background-color: red; */
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 16px;

    width: 95%;
    background-color: white;
    border-radius: 10px;

    

`

const lineCSS = css`
  width: 95%;
  height: 1px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 24px 0px 24px 0px;



	@media (min-width: 1025px) {
        display: none;
	}
`

const titleLabelCSS = css`
    width: 100%;
    font-size: var(--student-h2);  
    font-weight: 700;
    direction: ltr; 

`

export default FinanceDepositList
