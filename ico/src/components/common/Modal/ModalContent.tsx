import React from "react"
import { css } from "@emotion/react"

type ModalContentPropsType = {
	width: string
	icon: JSX.Element
	title: string
	titleSize: string
	content: JSX.Element
	forChild?: boolean
}

function ModalContent({ width, icon, title, titleSize, content, forChild }: ModalContentPropsType) {
	return (
		<div css={wrapperCSS({ width, forChild })}>
			<div css={headerCSS({ titleSize })}>
				<div>{icon}</div>
				<span>{title}</span>
			</div>
			<div css={contentWrapperCSS({ width, forChild })}>{content}</div>
		</div>
	)
}

const wrapperCSS = ({ width, forChild }: { width: string; forChild?: boolean }) => {
	return css`
		width: ${width};
		background-color: ${forChild ? 'white' : 'var(--common-back-color-2)'};
		border-radius: 10px;
		box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);

		display: flex;
		flex-direction: column;
		align-items: center;
	`
}

const headerCSS = ({ titleSize }: { titleSize: string }) => {
	return css`
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		padding: 24px;

		> span {
			font-size: ${titleSize};
		}
	`
}

const contentWrapperCSS = ({ width, forChild }: { width: string, forChild?: boolean }) => {
	return css`
		width: ${width};
		padding: 24px;
		background: ${forChild ? 'rgba(255,255,255,1)' : '#f6f8fa'};
		border-radius: 0px 0px 10px 10px;
		border-top: 1px solid rgba(0, 0, 0, 0.1);

		display: flex;
		flex-direction: column;
		align-items: center;
	`
}

export default ModalContent
