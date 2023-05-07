import { css } from "@emotion/react"
import Link from "next/link"

type GovRuleTabPropsType = {
	selected: number
}

function GovRuleTab({ selected }: GovRuleTabPropsType) {
	return (
		<div css={wrapperCSS}>
			<Link href="/student/gov/rule" css={selected === 0 ? selectedCSS : null}>
				<div>학급 규칙</div>
			</Link>
			<Link href="/student/gov/exchequer" css={selected === 1 ? selectedCSS : null}>
				<div>세금 목록</div>
			</Link>
			<Link href="/student/gov/job" css={selected === 2 ? selectedCSS : null}>
				<div>직업 목록</div>
			</Link>
		</div>
	)
}

const wrapperCSS = css`
	width: 100%;
	height: 52px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;

	> a {
		width: 33.3%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		> div {
			color: var(--student-font-color);
		}
	}
`

const selectedCSS = css`
	background-color: #ffffff62;
	border-radius: 10px 10px 0px 0px;
	border-bottom: 3px solid #ff9f00;
	font-weight: bold;
`

export default GovRuleTab
