import React from "react"
import { css } from "@emotion/react"
import CommonListElement from "../../common/CommonListElement/CommonListElement"

type GovRuleClassDetailProps = {
	title: string
	content: string
	date: string
	idx: number
}

function GovRuleClassDetail({ title, content, date, idx }: GovRuleClassDetailProps) {
	const dropdownList = [
		{ name: "edit", content: null, label: "수정", function: () => {} },
		{ name: "delete", content: null, label: "삭제", function: () => {} },
	]
	return (
		<CommonListElement idx={idx} dropdownList={dropdownList}>
			<div css={detailWrapperCSS}>
				<div>
					<div css={titleCSS}>{title}</div>
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

	margin: 4px 16px 0px 16px;
`

const contentCSS = css`
	line-height: 130%;
`

export default GovRuleClassDetail
