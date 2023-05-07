import { css } from "@emotion/react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import CollapseMenu from "@/components/teacher/common/CollapseMenu/CollapseMenu"
import ListNumbering from "@/components/student/Gov/ListNumbering"
import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { GovTabMenus } from "@/components/student/Gov/GovTabMenus"

function index() {
	const mockList = [
		{ id: 0, title: "소득세", content: "국민의 월급에서 10%에 해당하는 미소를 세금으로 부과합니다." },
		{ id: 1, title: "전기세", content: "국민의 월급에서 10%에 해당하는 미소를 세금으로 부과합니다." },
		{ id: 2, title: "쓰레기봉투", content: "국민의 월급에서 10%에 해당하는 미소를 세금으로 부과합니다." },
		{ id: 3, title: "건강보험료", content: "국민의 월급에서 10%에 해당하는 미소를 세금으로 부과합니다." },
	]

	const menus = [
		{ idx: 0, url: "/student/gov/rule", title: "학급 규칙" },
		{ idx: 1, url: "/student/gov/exchequer", title: "세금 목록" },
		{ idx: 2, url: "/student/gov/job", title: "직업 목록" },
	]

	return (
		<>
			<PageHeader title={"세금 목록"} addComp={<TabMenu menus={GovTabMenus()} selected={1} />} />
			<div css={wrapperCSS}>
				<div css={contentCSS}>
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
