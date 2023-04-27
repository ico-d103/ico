import React from "react"
import { css } from "@emotion/react"

type ModalContentPropsType = {
	width: string
	icon: JSX.Element
	title: string
	content: JSX.Element
}

function ModalContent({ width, icon, title, content }: ModalContentPropsType) {
	return (
		<div css={wrapperCSS({ width })}>
			<div css={headerCSS}>
				<div>{icon}</div>
				<h2>{title}</h2>
			</div>
			<div css={contentWrapperCSS({ width })}>{content}</div>
		</div>
	)
}

const wrapperCSS = ({ width }: { width: string }) => {
	return css`
		width: ${width};
		background-color: var(--common-back-color-2);
		border-radius: 10px;
		box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);

		display: flex;
		flex-direction: column;
		align-items: center;
	`
}

const headerCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	padding: 30px;

	> h2 {
		font-size: var(--teacher-h2);
	}
`

const contentWrapperCSS = ({ width }: { width: string }) => {
	return css`
		width: ${width};
		padding: 30px;
		background: #f6f8fa;
		border-radius: 0px 0px 10px 10px;
		border-top: 1px solid rgba(0, 0, 0, 0.1);

		display: flex;
		flex-direction: column;
		align-items: center;
	`
}

export default ModalContent
