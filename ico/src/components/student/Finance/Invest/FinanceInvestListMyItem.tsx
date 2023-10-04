import React from "react"
import { getFinanceInvestListMyItemDetailType, getFinanceInvestListMyItemType } from "@/types/student/apiReturnTypes"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import useGetNation from "@/hooks/useGetNation"
import { appendEulReul } from "@/util/isEndWithConsonant"
import useNavigate from "@/hooks/useNavigate"
import { getDateDiff } from "@/util/getDateDiff"

// stockId: 주식 id
// title: 주식 종목
// price: 매수 당시 주식 가격
// amount: 매수한 금액
// rate: 수익률

type FinanceInvestListMyItemProps = {
	stockId: number
	title: string
	itemData: getFinanceInvestListMyItemDetailType
	itemIdx: number
}

function FinanceInvestListMyItem({ stockId, title, itemData, itemIdx }: FinanceInvestListMyItemProps) {
	const [nation] = useGetNation()
	const navigate = useNavigate()

	return (
		<div css={itemWrapperCSS}>
			<div css={labelSectionCSS}>
				<div css={titleCSS}>{title}</div>
				<div>
					지금까지의 수익률은 <span css={highlightFontCSS}>{itemData.rate}</span>이에요!
				</div>
			</div>
			<Button
				text={"자세히"}
				fontSize={"var(--student-h3)"}
				width={"72px"}
				theme={"mobileNormal"}
				onClick={() => {
					navigate(`/student/finance/invest/${stockId}?item=${itemIdx}`, "bottomToTop")
				}}
			/>
		</div>
	)
}

const itemWrapperCSS = css`
	width: 100%;
	padding: 16px;
	background-color: rgba(0, 0, 0, 0.05);
	border-radius: 10px;
	margin-top: 16px;

	display: flex;
	justify-content: space-between;
	align-items: center;
	direction: ltr;
`

const titleCSS = css`
	font-size: var(--student-h2);
	font-weight: 500;
`

const labelSectionCSS = css`
	display: flex;
	flex-direction: column;
	gap: 8px;
`

const highlightFontCSS = css`
	font-weight: 600;
	color: var(--student-main-color-5);
`

export default FinanceInvestListMyItem
