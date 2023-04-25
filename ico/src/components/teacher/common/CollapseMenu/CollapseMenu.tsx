import React, { useState, useRef } from "react"
import { css } from "@emotion/react"

type CollapseMenuProps = {
	children: any
	title: string
}

function CollapseMenu({ children, title }: CollapseMenuProps) {
	const [isOpened, setIsOpened] = useState<boolean>(false)
	const contentWrapperRef = useRef<HTMLDivElement>(null)

	return (
		<div css={ancWrapperCSS}>
			<div
				css={trgWrapperCSS}
				onClick={() => {
					setIsOpened((prev) => !prev)
				}}
			>
				{title}
				<img css={bracketImgCSS({ isOpened })} src={"/assets/bracket.png"} />
			</div>

			<div css={contentWrapperCSS({ isOpened, contentWrapperRef })}>
				<div ref={contentWrapperRef}>
					<div css={spaceCSS} />
					{children}
				</div>
			</div>
		</div>
	)
}

const ancWrapperCSS = css`
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	box-sizing: border-box;
	padding: 30px;
	margin-bottom: 24px;
`

const trgWrapperCSS = css`
	font-size: var(--teacher-h2);
	font-weight: 700;
	user-select: none;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const bracketImgCSS = ({ isOpened }: { isOpened: boolean }) => {
	return css`
		transition-property: transform;
		transition-duration: 0.4s;
		width: auto;
		height: 18px;
		transform: ${isOpened && "rotate( 180deg )"};
	`
}

const spaceCSS = css`
	height: 15px;
`

const contentWrapperCSS = ({ isOpened, contentWrapperRef }: { isOpened: boolean; contentWrapperRef: any }) => {
	return css`
		transition-property: max-height;
		transition-duration: 0.4s;
		overflow: hidden;
		/* height: ${isOpened ? "auto" : "0px"}; */
		max-height: ${isOpened ? `${contentWrapperRef.current && contentWrapperRef.current.clientHeight + 1}px` : "0px"};
	`
}

export default CollapseMenu
