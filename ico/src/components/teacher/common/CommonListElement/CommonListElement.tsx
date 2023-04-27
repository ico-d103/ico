import React from "react"
import { css } from "@emotion/react"
import Dropdown from "@/components/common/Dropdown/Dropdown"
import useCompHandler from "@/hooks/useCompHandler"

type CommonListElement = {
	children: any
	dropdownList?: { name: string; content: any; label: string; function: Function }[]
	idx: number
}

function CommonListElement({ children, dropdownList, idx }: CommonListElement) {
	const [openComp, closeComp, compState] = useCompHandler()

	const buttonRender = dropdownList && (
		<div
			css={buttonCSS}
			onClick={() => {
				openComp()
			}}
		>
			<Dropdown
				compState={compState}
				closeComp={closeComp}
				width={"128px"}
				height={"48px"}
				element={dropdownList}
				align={"right"}
			/>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
					stroke="black"
					strokeOpacity="0.5"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
					stroke="black"
					strokeOpacity="0.5"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
					stroke="black"
					strokeOpacity="0.5"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	)

	return (
		<div>
			<div css={lineCSS} />
			<div css={contentWrapperCSS}>
				<div css={outerContentWrapperCSS}>
					<div css={idxWrapperCSS}>{typeof idx === 'number' && `# ${String(idx).padStart(2, "0")}`}</div>
					<div css={innerContentWrapperCSS}>{children}</div>
				</div>
				{buttonRender}
			</div>
		</div>
	)
}

const lineCSS = css`
	width: 100%;
	height: 1px;
	border-bottom: 1.5px solid rgba(0, 0, 0, 0.1);
	margin: 16px 0px 16px 0px;
`

const contentWrapperCSS = css`
	display: flex;
	justify-content: space-between;
	/* align-items: center; */
`

const innerContentWrapperCSS = css`
	flex: 1;
	height: 100%;
	display: flex;

	/* align-items: center; */
`

const outerContentWrapperCSS = css`
	display: flex;
	/* align-items: center; */
	flex: 1;
`

const idxWrapperCSS = css`
	width: 64px;
	height: 64px;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--teacher-main-color-3);
	background-color: #38735a25;
	font-weight: 700;
	margin-right: 24px;
`

const buttonCSS = css`
	background-color: rgba(0, 0, 0, 0.1);
	width: 48px;
	height: 48px;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition-property: background-color;
	transition-duration: 0.3s;
	cursor: pointer;
	user-select: none;
	position: relative;

	&:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}
`

export default CommonListElement
