import React from "react"
import { myInfoTypeForDeposit, myInfoTypeForSaving } from "@/types/student/apiReturnTypes"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import useGetNation from "@/hooks/useGetNation"
import { appendEulReul } from "@/util/isEndWithConsonant"
import useNavigate from "@/hooks/useNavigate"
import { getDateDiff } from "@/util/getDateDiff"

type FinanceListMyProductProps = {
	data: myInfoTypeForDeposit
	type: 'deposit'
	endDate: string
} | {
	data: myInfoTypeForSaving
	type: 'saving'
	endDate: string
} 

function FinanceListMyProduct({ data, type, endDate }: FinanceListMyProductProps) {
	const [nation] = useGetNation()
	const navigate = useNavigate()

	const restDate = getDateDiff(endDate, null)

	const navigateHandler = () => {
		if (type === 'deposit') {
			navigate(`/student/finance/deposit/${data.id}`, "bottomToTop")
		} else {
			navigate(`/student/finance/savings/${data.id}`, "bottomToTop")
		}
	}

	const renderStillRemain = (
		<div>
			<span css={highlightFontCSS}>{restDate}일</span> 뒤에{" "}
			<span css={highlightFontCSS}>
				{data.amount + data.interestAmount} {nation.currency}
			</span>
			{appendEulReul(nation.currency, true)} 얻을 수 있어요!
		</div>
	)

	const renderMaturity = (
		<div>
			<span css={highlightFontCSS}>지금</span>{" "}
			<span css={highlightFontCSS}>
				{data.amount + data.interestAmount} {nation.currency}
			</span>
			{appendEulReul(nation.currency, true)} 얻을 수 있어요!
		</div>
	)

	return (
		<div css={itemWrapperCSS}>
			<div css={labelSectionCSS}>
				<div css={titleCSS}>{data.title}</div>
				{restDate === 0 ? renderMaturity : renderStillRemain}
				{/* <div>{props.period}일 </div> */}
			</div>
			<Button
				text={"자세히"}
				fontSize={"var(--student-h3)"}
				width={"72px"}
				theme={"mobileNormal"}
				onClick={navigateHandler}
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

export default FinanceListMyProduct
