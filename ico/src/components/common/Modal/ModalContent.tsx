import React from "react"
import { css } from "@emotion/react"

type ModalContentPropsType = {
	width: string
}

function ModalContent({ width }: ModalContentPropsType) {
	return <div css={wrapperCSS({ width })}>ModalContent</div>
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

export default ModalContent
