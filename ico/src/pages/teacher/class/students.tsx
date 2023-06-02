import { useEffect } from "react"
import { css } from "@emotion/react"
import StudentList from "@/components/teacher/Class/Student/List/ClassStudentList"
import StudentDetail from "@/components/teacher/Class/Student/Detail/ClassStudentDetail"
import useMediaQuery from "@/hooks/useMediaQuery"
import useCompHandler from "@/hooks/useCompHandler"
import Modal from "@/components/common/Modal/Modal"
import { useAtom } from "jotai"
import { selectedStudent } from "@/store/store"

function students() {
	// const [openComp, closeComp, compState] = useCompHandler()
	// const isDeskTop = useMediaQuery("(min-width: 1440px")
	// const [selectedStudentAtom, setSelectedStudentAtom] = useAtom(selectedStudent)

	// useEffect(() => {
	// 	if (selectedStudentAtom !== -1) {
	// 		openComp()
	// 	}
	// }, [selectedStudentAtom])

	// const closeModalHandler = () => {
	// 	closeComp()
	// 	setSelectedStudentAtom(() => -1)
	// }

	// const modalContent = (
	// 	<div
	// 		css={modalWrapperCSS}
	// 		onClick={() => {
	// 			closeModalHandler()
	// 		}}
	// 	>
	// 		<div
	// 			css={modalInnerWrapperCSS}
	// 			onClick={(e) => {
	// 				e.stopPropagation()
	// 			}}
	// 		>
	// 			<StudentDetail />
	// 		</div>
	// 	</div>
	// )

	return (
		<div css={wrapperCSS}>
			<div css={studentListWrapperCSS}>
				<StudentList />
			</div>
			{/* {isDeskTop ? (
				<div css={rightWrapperCSS}>
					<div css={detailWrapperCSS}>
						<StudentDetail />
					</div>
				</div>
			) : (
				<Modal closeComp={closeComp} compState={compState} transition={"rightToLeft"} content={modalContent} />
			)} */}
		</div>
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

const rightWrapperCSS = css`
	flex: 1;
	/* height: 70vh; */

	width: 50%;
	display: flex;
	flex-direction: column;
	/* top: 0;
	position: sticky; */
	background-color: var(--common-back-color-2);
	border-radius: 10px;
`

const detailWrapperCSS = css`
	position: sticky;
	top: 0;
	padding: 30px;
	/* height: 100%; */
	min-height: 70vh;
`

const modalWrapperCSS = css`
	width: 100vw;
	height: 100vh;
	/* background-color: red; */
	display: flex;
	justify-content: flex-end;
	padding: 64px 64px;
`

const modalInnerWrapperCSS = css`
	width: 600px;
	height: 100%;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
	box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
	overflow-y: scroll;
	overflow-x: hidden;

	&::-webkit-scrollbar {
	}

	&::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.1);
	}

	&::-webkit-scrollbar-track {
		margin-top: 6px;
		margin-bottom: 6px;
	}
`

export default students
