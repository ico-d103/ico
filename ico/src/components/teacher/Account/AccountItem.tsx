import React from "react"
import { css } from "@emotion/react"

type AccountItemProps = {
	title: string
	content?: string
	noLine?: boolean
	rightContent?: any
}

function AccountItem({ title, content, noLine, rightContent }: AccountItemProps) {
	return (
		<div css={profileIndividualWrapperCSS({ noLine })}>
			<div>
				<div css={profileIndividualTitleCSS}>{title}</div>
				<div>{content}</div>
			</div>
			{rightContent && <div>{rightContent}</div>}
		</div>
	)
}

const profileIndividualWrapperCSS = ({ noLine }: { noLine?: boolean }) => {
	return css`
		width: 100%;
		height: 84px;
		border-bottom: ${noLine !== true && "1px solid rgba(0, 0, 0, 0.2)"};
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 36px;
	`
}

const profileIndividualTitleCSS = css`
	font-size: 14px;
	color: rgba(0, 0, 0, 0.6);
	margin-bottom: 6px;
`

export default AccountItem
