import React from "react"
import { myDepositType } from "@/types/student/apiReturnTypes"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import useGetNation from "@/hooks/useGetNation"
import { appendEulReul } from "@/util/isEndWithConsonant"
import useNavigate from "@/hooks/useNavigate"

type FinanceDepositListMyProductProps = {
	data: myDepositType
}

function FinanceDepositListMyProduct({ data }: FinanceDepositListMyProductProps) {
	const [nation] = useGetNation()
  const navigate = useNavigate()

	const getDateDiff = (d1: string, d2: null | string) => {
		const date1 = new Date(d1)
		let date2
		if (d2 !== null) {
			date2 = new Date(d2)
		} else {
			date2 = new Date()
		}

		const diffDate = date1.getTime() - date2.getTime()

		return Math.floor(Math.abs(diffDate / (1000 * 60 * 60 * 24))) // 밀리세컨 * 초 * 분 * 시 = 일
	}

	const restDate = getDateDiff(data.endDate, null)

	return (
		<div css={itemWrapperCSS}>
			<div css={labelSectionCSS}>
				<div css={titleCSS}>{data.title}</div>
				<div>
					<span css={highlightFontCSS}>{restDate}일</span> 뒤에{" "}
					<span css={highlightFontCSS}>
						{data.amount + data.depositAmount} {nation.currency}
					</span>
					{appendEulReul(nation.currency, true)} 얻을 수 있어요!
				</div>
				{/* <div>{props.period}일 </div> */}
			</div>
			<Button
				text={"자세히"}
				fontSize={"var(--student-h3)"}
				width={"100px"}
				theme={"mobileNormal"}
				onClick={() => {navigate(`/student/finance/deposit/${data.id}`, 'bottomToTop')}}
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

export default FinanceDepositListMyProduct
