import { css } from "@emotion/react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import GovRuleTab from "@/components/student/Gov/Rule/GovRuleTab"
import CollapseMenu from "@/components/teacher/common/CollapseMenu/CollapseMenu"

function index() {
	return (
		<>
			<PageHeader title={"학급 규칙"}  addComp={<GovRuleTab />} />
			<div css={wrapperCSS}>
				<div css={contentCSS}>
					<CollapseMenu
						title={"신용 등급"}
						fontSize={`var(--student-h3)`}
						bracketSize={"10px"}
						children={<div>신용 등급 내용</div>}
					/>
					<CollapseMenu
						title={"1. 대한민국은 민주공화국이다."}
						fontSize={`var(--student-h3)`}
						bracketSize={"10px"}
						children={<div>학급 규칙 내용</div>}
					/>
					<CollapseMenu
						title={"2. 대한민국의 주권은 국민에게 있고, 모든 권력은 국민으로부터 나온다."}
						fontSize={`var(--student-h3)`}
						bracketSize={"10px"}
						children={<div>학급 규칙 내용</div>}
					/>
					<CollapseMenu
						title={"3. 대한민국의 국민이 되는 요건은 법률로 정한다."}
						fontSize={`var(--student-h3)`}
						bracketSize={"10px"}
						children={<div>학급 규칙 내용</div>}
					/>
					<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>fdsfsdafdsdaf
					<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>fdsfsdafdsdaf
					<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>fdsfsdafdsdaf
					<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>fdsfsdafdsdaf
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
	/* margin-top: 82px; */
	width: 95%;
`

export default index
