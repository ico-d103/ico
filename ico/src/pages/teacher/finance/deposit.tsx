import { css } from "@emotion/react"
import DepositTable from "@/components/teacher/Deposit/DepositTable"

function deposit() {
	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<div css={titleCSS}>예금</div>
			</div>
			<div css={subTitleCSS}>신용등급에 따른 예금 이자율을 설정할 수 있습니다.</div>

			<DepositTable />
		</div>
	)
}

const wrapperCSS = css`
	width: 100%;
	height: 100%;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`

const headerCSS = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`
const titleCSS = css`
	font-size: 40px;
	font-weight: bold;
`
const subTitleCSS = css`
	font-size: 0.95rem;
`

export default deposit
