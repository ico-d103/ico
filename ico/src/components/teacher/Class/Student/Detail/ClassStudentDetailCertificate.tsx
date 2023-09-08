import { licenseType } from "@/types/teacher/apiReturnTypes"
import { css } from "@emotion/react"
import ClassStudentDetailCertificateItem from "./ClassStudentDetailCertificateItem"

type ClassStudentDetailCertificatePropsType = {
	license: licenseType[] | undefined
}

function ClassStudentDetailCertificate({ license }: ClassStudentDetailCertificatePropsType) {
	return (
		<div css={wrapperCSS}>
			<h4>자격증</h4>
			<div css={contentCSS}>
				{license?.length ? (
					<div css={listWrapperCSS}>
						{license.map((el) => (
							<ClassStudentDetailCertificateItem key={el.id} certificate={el} />
						))}
					</div>
				) : (
					<div css={noneListWrapperCSS}>
						<h5>자격증이 없습니다.</h5>
					</div>
				)}
			</div>
		</div>
	)
}

const wrapperCSS = css`
	padding: 30px;
	border: 1px solid #dde3ea;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	margin-bottom: 30px;
	min-height: 300px;

	> h4 {
		font-size: var(--teacher-h4);
		font-weight: bold;
		margin-bottom: 20px;
	}
`

const contentCSS = css`
	height: 200px;
	overflow-y: scroll;
`

const listWrapperCSS = css`
	display: flex;
	flex-direction: column;
	gap: 15px;
`

const noneListWrapperCSS = css`
	display: flex;
	justify-content: center;
	align-items: center;

	> h5 {
		font-size: var(--teacher-h5);
	}
`

export default ClassStudentDetailCertificate
