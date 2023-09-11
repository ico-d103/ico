import { css } from "@emotion/react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import CollapseMenu from "@/components/teacher/common/CollapseMenu/CollapseMenu"
import ListNumbering from "@/components/student/Gov/ListNumbering"
import GovRuleGrade from "@/components/student/Gov/Rule/GovRuleGrade"
import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { GovTabMenus } from "@/components/student/Gov/GovTabMenus"
import { getClassRuleAPI } from "@/api/student/gov/getClassRuleAPI"
import { useEffect, useState } from "react"
import { getGovRuleType } from "@/types/teacher/apiReturnTypes"
import { useQuery } from "@tanstack/react-query"

function index() {
	// const [ruleList, setRuleList] = useState<getGovRuleType[]>([])

	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getGovRuleType[]>(
		["student", "gov", "rule"],
		getClassRuleAPI,
		// { staleTime: 200000 },
	)

	// useEffect(() => {
	// 	getClassRuleAPI().then((res) => {
	// 		setRuleList(res)
	// 	})
	// }, [])

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
					{data && data.map((rule, idx) => (
						<CollapseMenu
							key={rule.id}
							title={<ListNumbering number={idx + 1} text={rule.title} />}
							fontSize={`var(--student-h3)`}
							bracketSize={"10px"}
							marginBottom={"10px"}
							reverse={true}
						>
							<div>
							
							<div css={detailWrapperCSS}>{rule.detail}</div>
							<div css={ruleDataWrapperCSS}>
								<span>최초 작성자 : {rule.author}</span>
								<span>{rule.createdAt === rule.updatedAt ? `작성일 : ${rule.createdAt}` : `수정일 : ${rule.updatedAt}`}</span>
							</div>
							</div>
							
						</CollapseMenu>
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

const detailWrapperCSS = css`
	white-space: pre-wrap;
	line-height: 150%;
	word-break: keep-all;
`

const ruleDataWrapperCSS = css`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 8px;
`
export default index
