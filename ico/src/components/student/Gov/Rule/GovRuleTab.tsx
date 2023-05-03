import { css } from "@emotion/react"

function GovRuleTab() {
	return (
		<div css={wrapperCSS}>
			<div css={selectedCSS}>학급 규칙</div>
			<div>세금 목록</div>
			<div>직업 목록</div>
		</div>
	)
}

const wrapperCSS = css`
	width: 100%;
	height: 52px;
	box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.25);
	/* box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25); */

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;

	> div {
		width: 33.3%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`

const selectedCSS = css`
	background-color: var(--student-main-color-2);
	border-radius: 10px 10px 0px 0px;
	border-bottom: 3px solid var(--student-main-color);
	font-weight: bold;
`

export default GovRuleTab
