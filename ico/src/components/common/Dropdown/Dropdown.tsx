import React, { useState, useEffect, useRef } from "react"
import { css } from "@emotion/react"

type DropdownProps = {
	compState: any
	closeComp: any
	element: { name: string; content: any; label: string; function: Function }[]
	height: string
	width: string
	align?: "left" | "right"
}

function Dropdown({ compState, closeComp, element, height, width, align }: DropdownProps) {
	const [dropState, setDropState] = useState<boolean>(false)
	const dropdownWrapperRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (compState) {
			setDropState(() => compState)
		} else {
			setTimeout(() => {
				setDropState(() => compState)

				closeComp()
			}, 300)
		}
	}, [compState])

	const dropdownHandler = () => {
		closeComp()
	}

	useEffect(() => {
		if (compState) {
			window.addEventListener("mouseup", dropdownHandler)
		} else {
			window.removeEventListener("mouseup", dropdownHandler)
		}
	}, [compState])

	const renderDropdown = element.map((el, idx) => {
		return (
			<div
				key={idx}
				css={dropdownIndividualCSS({ height })}
				onClick={(event) => {
					el.function()
					dropdownHandler()
				}}
			>
				{el.content}
				{el.label}
			</div>
		)
	})

	return (
		<div
			ref={dropdownWrapperRef}
			onClick={(event) => {
				event.stopPropagation()
			}}
			css={dropdownWrapperCSS({ compState, dropState, width, height, listCount: element.length, align })}
		>
			{renderDropdown}
		</div>
	)
}

const dropdownWrapperCSS = ({
	compState,
	dropState,
	width,
	height,
	listCount,
	align,
}: {
	compState: boolean
	dropState: boolean
	width: string
	height: string
	listCount: number
	align: undefined | "left" | "right"
}) => {
	return css`
		width: ${width};
		height: 0px;
		height: ${compState ? (dropState ? `calc(${height} * ${listCount})` : "0px") : "0px"};
		transition-property: height;
		transition-duration: 0.3s;
		box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.15);
		overflow: hidden;
		border-radius: 10px;
		position: absolute;
		background-color: var(--common-back-color-2);
		${align ? align : "left"}: 0;
		top: 0;
		z-index: 99999;
	`
}

const dropdownIndividualCSS = ({ height }: { height: string }) => {
	return css`
		height: ${height};
		display: flex;
		padding-left: 20px;
		align-items: center;
		cursor: pointer;
		transition-property: background-color;
		transition-duration: 0.3s;
		font-weight: 500;
		color: rgba(0, 0, 0, 0, 8);
		&:hover {
			background-color: rgba(0, 0, 0, 0.05);
		}
	`
}

export default Dropdown
