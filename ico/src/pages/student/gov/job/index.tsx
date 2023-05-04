import { css } from "@emotion/react"
import GovRuleTab from "@/components/student/Gov/Rule/GovRuleTab"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"

function index() {
	return (
		<>
			<PageHeader title={"직업 목록"} addComp={<GovRuleTab />} />
			<div css={wrapperCSS}>
				<div css={contentCSS}>
					<div css={titleCSS}>
						우리반에는 <span>20개</span>의 직업이 있어요
					</div>
					<div css={jobListCSS}></div>
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

const titleCSS = css`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.1rem;

	> span {
		font-weight: bold;
		color: var(--student-main-color-5);
	}
`

const jobListCSS = css`
	margin-top: 30px;
	padding: 30px;
	width: 100%;
	background-color: var(--student-wrapper-color);
	border-radius: 10px;
`

export default index
