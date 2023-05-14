import { css } from "@emotion/react"
import FinanceDepositTable from "@/components/teacher/Finance/Deposit/FinanceDepositTable"

function deposit() {
	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<div css={titleCSS}>예금</div>
			</div>
			<div css={subTitleCSS}>신용등급에 따른 예금 이자율을 설정할 수 있습니다.</div>

			<FinanceDepositTable />
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex: 1;
	flex-direction: column;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`

const headerCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`
const titleCSS = css`
	font-size: var(--teacher-h1);
	font-weight: bold;
`
const subTitleCSS = css`
	font-size: 0.95rem;
	margin-top: 12px;
	margin-bottom: 20px;
`
const depositTableCSS = css`
	margin-top: 20px;
`
export default deposit
