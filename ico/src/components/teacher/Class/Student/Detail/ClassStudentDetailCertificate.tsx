import { licenseType } from "@/types/teacher/apiReturnTypes"
import { css } from "@emotion/react"
import ClassStudentDetailCertificateItem from "./ClassStudentDetailCertificateItem"

type ClassStudentDetailCertificatePropsType = {
	license: licenseType[] | undefined
}

function ClassStudentDetailCertificate({ license }: ClassStudentDetailCertificatePropsType) {
	const mockList = [
		{
			id: 840,
			subject: "수학",
			rating: 1,
		},
		{
			id: 841,
			subject: "과학",
			rating: 1,
		},
		{
			id: 842,
			subject: "사회",
			rating: 0,
		},
		{
			id: 843,
			subject: "독서",
			rating: -1,
		},
		{
			id: 844,
			subject: "바른 글씨",
			rating: -1,
		},
		{
			id: 845,
			subject: "정리 정돈",
			rating: 7,
		},
		{
			id: 846,
			subject: "체력",
			rating: -1,
		},
		{
			id: 847,
			subject: "디자인",
			rating: -1,
		},
		{
			id: 848,
			subject: "저축",
			rating: -1,
		},
		{
			id: 849,
			subject: "운전면허",
			rating: -1,
		},
	]

	return (
		<div css={wrapperCSS}>
			<h4>자격증</h4>
			<div css={contentCSS}>
				{mockList?.length ? (
					<div css={listWrapperCSS}>
						{mockList.map((mock) => (
							<ClassStudentDetailCertificateItem key={mock.id} certificate={mock} />
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
	width: 100%;
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
