import React from "react"
import { css } from "@emotion/react"
import { MAIN_SIGNOUT } from "./SideBarIcons"

type SideBarRightProps = {
	element: {
		[prop: string]: {
			name?: string
			label?: string
			content?: any
			menuIndex?: number
			for?: number
		}
	}
	selectHandler: Function
	selected: number
	title: string
}

function SideBarRight({ element, selectHandler, selected, title }: SideBarRightProps) {
	const renderElement = Object.keys(element).map((el, idx) => {
		if (typeof element[el].for !== "number") {
			return (
				<div
					key={`${element[el].name}-${idx}`}
					css={elementWrapperCSS({ target: idx, selected })}
					onClick={() => {
						selectHandler(idx)
					}}
				>
					<div css={contentWrapperCSS}>{element[el].content}</div>
					{element[el].label}
				</div>
			)
		}
	})

	return (
		<div css={sideBarRightWrapperCSS}>
			<div>
				<div css={titleWrapperCSS}>{title}</div>
				{renderElement}
			</div>

			<div css={footerWrapperCSS}>
				<div>
					<div css={userNameCSS}>김철수 선생님</div>
					<div css={userEmailCSS}>example@google.com</div>
				</div>
			</div>
		</div>
	)
}

const sideBarRightWrapperCSS = css`
	flex: 1;
	height: 100%;
	background-color: #06603b;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	user-select: none;
	padding: 12% 16px 36px 16px;
`

const titleWrapperCSS = css`
	color: rgb(255, 255, 255);
	font-size: 1.6rem;
	margin-bottom: 46px;
`

const elementWrapperCSS = ({ target, selected }: { target: number; selected: number }) => {
	return css`
		padding: 11px 16px 11px 16px;
		margin: 8px 4px 8px 4px;
		transition-property: background-color opacity;
		transition-duration: 0.3s;
		border-radius: 10px;
		background-color: ${target === selected && "#38735A"};
		cursor: pointer;
		color: rgba(255, 255, 255, 1);
		opacity: ${target === selected ? "100%" : "60%"};
		font-size: var(--teacher-h5);
		font-weight: 400;
		display: flex;
		align-items: center;

		&:hover {
			background-color: ${target !== selected && "#38735A"};
		}
	`
}

const contentWrapperCSS = css`
	width: 15%;
	margin-right: 12px;
`

const footerWrapperCSS = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const userNameCSS = css`
	color: rgb(255, 255, 255);
	margin-bottom: 8px;
	/* font-size: var(--teacher-h5); */
	font-weight: 400;
`

const userEmailCSS = css`
	color: rgba(255, 255, 255, 0.5);
	/* font-size: var(--teacher-h5); */
	font-weight: 400;
`

export default SideBarRight
