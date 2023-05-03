import React, { useState, useRef, useEffect } from "react"
import { css } from "@emotion/react"

type CollapseMenuProps = {
	children: JSX.Element
	title: string
	fontSize: string
	bracketSize: string
	border?: string
}

function CollapseMenu({ children, title, fontSize, bracketSize, border }: CollapseMenuProps) {
	const [isOpened, setIsOpened] = useState<boolean>(false)
	const [refresh, setRefresh] = useState<boolean>(false)
	const contentWrapperRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		setTimeout(() => {
			setRefresh((prev) => !prev)
		}, 400)
	}, [isOpened])

	return (
		<div css={ancWrapperCSS({ border })}>
			<div
				css={trgWrapperCSS({ fontSize })}
				onClick={() => {
					setIsOpened((prev) => !prev)
				}}
			>
				{title}
				<img css={bracketImgCSS({ isOpened, bracketSize })} src={"/assets/bracket.png"} />
			</div>

			<div css={contentWrapperCSS({ isOpened, contentWrapperRef })}>
				<div ref={contentWrapperRef}>
					<div css={spaceCSS} />
					{children}
					{refresh && <div />}
				</div>
			</div>
		</div>
	)
}

const ancWrapperCSS = ({ border }: { border: string | undefined }) => {
	return css`
		background-color: var(--common-back-color-2);
		border-radius: 10px;
		box-sizing: border-box;
		padding: 30px;
		margin-bottom: 24px;
		border: ${border ? border : "none"};
	`
}

const trgWrapperCSS = ({ fontSize }: { fontSize: string }) => {
	return css`
		/* font-size: var(--teacher-h1); */
		font-size: ${fontSize};
		font-weight: 700;
		user-select: none;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
	`
}

const bracketImgCSS = ({ isOpened, bracketSize }: { isOpened: boolean; bracketSize: string }) => {
	return css`
		transition-property: transform;
		transition-duration: 0.4s;
		width: auto;
		/* height: 18px; */
		height: ${bracketSize};
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