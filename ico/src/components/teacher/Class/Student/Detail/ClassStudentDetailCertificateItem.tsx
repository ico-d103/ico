import { getLicenseType, licenseType } from "@/types/teacher/apiReturnTypes"
import { css } from "@emotion/react"
import ClassStudentDetailCertificateRange from "./ClassStudentDetailCertificateRange"

type ClassStudentDetailCertificateItemPropsType = {
	certificate: getLicenseType
}

function ClassStudentDetailCertificateItem({ certificate }: ClassStudentDetailCertificateItemPropsType) {
	return (
		<div css={wrapper}>
			<h4>{certificate.subject}</h4>
			<div>
				<ClassStudentDetailCertificateRange id={certificate.id} range={-1} />
			</div>
		</div>
	)
}

const wrapper = css`
	display: flex;
	flex-direction: row;
	align-items: center;

	> h4 {
		font-size: 1rem;
		min-width: 130px;
	}

	> div {
		width: 100%;
	}
`

export default ClassStudentDetailCertificateItem
