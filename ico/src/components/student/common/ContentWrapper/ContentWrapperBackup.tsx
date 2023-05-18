import React from "react"
import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/react"

type ContentWrapperProps = {
    children: any
    wrapperCss?: SerializedStyles
}

function ContentWrapper({children, wrapperCss}: ContentWrapperProps) {
	return (
		<div css={[wrapperCss, outerCardWrapperCSS]}>
			<div css={shadowMakerCSS} />
			<div css={cardWrapperCSS()}>
				{children}
				
			</div>
		</div>
	)
}

const outerCardWrapperCSS = css`

	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	/* margin-right: 16px; */
	border-radius: 10px;
	margin-right: 16px;
    /* overflow: hidden; */
`

const shadowMakerCSS = css`
	position: absolute;
	/* z-index: 9999999; */
	/* background-color: black; */
	width: 70%;
	height: 10%;
	bottom: 0px;
	border-radius: 100% / 100% 100% 100% 100%;
	box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.15);
`

const cardWrapperCSS = () => {
	return css`
        position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 10px;
        background-color: white;
	`
}



export default ContentWrapper
