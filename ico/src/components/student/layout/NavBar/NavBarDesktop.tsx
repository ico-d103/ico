import React, { useState, useEffect } from "react"
import { css } from "@emotion/react"
import { useRouter } from "next/router"
// import navigate from "@/util/navigate"
import useNavigate from "@/hooks/useNavigate"
import Link from "next/link"

import { NAVBAR_CLASS, NAVBAR_GOVERNMENT, NAVBAR_STORE, NAVBAR_HOME } from "./NavBarIcons"
import LoadImage from "@/components/common/LoadImage/LoadImage"
import { getHomeMyInfoAPI } from "@/api/student/home/getHomeMyInfoAPI"
import { getHomeMyInfoType } from "@/types/student/apiReturnTypes"
import { useQuery } from "@tanstack/react-query"
import NavBarDesktopRightMenu from "./NavBarDesktopRightMenu"

type NavBarProps = {
	children: any
	routes: { [prop: string]: number }
	navBarData: { [prop: number]: { url: string; name: string; label: string; content: any; function: Function } }
}

function NavBarDesktop({ children, routes, navBarData }: NavBarProps) {
	const [selected, setSelected] = useState<number>(-1)
	const router = useRouter()
	const navigate = useNavigate()

	// const routes: { [prop: string]: number } = {
	// 	"/student/home": 0,
	// 	"/student/home/asset": 0,
	// 	"/student/home/coupon": 0,
	// 	"/student/home/exchequer": 0,
	// 	"/student/finance/deposit": 0,
	// 	"/student/finance/invest": 0,
	// 	"/student/class/students": 1,
	// 	"/student/class/jobsearch": 1,
	// 	"/student/gov/rule": 2,
	// 	"/student/gov/exchequer": 2,
	// 	"/student/gov/job": 2,
	// 	"/student/shop/teacher": 3,
	// 	"/student/shop/student": 3,
	// 	"/student/shop/create": 3,
	// 	"/student/shop/teacher/[pid]": 3,
	// 	"/student/shop/student/[pid]": 3,
	// }

	// const navBarData: { [prop: number]: { url: string; name: string; label: string; content: any; function: Function } } =
	// 	{
	// 		0: { url: "/student/home", name: "home", label: "홈", content: NAVBAR_HOME, function: () => {} },
	// 		1: { url: "/student/class/students", name: "class", label: "우리반", content: NAVBAR_CLASS, function: () => {} },
	// 		2: { url: "/student/gov/rule", name: "gov", label: "정부", content: NAVBAR_GOVERNMENT, function: () => {} },
	// 		3: { url: "/student/shop/teacher", name: "store", label: "상점", content: NAVBAR_STORE, function: () => {} },
	// 	}

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
					<div css={iconWrapperCSS}>{navBarData[Number(el)].content}</div>
					{navBarData[Number(el)].label}
				</div>
			</div>
		)
	})

	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getHomeMyInfoType>(
		["student", "homeMyInfo"],
		getHomeMyInfoAPI,
		// { staleTime: 200000 },
	)

	useEffect(() => {
		refetch()
	}, [selected === -2])

	return (
		<div css={navBarParentCSS()}>
			<div css={navBarWrapperCSS({ selected })}>
				<div>
					<div css={logoWrapperCSS}>
						<LoadImage
							src={"/assets/children_icon.png"}
							alt={"icon"}
							wrapperCss={css`
								width: 36px;
								height: 36px;
								margin-right: 12px;

								/* filter: hue-rotate(300deg);
									opacity: 0.7; */
							`}
							sizes={"128px"}
						/>
						ICO
					</div>
					<div css={navBarInnerWrapperCSS}>{navBarRender}</div>
				</div>

				{/* {data && 
				<div css={footerWrapperCSS}>
					
					<div css={css`font-size: var(--student-h2);`}>
                        {data.name}님 환영해요!
                    </div>
                    <div css={css`margin-top: 8px;`}>
                        {data.school} {data.room}반 {data.number}번
                    </div>
				</div>
			} */}
			</div>

			<div css={contentWrapperCSS({ selected })}>

				{children}
				
			
			</div>

			<div css={rightBarWrapperCSS({ selected })}>{data && <NavBarDesktopRightMenu data={data} />}</div>
		</div>
	)
}

const navBarParentCSS = () => {
	return css`
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	`
}

const contentWrapperCSS = ({ selected }: { selected: number }) => {
	return css`
		min-height: ${selected !== -2 && "calc(100vh - 64px)"};
		max-width: ${selected !== -2 && "var(--student-full-width)"};
		margin-left: ${selected !== -2 && "var(--student-side-bar-width)"};
		/* position: relative; */
		/* display: flex; */
	`
}
const navBarWrapperCSS = ({ selected }: { selected: number }) => {
	return css`
		height: 100%;
		width: var(--student-side-bar-width);
		/* background-color: #fff9e6; */
		background-color: var(--student-main-color-soft);
		/* backdrop-filter: blur(30px); */
		box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.1);
		position: fixed;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		z-index: 99999;
		display: ${selected === -2 && "none"};
	`
}

const rightBarWrapperCSS = ({ selected }: { selected: number }) => {
	return css`
		height: 100vh;
		width: var(--student-side-bar-width);
		/* background-color: #fff9e6; */
		background-color: var(--student-main-color);
		/* backdrop-filter: blur(30px); */
		/* box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.1); */
		border-left: 1px solid rgba(0, 0, 0, 0.1);
		position: fixed;
		right: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		z-index: 99999;
		display: ${selected === -2 && "none"};

		@media (max-width: 1280px) {
			display: none;
		}

		@media (min-width: 1281px) {
		}
	`
}

const logoWrapperCSS = css`
	font-size: var(--student-h1);
	font-weight: 700;
	display: flex;
	align-items: center;
	color: #5aa9006a;
	padding: 18px;
	/* background-color: var(--student-main-color-2); */
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

const navBarInnerWrapperCSS = css`
	/* flex: 1;
	display: flex; */
	margin-top: 16px;
`

const navBarIndivCSS = css`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`

const iconWrapperCSS = css`
	width: 48px;
	height: 48px;
	display: flex;
	justify-content: center;
	align-items: center;
`

const navBarIndivContentCSS = ({ targetIdx, curIdx }: { targetIdx: number; curIdx: number }) => {
	return css`
		display: flex;
		/* flex-direction: column; */
		align-items: center;
		gap: 8px;
		width: 100%;
		padding-left: 16px;
		border-right: ${targetIdx === curIdx ? "6px solid var(--student-main-color-4)" : "none"};
		& path {
			transition-property: stroke;
			transition-duration: 0.2s;
			stroke: ${targetIdx === curIdx ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.7)"};
		}

		transition-property: color border;
		transition-duration: 0.2s;
		color: ${targetIdx === curIdx ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.5)"};
		font-size: 16px;
		cursor: pointer;
	`
}

const footerWrapperCSS = css`
	padding: 0px 0px 36px 16px;
`
export default NavBarDesktop
