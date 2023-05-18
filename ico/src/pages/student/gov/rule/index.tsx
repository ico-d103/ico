import { css } from "@emotion/react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import CollapseMenu from "@/components/teacher/common/CollapseMenu/CollapseMenu"
import ListNumbering from "@/components/student/Gov/ListNumbering"
import GovRuleGrade from "@/components/student/Gov/Rule/GovRuleGrade"
import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { GovTabMenus } from "@/components/student/Gov/GovTabMenus"
import { getClassRuleAPI } from "@/api/student/gov/getClassRuleAPI"
import { useEffect, useState } from "react"
import { getClassRuleType } from "@/types/student/apiReturnTypes"

function index() {
	const [ruleList, setRuleList] = useState<getClassRuleType[]>([])

	useEffect(() => {
		getClassRuleAPI().then((res) => {
			setRuleList(res)
		})
	}, [])

	return (
		<div css={mainWrapperCSS}>
			<PageHeader title={"정부"} addComp={<TabMenu menus={GovTabMenus()} selected={0} />} />
			<div css={wrapperCSS}>
				<div css={contentCSS}>
					<CollapseMenu
						title={<span>신용 등급</span>}
						fontSize={`var(--student-h2)`}
						bracketSize={"10px"}
						children={<GovRuleGrade />}
						marginBottom={"20px"}
					/>
					{ruleList.map((rule, idx) => (
						<CollapseMenu
							key={rule.id}
							title={<ListNumbering number={idx + 1} text={rule.title} />}
							fontSize={`var(--student-h3)`}
							bracketSize={"10px"}
							children={<div>{rule.detail}</div>}
							marginBottom={"10px"}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

const mainWrapperCSS = css`
	padding-bottom: 6px;
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
