import CommonListElement from "../../common/CommonListElement/CommonListElement"
import { css } from "@emotion/react"

type FinanceInvestIssueDetailProps = {
	content: string
	date: string
	showIdx: number
	amount: number
}

function FinanceInvestIssueDetail({ showIdx, content, date }: FinanceInvestIssueDetailProps) {
	return (
		<CommonListElement idx={showIdx}>
			<div css={detailWrapperCSS}>
				<div>
					{/* <div css={titleCSS}>{title}</div> */}
					<div css={contentCSS}>{content}</div>
				</div>
				<div css={dateCSS}>{date}</div>
			</div>
		</CommonListElement>
	)
}

const detailWrapperCSS = css`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-top: 12px;
	/* align-items: center; */
`

const titleCSS = css`
	font-weight: 700;
	margin-bottom: 10px;
`

const dateCSS = css`
	height: 100%;
	min-width: 100px;
	font-size: var(--teacher-h6);
	font-weight: 600;
	color: rgba(0, 0, 0, 0.6);
    text-align: end;
	margin: 0px 16px 0px 16px;
`

const contentCSS = css`
	line-height: 130%;
	word-break: normal;
	white-space: pre;
`

export default FinanceInvestIssueDetail
