import { css } from "@emotion/react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import CollapseMenu from "@/components/teacher/common/CollapseMenu/CollapseMenu"
import ListNumbering from "@/components/student/Gov/ListNumbering"
import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { GovTabMenus } from "@/components/student/Gov/GovTabMenus"
import { getGovExchequerAPI } from "@/api/teacher/gov/getGovExchequerAPI"
import { useEffect, useState } from "react"
import { getGovExchequerType } from "@/types/teacher/apiReturnTypes"

function index() {
	const [exchequerList, setExchequerList] = useState<getGovExchequerType[]>([])

	useEffect(() => {
		getGovExchequerAPI({}).then((res) => {
			setExchequerList(res)
		})
	}, [])

	return (
		<div css={mainWrapperCSS}>
			<PageHeader title={"세금 목록"} addComp={<TabMenu menus={GovTabMenus()} selected={1} />} />
			<div css={wrapperCSS}>
				<div css={contentCSS}>
					{exchequerList.map((exchequer, idx) => (
						<CollapseMenu
							key={exchequer.id}
							title={<ListNumbering number={idx + 1} text={exchequer.title} />}
							fontSize={`var(--student-h3)`}
							bracketSize={"10px"}
							children={<div>{exchequer.detail}</div>}
							marginBottom={"10px"}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

const mainWrapperCSS = css`
	padding-bottom: 30px;
`

const wrapperCSS = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const contentCSS = css`
	width: 95%;
`

export default index
