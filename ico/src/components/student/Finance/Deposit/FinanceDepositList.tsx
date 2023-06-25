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
				<div css={itemWrapperCSS}>{renderProduct}</div>
				<div css={itemWrapperCSS}>{renderMyProduct}</div>
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
		/* place-items: center; */
		justify-items: center;
	}
`

const itemWrapperCSS = css`
	width: 100%;
	/* background-color: red; */
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default FinanceDepositList
