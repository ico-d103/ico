import { css } from "@emotion/react"

type ListNumberingPropsType = {
	number: number
	text: string
}

function ListNumbering({ number, text }: ListNumberingPropsType) {
	return (
		<div css={wrapperCSS}>
			<div css={numberCSS}>{number}</div>
			<span>{text}</span>
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const numberCSS = css`
	min-width: 33px;
	min-height: 33px;
	max-width: 33px;
	max-height: 33px;
	border-radius: 10px;
	background-color: var(--student-main-color-2);
	color: var(--student-font-color);
	margin-right: 10px;

	display: flex;
	align-items: center;
	justify-content: center;
`

export default ListNumbering
