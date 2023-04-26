import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import InvestChart from "@/components/teacher/Invest/InvestChart"
import InvestIssueForm from "@/components/teacher/Invest/InvestIssueForm"
import InvestStartForm from "@/components/teacher/Invest/InvestStartForm"

function invest() {
	const deleteInvest = () => {
		console.log("deleteInvest")
	}

	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<div css={titleCSS}>투자</div>
				<Button
					text={"투자 종목 삭제"}
					fontSize={`var(--teacher-h4)`}
					width={"190px"}
					theme={"normal"}
					onClick={deleteInvest}
				/>
			</div>
			<div css={subTitleCSS}>투자 종목 설정을 설정하고 이슈를 등록해 투자 상품을 관리할 수 있습니다.</div>

			<InvestStartForm />
			{/* <InvestChart /> */}
			{/* <InvestIssueForm /> */}
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
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
	font-size: 40px	;
	font-weight: bold;
`

const subTitleCSS = css`
	font-size: 0.95rem;
`

export default invest
