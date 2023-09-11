import React, { useState, useEffect } from "react"
import { css } from "@emotion/react"
import { useRouter } from "next/router"
// import navigate from "@/util/navigate"
import useNavigate from "@/hooks/useNavigate"
import Link from "next/link"

import { NAVBAR_CLASS, NAVBAR_GOVERNMENT, NAVBAR_STORE, NAVBAR_HOME } from "./NavBarIcons"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"

type NavBarProps = {
	children: any
	routes: { [prop: string]: number }
	navBarData: { [prop: number]: { url: string; name: string; label: string; content: any; function: Function } }
}

function NavBarMobile({ children, routes, navBarData }: NavBarProps) {
	const [selected, setSelected] = useState<number>(-1)
	const router = useRouter()
	const navigate = useNavigate()

	useEffect(() => {
		if (typeof routes[router.pathname] === "number") {
			setSelected(() => routes[router.pathname])
		} else {
			setSelected(() => -2)
		}
	}, [router.pathname])

	const selectHandler = (value: number) => {
		// setSelectedMain(() => value)
		// setSelectedSub(() => 0)
		if (value > selected) {
			navigate(navBarData[value].url, "rightToLeft")
		} else if (value < selected) {
			navigate(navBarData[value].url, "leftToRight")
		} else {
			navigate(navBarData[value].url, "beforeScale")
		}
	}

	const navBarRender = Object.keys(navBarData).map((el, idx) => {
		return (
			<div
				key={`navbar-${navBarData[Number(el)].label}`}
				onClick={() => {
					selectHandler(Number(el))
				}}
				css={navBarIndivCSS}
			>
				<div css={navBarIndivContentCSS({ targetIdx: selected, curIdx: Number(el) })}>
					{navBarData[Number(el)].content}
					{navBarData[Number(el)].label}
				</div>
			</div>
		)
	})

	return (
		<div css={navBarParentCSS()}>
			<div css={contentWrapperCSS({ selected })}>
				{/* <OverlayScrollbarsComponent options={{ scrollbars: { autoHide: "scroll" } }} css={scrollbarCSS} defer> */}
					<div
						
					>
						{children}
					</div>
				{/* </OverlayScrollbarsComponent> */}
			</div>

			<div css={navBarWrapperCSS({ selected })}>
				<div css={indicatorWrapperCSS}>
					<div css={indicatorCSS({ length: Object.keys(navBarData).length, selected })} />
				</div>
				<div css={navBarInnerWrapperCSS}>{navBarRender}</div>
			</div>
		</div>
	)
}

const navBarParentCSS = () => {
	return css`
		width: 100%;
		height: 100%;
		/* display: flex;
		flex-direction: column; */
	`
}

const contentWrapperCSS = ({ selected }: { selected: number }) => {
	return css`
		display: grid;
		height: calc(100% - 64px);
		overflow-y: scroll;

		/* -ms-overflow-style: none; 
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none; 
		} */
	`
}
const navBarWrapperCSS = ({ selected }: { selected: number }) => {
	return css`
		height: 64px;
		width: 100%;
		/* background-color: #fff9e6; */
		background-color: var(--student-main-color-soft);
		/* backdrop-filter: blur(30px); */
		box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.1);
		position: fixed;
		bottom: 0;
		display: flex;
		flex-direction: column;
		z-index: 99999;
		display: ${selected === -2 && "none"};
	`
}

const indicatorWrapperCSS = css`
	width: 100%;
	height: 3px;
`

const indicatorCSS = ({ length, selected }: { length: number; selected: number }) => {
	return css`
		transition-property: transform;
		transition-duration: 0.3s;
		width: calc(100% / ${length});
		height: 100%;
		transform: translate(calc(${selected} * 100%), 0px);
		background-color: #ff9d00a3;
	`
}

const navBarInnerWrapperCSS = css`
	flex: 1;
	display: flex;
`

const navBarIndivCSS = css`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`

const navBarIndivContentCSS = ({ targetIdx, curIdx }: { targetIdx: number; curIdx: number }) => {
	return css`
		display: flex;
		flex-direction: column;
		align-items: center;

		& path {
			transition-property: stroke;
			transition-duration: 0.2s;
			stroke: ${targetIdx === curIdx ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.7)"};
		}

		transition-property: color;
		transition-duration: 0.2s;
		color: ${targetIdx === curIdx ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.5)"};
		font-size: 12px;
	`
}

const scrollbarCSS = css`
	& .os-scrollbar-handle {
		width: 3px !important;
		background-color: rgba(0, 0, 0, 0.3);
	}
`

export default NavBarMobile
