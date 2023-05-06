import { css } from "@emotion/react"

type ClassStudentsListItemPropsType = {
	mock: {
		id: number
		number: number
		name: string
		job: string
		grade: number
	}
}

function ClassStudentsListItem({ mock }: ClassStudentsListItemPropsType) {
	return (
		<div css={wrapperCSS}>
			<div css={leftWrapperCSS}>
				<span css={numberCSS}>{mock.number}</span>
				<span css={nameCSS}>{mock.name}</span>
				<span css={jobCSS}>{mock.job}</span>
			</div>
			<div css={rightWrapperCSS}>{mock.grade}등급</div>
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

const leftWrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;

	> span {
		font-size: var(--student-h3);
	}
`

const numberCSS = css`
	font-weight: bold;
	color: var(--student-main-color-5);
`

const nameCSS = css`
	font-weight: bold;
`

const jobCSS = css`
	color: var(--teacher-gray-color);
`

const rightWrapperCSS = css`
	padding: 5px 15px;
	border-radius: 20px;
	background-color: var(--student-main-color);
	color: var(--student-main-color-5);
`

export default ClassStudentsListItem
