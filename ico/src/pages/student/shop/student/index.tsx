import { css } from "@emotion/react"

import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import GovRuleTab from "@/components/student/Gov/Rule/GovRuleTab"

function index() {
	return (
		<>
			<PageHeader title={"상점"} addComp={<GovRuleTab />} />
			<div css={wrapperCSS}>
				<div css={contentWrapperCSS}>student</div>
			</div>
		</>
	)
}

const wrapperCSS = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const contentWrapperCSS = css`
	margin-top: 82px; /* 곧 삭제할 margin-top */

	width: 95%;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	box-sizing: border-box;
	padding: 30px;
`

export default index
