import React from "react"
import { css } from "@emotion/react"
import FinanceInvestListItem from "./FinanceInvestListItem"
import FinanceInvestListMyItem from "./FinanceInvestListMyItem"
import { getFinanceInvestListStockItemType, getFinanceInvestListMyItemType } from "@/types/student/apiReturnTypes"
import { useAtom } from "jotai"
import { isNavigating } from "@/store/store"
import Loading from "../../common/Loading/Loading"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"
import { UseQueryResult } from "@tanstack/react-query"
import QueryAdapter from "@/components/common/Adapter/QueryAdapter"

type FinanceInvestListProps = {
	investProductQueries: UseQueryResult<getFinanceInvestListStockItemType[], unknown>
	investMyProductQueries: UseQueryResult<getFinanceInvestListMyItemType[], unknown>
}
function FinanceInvestList({ investProductQueries, investMyProductQueries }: FinanceInvestListProps) {
	const [isNavigatingAtom, setIsNavigatingAtom] = useAtom(isNavigating)

	const renderProduct =
		investProductQueries.data &&
		investProductQueries.data.map((product, idx) => {
			return <FinanceInvestListItem data={product} />
		})

	const renderMyProduct =
		investMyProductQueries.data &&
		investMyProductQueries.data.map((product, idx) => {
			const renderMyProductItem = product.stocklist.map((item, iidx) => {
				return (
					<FinanceInvestListMyItem stockId={product.stockId} title={product.title} itemData={item} itemIdx={iidx} />
				)
			})
			return renderMyProductItem
		})

	return (
		<div css={contentParentCSS}>
			<div css={investWrapperCSS}>
				<div
					className="my-list"
					css={itemWrapperCSS({
						display: investMyProductQueries.data && investMyProductQueries.data.length ? true : false,
						fill: false,
					})}
				>
					<div css={titleLabelCSS}>내가 투자한 종목</div>
					<QueryAdapter
						query={investMyProductQueries}
						isEmpty={!!(investMyProductQueries.data && investMyProductQueries.data.length === 0)}
						emptyLabel="종목이 없어요!"
						fetchingLabel="내역을 불러오는 중이에요!"
					>
						{renderMyProduct}
					</QueryAdapter>
				</div>
				<div
					css={lineCSS({ display: investMyProductQueries.data && investMyProductQueries.data.length ? true : false })}
				/>
				<div className="product-list" css={itemWrapperCSS({ display: true, fill: true })}>
					<div css={titleLabelCSS}>투자 종목</div>
					<QueryAdapter
						query={investProductQueries}
						isEmpty={!!(investProductQueries.data && investProductQueries.data.length === 0)}
						emptyLabel="종목이 없어요!"
						fetchingLabel="내역을 불러오는 중이에요!"
					>
						{renderProduct}
					</QueryAdapter>
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

const investWrapperCSS = css`
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
		min-width: 726px;
		display: grid;
		grid-template-columns: 50% 50%;
		/* direction: rtl; */

		& .my-list {
			grid-column-start: 2;
			grid-row-start: 1;
		}
		& .product-list {
			grid-column-start: 1;
			grid-row-start: 1;
		}

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

export default FinanceInvestList
