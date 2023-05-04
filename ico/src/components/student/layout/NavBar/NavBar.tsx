import React, { useState, useEffect } from "react"
import { css } from "@emotion/react"
import { useRouter } from "next/router"
// import navigate from "@/util/navigate"
import useNavigate from "@/hooks/useNavigate"

import { NAVBAR_CLASS, NAVBAR_GOVERNMENT, NAVBAR_STORE, NAVBAR_HOME } from "./NavBarIcons"

type NavBarProps = {
	children: any
}

function NavBar({ children }: NavBarProps) {
	const [selected, setSelected] = useState<number>(-1)
	const router = useRouter()
	const navigate = useNavigate()

	const routes: { [prop: string]: number } = {
		"/student/home": 0,
		"/student/test2": 1,
		"/student/gov/rule": 2,
		"/student/gov/exchequer": 2,
		"/student/gov/job": 2,
		"/student/shop/teacher": 3,
		"/student/shop/student": 3,
	}

	const navBarData: { [prop: number]: { url: string; name: string; label: string; content: any; function: Function } } =
		{
			0: { url: "/student/home", name: "home", label: "홈", content: NAVBAR_HOME, function: () => {} },
			1: { url: "/student/test2", name: "class", label: "우리반", content: NAVBAR_CLASS, function: () => {} },
			2: { url: "/student/gov/rule", name: "gov", label: "정부", content: NAVBAR_GOVERNMENT, function: () => {} },
			3: { url: "/student/shop/teacher", name: "store", label: "상점", content: NAVBAR_STORE, function: () => {} },
		}

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
		} else {
			navigate(navBarData[value].url, "leftToRight")
		}
	}

	const navBarRender = Object.keys(navBarData).map((el, idx) => {
		return (
			<div
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
		<div css={navBarParentCSS}>
			<div css={contentWrapperCSS}>{children}</div>

			<div css={navBarWrapperCSS}>
				<div css={indicatorWrapperCSS}>
					<div css={indicatorCSS({ length: Object.keys(navBarData).length, selected })} />
				</div>
				<div css={navBarInnerWrapperCSS}>{navBarRender}</div>
			</div>
		</div>
	)
}

const navBarParentCSS = css`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 64px;
`

const contentWrapperCSS = css`
	/* max-height: calc(100vh - 64px); */
	/* position: relative; */
`

const navBarWrapperCSS = css`
	height: 64px;
	width: 100%;
	background-color: white;
	box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
	position: fixed;
	bottom: 0;
	display: flex;
	flex-direction: column;
	z-index: 9999999;
`

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
		background-color: rgb(70, 101, 180);
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
		color: ${targetIdx === curIdx ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.7)"};
		font-size: 12px;
	`
}

export default NavBar
