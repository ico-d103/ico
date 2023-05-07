import { css } from "@emotion/react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import GovRuleTab from "@/components/student/Gov/Rule/GovRuleTab"
import CollapseMenu from "@/components/teacher/common/CollapseMenu/CollapseMenu"
import ListNumbering from "@/components/student/Gov/ListNumbering"
import GovRuleGrade from "@/components/student/Gov/Rule/GovRuleGrade"
import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { GovTabMenus } from "@/components/student/Gov/GovTabMenus"

function index() {
	const mockList = [
		{ id: 0, title: "대한민국은 민주공화국이다.", content: "학습 규칙 내용" },
		{ id: 1, title: "대한민국의 주권은 국민에게 있고, 모든 권력은 국민으로부터 나온다.", content: "학습 규칙 내용" },
		{ id: 2, title: "대한민국의 국민이 되는 요건은 법률로 정한다.", content: "학습 규칙 내용" },
		{ id: 3, title: "국가는 법률이 정하는 바에 의하여 재외국민을 보호할 의무를 진다.", content: "학습 규칙 내용" },
	]

	const menus = [
		{ idx: 0, url: "/student/gov/rule", title: "학급 규칙" },
		{ idx: 1, url: "/student/gov/exchequer", title: "세금 목록" },
		{ idx: 2, url: "/student/gov/job", title: "직업 목록" },
	]

	return (
		<>
			<PageHeader title={"학급 규칙"} addComp={<TabMenu menus={GovTabMenus()} selected={0} />} />
			<div css={wrapperCSS}>
				<div css={contentCSS}>
					<CollapseMenu
						title={<span>신용 등급</span>}
						fontSize={`var(--student-h2)`}
						bracketSize={"10px"}
						children={<GovRuleGrade />}
						marginBottom={"20px"}
					/>
					{mockList.map((mock) => (
						<CollapseMenu
							key={mock.id}
							title={<ListNumbering number={mock.id + 1} text={mock.title} />}
							fontSize={`var(--student-h3)`}
							bracketSize={"10px"}
							children={<div>{mock.content}</div>}
							marginBottom={"10px"}
						/>
					))}
				</div>
			</div>
		</>
	)
}

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
