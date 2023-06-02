import { css } from "@emotion/react"

function ClassStudentDetailCertificate() {
	return (
		<div css={wrapperCSS}>
			<h4>자격증</h4>
			<div css={noneWrapperCSS}>
				<h5>자격증이 없습니다.</h5>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	width: 100%;
	padding: 30px;
	border: 1px solid #dde3ea;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	margin-bottom: 30px;

	> h4 {
		font-size: var(--teacher-h4);
		font-weight: bold;
		margin-bottom: 20px;
	}
`

const noneWrapperCSS = css`
	display: flex;
	justify-content: center;
	align-items: center;

	> h5 {
		font-size: var(--teacher-h5);
	}
`

export default ClassStudentDetailCertificate
