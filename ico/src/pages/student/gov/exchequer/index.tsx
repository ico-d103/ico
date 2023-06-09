import { css } from "@emotion/react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import CollapseMenu from "@/components/teacher/common/CollapseMenu/CollapseMenu"
import ListNumbering from "@/components/student/Gov/ListNumbering"
import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { GovTabMenus } from "@/components/student/Gov/GovTabMenus"
import { getGovExchequerAPI } from "@/api/teacher/gov/getGovExchequerAPI"
import { useEffect, useState } from "react"
import { getGovExchequerType } from "@/types/teacher/apiReturnTypes"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"

function index() {
	const [exchequerList, setExchequerList] = useState<getGovExchequerType[]>([])

	useEffect(() => {
		getGovExchequerAPI({}).then((res) => {
			setExchequerList(res)
		})
	}, [])

	return (
		<div css={mainWrapperCSS}>
			<PageHeader title={"정부"} addComp={<TabMenu menus={GovTabMenus()} selected={1} />} />
			<div css={wrapperCSS}>
				<div css={contentCSS}>
					{exchequerList.length === 0 ? (
						<div css={noneWrapperCSS}>
							<UseAnimations animation={alertCircle} size={200} strokeColor={"rgba(0,0,0,0.4)"} />
							<h3>등록된 세금 목록이 없어요</h3>
						</div>
					) : (
						<>
							{exchequerList.map((exchequer, idx) => (
								<CollapseMenu
									key={exchequer.id}
									title={<ListNumbering number={idx + 1} text={exchequer.title} />}
									fontSize={`var(--student-h3)`}
									bracketSize={"10px"}
									children={<div>{exchequer.detail}</div>}
									marginBottom={"10px"}
									reverse={true}
								/>
							))}
						</>
					)}
				</div>
			</div>
		</div>
	)
}

const mainWrapperCSS = css`
	padding-bottom: 6px;
	flex: 1;
	display: flex;
	flex-direction: column;

`

const wrapperCSS = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
`

const contentCSS = css`
	width: 95%;
	flex: 1;
	display: flex;
	flex-direction: column;
`

const noneWrapperCSS = css`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 1;

	> h3 {
		font-size: 1.1rem;
	}
`

export default index
