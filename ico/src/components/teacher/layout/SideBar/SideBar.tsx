import React, { useState } from "react"
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
	SUB_FINANCE_DEPOSIT,
	SUB_FINANCE_STOCK,
	SUB_STORE_STUDENT,
	SUB_STORE_TEACHER,
} from "./SideBarIcons"

type SideBarProps = {
	children: any
}

function SideBar({ children }: SideBarProps) {
	const [selectedMain, setSelectedMain] = useState<number>(0)
	const [selectedSub, setSelectedSub] = useState<number>(0)
	const router = useRouter()

	const selectMainHandler = (value: number) => {
		setSelectedMain(() => value)
		setSelectedSub(() => 0)
		router.push(SUB_ELEMENT[value][0].url)
	}

	const MAIN_LOGO = <img css={logoCSS} src={"/assets/icon_desktop.png"} />

	const MAIN_ELEMENT: { [prop: number]: { name: string; label: string; content: any } } = {
		0: { name: "class", label: "우리 반", content: MAIN_CLASS },
		1: { name: "government", label: "정부", content: MAIN_GOVERNMENT },
		2: { name: "finance", label: "금융", content: MAIN_FINANCE },
		3: { name: "store", label: "상점", content: MAIN_STORE },
	}

  const SUB_ELEMENT: {
    [prop: number]: {
      name: string, label: string, content: any, url: string
    }[]
  } = {
    0: [
      {name: 'view_students', label: '학생 정보', content: SUB_CLASS_STUDENTS, url: '/teacher/test'},
      {name: 'view_exchequer', label: '국고', content: SUB_CLASS_EXCHEQUER, url: '/teacher/test2'},
      {name: 'view_job_opening', label: '구인 구직', content: SUB_CLASS_OPENING_JOB, url: '/teacher/test'},
      {name: 'view_coupon', label: '쿠폰', content: SUB_CLASS_COUPON, url: '/teacher/test2'},
    ],
    1: [
      {name: 'set_class_rule', label: '학급 규칙', content: SUB_GOVERNMENT_RULE, url: '/teacher/test'},
      {name: 'set_exchequer_rule', label: '세금 관리', content: SUB_GOVERNMENT_EXCHEQUER, url: '/teacher/test2'},
      {name: 'set_job', label: '직업 관리', content: SUB_GOVERNMENT_JOB, url: '/teacher/test'},
      {name: 'set_credit_rating', label: '신용 등급', content: SUB_GOVERNMENT_CREDIT, url: '/teacher/test2'},
    ],
    2: [
      {name: 'set_deposit', label: '예금', content: SUB_FINANCE_DEPOSIT, url: '/teacher/finance/deposit'},
      {name: 'set_stock', label: '투자', content: SUB_FINANCE_STOCK, url: '/teacher/finance/invest'},
    ],
    3: [
      {name: 'teacher_products', label: '교사 상품', content: SUB_STORE_TEACHER, url: '/teacher/shop/teacher'},
      {name: 'student_products', label: '학생 상품', content: SUB_STORE_STUDENT, url: '/teacher/shop/student'},
    ],
  }

	const indicatorRender = (
		<div css={indicatorMainWrapperCSS}>
			<div css={indicatorMainIconWrapperCSS}>{MAIN_ELEMENT[selectedMain].content}</div>
			{MAIN_ELEMENT[selectedMain].label}

			<div css={bracketCSS}>&gt;</div>

			<div css={indicatorSubWrapperCSS}>{SUB_ELEMENT[selectedMain][selectedSub].label}</div>
		</div>
	)

	return (
		<div css={layoutWrapperCSS}>
			<div css={sideBarSpaceCSS} />
			<div css={sideBarWrapperCSS}>
				<SideBarLeft
					element={MAIN_ELEMENT}
					logo={MAIN_LOGO}
					selectHandler={selectMainHandler}
					selected={selectedMain}
				/>
				<SideBarRight
					element={SUB_ELEMENT[selectedMain]}
					selectHandler={setSelectedSub}
					selected={selectedSub}
					title={MAIN_ELEMENT[selectedMain].label}
				/>
			</div>
			<div css={contentOuterWrapperCSS}>
				{indicatorRender}
				<div css={contentInnerWrapperCSS}>{children}</div>
			</div>
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
`

const contentOuterWrapperCSS = css`
	/* margin-left: 20vw; */
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 25px 50px 50px 50px;
`

const contentInnerWrapperCSS = css`
	width: 100%;
	height: 100%;
`

const indicatorMainWrapperCSS = css`
	display: flex;
	align-items: center;
	font-size: var(--teacher-h5);
	font-weight: 600;
	opacity: 70%;
	margin-bottom: 24px;
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

export default SideBar
