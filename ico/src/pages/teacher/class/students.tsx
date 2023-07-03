import { useEffect } from "react"
import { css } from "@emotion/react"
import StudentList from "@/components/teacher/Class/Student/List/ClassStudentList"
import { useAtom, useSetAtom } from "jotai"
import { checkedStudent, selectedPage, selectedStudent } from "@/store/store"
import ClassStudentManageModal from "@/components/teacher/Class/Student/Modal/ClassStudentManageModal"

function students() {
	const setSelectedPageAtom = useSetAtom(selectedPage)
	const setSelectedStudentAtom = useSetAtom(selectedStudent)
	const [checkedStudentAtom, setCheckedStudentAtom] = useAtom(checkedStudent)

	useEffect(() => {
		// 페이지 이동 시 store값 초기화
		setSelectedPageAtom(1)
		setSelectedStudentAtom(-1)
		setCheckedStudentAtom([])
	}, [])

	return (
		<>
			{checkedStudentAtom.length !== 0 && <ClassStudentManageModal />}
			<div css={wrapperCSS}>
				<div css={studentListWrapperCSS}>
					<StudentList />
				</div>
			</div>
		</>
	)
}

const wrapperCSS = css`
	flex: 1;
	display: flex;
	flex-direction: row;
	gap: 30px;
`

const studentListWrapperCSS = css`
	flex: 1;
	display: flex;
	flex-direction: column;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`

export default students
