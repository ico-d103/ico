import { css } from "@emotion/react"


function student() {
	return <div css={wrapperCSS}>student</div>
}

const wrapperCSS = css`
	display: flex;
	flex-direction: column;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
	min-height: 80vh;
`

export default student
