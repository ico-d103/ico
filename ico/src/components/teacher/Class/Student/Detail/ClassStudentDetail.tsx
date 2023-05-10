import { useEffect } from "react"
import { css } from "@emotion/react"
import ClassStudentDetailHead from "./ClassStudentDetailHead"
import ClassStudentDetailMoney from "./ClassStudentDetailMoney"
import ClassStudentDetailGrade from "./ClassStudentDetailGrade"
import ClassStudentDetailAccountList from "./ClassStudentDetailAccountList"
import { useAtomValue } from "jotai"
import { selectedStudent } from "@/store/store"

function StudentDetail() {
	const selectedStudentAtom = useAtomValue(selectedStudent)

	return (
		<>
			{selectedStudentAtom === -1 ? (
				<div css={wrapperCSS}>
					<h1>관리할 학생을 선택해주세요.</h1>
				</div>
			) : (
				<>
					<h1 css={headerCSS}>학생 정보 상세보기</h1>
					<ClassStudentDetailHead />
					<ClassStudentDetailMoney />
					<ClassStudentDetailGrade />
					<ClassStudentDetailAccountList />
				</>
			)}
		</>
	)
}

const wrapperCSS = css`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	> h1 {
		font-size: var(--teacher-h2);
		color: var(--teacher-gray-color);
	}
`

const headerCSS = css`
	font-size: var(--teacher-h1);
	font-weight: bold;
`

export default StudentDetail
