import React from "react"
import { css } from "@emotion/react"
import FinanceDepositListProduct from "./FinanceDepositListProduct"
import FinanceDepositListMyProduct from "./FinanceDepositListMyProduct"
import { getFinanceDepositType } from "@/types/student/apiReturnTypes"
import { useAtom } from "jotai"
import { isNavigating } from "@/store/store"
import Loading from "../../common/Loading/Loading"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"

type FinanceDepositListProps = {
	data: getFinanceDepositType | undefined
	isLoading: boolean
}
function FinanceDepositList({ data, isLoading }: FinanceDepositListProps) {
	const [isNavigatingAtom, setIsNavigatingAtom] = useAtom(isNavigating)

	const renderProduct =
		data &&
		data.depositProduct.map((item, idx) => {
			return <FinanceDepositListProduct data={item} account={data.account} />
		})

	const renderMyProduct =
		data &&
		data.myDeposit.map((item, idx) => {
			return <FinanceDepositListMyProduct data={item} />
		})

	const loading = (
		<div
			css={css`
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				direction: ltr;
			`}
		>
			{isNavigatingAtom === false && (
				<Loading size={96} labelSize={18} labelMargin={"24px 0px 16px 0px"} label={"내역을 불러오는 중이에요!"} />
			)}
		</div>
	)

	const empty = (
		<div css={alertWrapperCSS}>
			<div
				css={css`
					width: 128px;
					height: 128px;
				`}
			>
				{isNavigatingAtom === false && <UseAnimations animation={alertCircle} size={128} />}
			</div>
			<div css={labelCSS}>상품이 없어요!</div>
		</div>
	)

	return (
		<div css={contentParentCSS}>
			<div css={depositWrapperCSS}>
				<div css={itemWrapperCSS({ display: data && data.myDeposit.length ? true : false, fill: false })}>
					<div css={titleLabelCSS}>내가 신청한 예금</div>
					{isLoading && loading}
					{data && data.myDeposit.length === 0 && empty}
					{renderMyProduct}
				</div>
				<div css={lineCSS({ display: data && data.myDeposit.length ? true : false })} />
				<div css={itemWrapperCSS({ display: true, fill: true })}>
					<div css={titleLabelCSS}>예금 상품</div>
					{isLoading && loading}
					{data && data.depositProduct.length === 0 && empty}
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
	flex: 1;
`

const depositWrapperCSS = css`
	@media (max-width: 1024px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		flex: 1;
	}

	@media (min-width: 1025px) {
		/* margin-left: 16px; */
		min-width: 568px;
		max-width: 1024px;
		width: 60vw;
		display: grid;
		grid-template-columns: 50% 50%;
		direction: rtl;

		flex: 1;
		/* background-color: red;; */

		/* place-items: center; */
		justify-items: center;
	}
`

const itemWrapperCSS = ({ display, fill }: { display: boolean; fill: boolean }) => {
	return css`
		@media (max-width: 1024px) {
			display: ${display ? "flex" : "none"};
			${fill && "flex: 1"};
		}
		/* background-color: red; */

		display: flex;
		flex-direction: column;
		align-items: center;

		padding: 16px;

		width: 95%;
		background-color: white;
		border-radius: 10px;
		height: 100%;
	`
}

const lineCSS = ({ display }: { display: boolean }) => {
	return css`
		width: 95%;
		height: 1px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		margin: 24px 0px 24px 0px;

		@media (max-width: 1024px) {
			display: ${display ? "block" : "none"};
		}

		@media (min-width: 1025px) {
			display: none;
		}
	`
}

const titleLabelCSS = css`
	width: 100%;
	font-size: var(--student-h2);
	font-weight: 700;
	direction: ltr;
`

const alertWrapperCSS = css`
	width: 100%;
	height: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 16px;
	direction: ltr;
`

const labelCSS = css`
	margin-top: 12px;
	font-size: 24px;
	font-weight: 500;
	color: rgba(0, 0, 0, 0.6);
	direction: ltr;
`

export default FinanceDepositList
