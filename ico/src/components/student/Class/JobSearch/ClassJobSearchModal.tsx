import { css } from "@emotion/react"

type ClassJobSearchModalPropsType = {
	job: string
}

function ClassJobSearchModal({ job }: ClassJobSearchModalPropsType) {
	return (
		<div css={wrapperCSS}>
			<span>
				<b>{job}</b> (을/를) 선택했어요
			</span>
			<div css={buttonWrapperCSS}>
				<button>취소</button>
				<button>신청할래요 !</button>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	padding: 30px 20px;
	width: 280px;
	height: 170px;
	background: #ffffff;
	border: 1px solid rgba(0, 0, 0, 0.1);
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	border-radius: 10px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 35px;

	> span {
		font-size: 1rem;

		> b {
			font-weight: bold;
			color: var(--student-main-color-5);
		}
	}
`

const buttonWrapperCSS = css`
	display: flex;
	flex-direction: row;
	gap: 15px;

	> button {
		border-radius: 20px;
		padding: 10px;
		font-size: var(--student-h3);
	}

	> button:nth-of-type(1) {
		background-color: rgba(199, 199, 199, 0.4);
		color: #828282;
	}

	> button:nth-of-type(2) {
		background-color: var(--student-main-color);
		color: var(--student-main-color-5);
		/* background-color: var(--student-main-color-3);
		color: var(--student-font-color); */
	}
`

export default ClassJobSearchModal
