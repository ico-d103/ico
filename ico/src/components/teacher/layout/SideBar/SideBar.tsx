import React, { useState, useEffect } from "react"
import { css } from "@emotion/react"
import { useRouter } from "next/router"
import SideBarLeft from "./SideBarLeft"
import SideBarRight from "./SideBarRight"
import {
	MAIN_CLASS,
	MAIN_GOVERNMENT,
	MAIN_FINANCE,
	MAIN_STORE,
	SUB_CLASS_STUDENTS,
	SUB_CLASS_EXCHEQUER,
	SUB_CLASS_OPENING_JOB,
	SUB_CLASS_COUPON,
	SUB_GOVERNMENT_CREDIT,
	SUB_GOVERNMENT_EXCHEQUER,
	SUB_GOVERNMENT_JOB,
	SUB_GOVERNMENT_RULE,
	SUB_GOVERNMENT_ECONOMY,
	SUB_FINANCE_DEPOSIT,
	SUB_FINANCE_STOCK,
	SUB_STORE_STUDENT,
	SUB_STORE_TEACHER,
	SUB_CORPORATE_MANAGEMENT,
} from "./SideBarIcons"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import "overlayscrollbars/overlayscrollbars.css"
import { number } from "prop-types"
import { useAtom } from "jotai"
import { nationData } from "@/store/store"
import useGetNation from "@/hooks/useGetNation"
import { MAIN_ELEMENT, SUB_ELEMENT } from "@/constants/TeacherMenu"

type SideBarProps = {
	children: any
}

function SideBar({ children }: SideBarProps) {
	const [nationDataAtom, setNationDataAtom] = useAtom(nationData)
	const [selectedMain, setSelectedMain] = useState<number>(-1)
	const [selectedSub, setSelectedSub] = useState<number>(-1)
	const router = useRouter()

	useEffect(() => {
		// Object.keys(SUB_ELEMENT).forEach((el: string, idx: number) => {
		// 	if (SUB_ELEMENT[Number(el)][router.pathname]) {

		// 		setSelectedMain(() => Number(el))
		// 		const curRoute = SUB_ELEMENT[Number(el)][router.pathname]

		// 		if (typeof curRoute.menuIndex === "number") {
		// 			const temp = curRoute.menuIndex
		// 			setSelectedSub(() => temp)
		// 		} else if (typeof curRoute.for === "number") {
		// 			const temp = curRoute.for
		// 			setSelectedSub(() => temp)
		// 		}

		// 	} else {

		// 		if (Object.keys(SUB_ELEMENT).length - 1 === idx && selectedMain == -1 && selectedSub == -1) {

		// 			setSelectedMain(() => -2)
		// 			setSelectedSub(() => -2)
		// 		}
		// 	}

		// })

		for (const el of Object.keys(SUB_ELEMENT)) {
			if (SUB_ELEMENT[Number(el)][router.pathname]) {
				setSelectedMain(() => Number(el))
				const curRoute = SUB_ELEMENT[Number(el)][router.pathname]

				if (typeof curRoute.menuIndex === "number") {
					const temp = curRoute.menuIndex
					setSelectedSub(() => temp)
				} else if (typeof curRoute.for === "number") {
					const temp = curRoute.for
					setSelectedSub(() => temp)
				}
				return
			} else {
				if (Object.keys(SUB_ELEMENT).length - 1 === Number(el) && selectedMain == -1 && selectedSub == -1) {
					setSelectedMain(() => -2)
					setSelectedSub(() => -2)
				} else if (!SUB_ELEMENT[Number(el)][router.pathname]) {
					setSelectedMain(() => -2)
					setSelectedSub(() => -2)
				}
			}
		}

		// return () => {
		// 	if (selectedMain == -1 && selectedSub == -1) {
		// 		setSelectedMain(() => -2)
		// 		setSelectedSub(() => -2)
		// 		alert('dfggrfw')
		// 	}
		// }
	}, [router.pathname])

	const selectMainHandler = (value: number) => {
		// setSelectedMain(() => value)
		// setSelectedSub(() => 0)
		router.push(Object.keys(SUB_ELEMENT[value])[0])
	}

	const selectSubHandler = (value: number) => {
		// setSelectedSub(() => value)
		router.push(Object.keys(SUB_ELEMENT[selectedMain])[value])
	}

	const MAIN_LOGO = <img css={logoCSS} src={"/assets/icon_desktop.png"} alt="교사회원 메인 아이콘" />



	const generateIndicator = () => {}

	const indicatorRender = selectedMain >= 0 && selectedSub >= 0 && (
		<div css={indicatorMainWrapperCSS}>
			<div css={indicatorMainIconWrapperCSS}>{MAIN_ELEMENT[selectedMain]?.content}</div>
			{MAIN_ELEMENT[selectedMain]?.label}
			<div css={bracketCSS}>&gt;</div>
			<div css={indicatorSubWrapperCSS}>{SUB_ELEMENT[selectedMain][router.pathname]?.label}</div>
		</div>
	)

	const sideBarRender = (
		<React.Fragment>
			<div css={sideBarSpaceCSS} />
			<div css={sideBarWrapperCSS}>
				<SideBarLeft
					element={MAIN_ELEMENT}
					logo={MAIN_LOGO}
					selectHandler={selectMainHandler}
					selected={selectedMain}
				/>
				<SideBarRight
					nationData={nationDataAtom}
					element={SUB_ELEMENT[selectedMain]}
					selectHandler={selectSubHandler}
					selected={selectedSub}
					title={MAIN_ELEMENT[selectedMain]?.label}
				/>
			</div>

			<div css={contentOuterWrapperCSS}>
				{indicatorRender}
				<div css={contentInnerWrapperCSS}>
					{children}
					<div css={bottomMarginCSS} />
				</div>
			</div>
		</React.Fragment>
	)

	return (
		<div css={layoutWrapperCSS}>
			{selectedMain >= 0 && selectedSub >= 0 ? sideBarRender : selectedMain === -2 && selectedSub === -2 && children}
		</div>
	)
}

const layoutWrapperCSS = css`
	width: 100vw;
	height: 100vh;
	display: flex;
`

const sideBarWrapperCSS = css`
	height: 100%;
	width: 20vw;
	min-width: 280px;
	max-width: 360px;
	background-color: red;
	display: flex;
	box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
	position: fixed;
	z-index: 99999;
`

const contentOuterWrapperCSS = css`
	/* margin-left: 20vw; */
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 25px 50px 0px 50px;
`

const contentInnerWrapperCSS = css`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`

const indicatorMainWrapperCSS = css`
	display: flex;
	align-items: center;
	font-size: var(--teacher-h5);
	font-weight: 600;
	opacity: 70%;
	margin-bottom: 24px;
	/* z-index: 0; */
`

const indicatorMainIconWrapperCSS = css`
	& path {
		stroke: black;
	}
	width: 32px;
	height: 32px;
	margin-right: 12px;
`

const bracketCSS = css`
	opacity: 50%;
	margin: 0px 12px 0px 12px;
`

const indicatorSubWrapperCSS = css`
	background-color: var(--teacher-main-color-op);
	color: var(--teacher-main-color-3);
	border-radius: 10px;
	padding: 8px;
`

const logoCSS = css`
	width: 100%;
`

const sideBarSpaceCSS = css`
	height: 100%;
	width: 20vw;
	min-width: 280px;
	max-width: 360px;
`

const bottomMarginCSS = css`
	min-height: 50px;
`

export default SideBar
