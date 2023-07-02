import { useEffect } from "react"
import { css } from "@emotion/react"
import StudentList from "@/components/teacher/Class/Student/List/ClassStudentList"
import StudentDetail from "@/components/teacher/Class/Student/Detail/ClassStudentDetail"
import useMediaQuery from "@/hooks/useMediaQuery"
import useCompHandler from "@/hooks/useCompHandler"
import Modal from "@/components/common/Modal/Modal"
import { useAtomValue, useSetAtom } from "jotai"
import { checkedStudent, selectedPage, selectedStudent } from "@/store/store"
import Button from "@/components/common/Button/Button"
import useGetNation from "@/hooks/useGetNation"
import ClassStudentDetailMoney from "@/components/teacher/Class/Student/Detail/ClassStudentDetailMoney"

function students() {
	const setSelectedPageAtom = useSetAtom(selectedPage)
	const setSelectedStudentAtom = useSetAtom(selectedStudent)
	const checkedStudentAtom = useAtomValue(checkedStudent)
	const [openComp, closeComp, compState] = useCompHandler()
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
	// 			closeComp()
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

	const modalContent = <div css={modalWrapperCSS}></div>
	const [nation] = useGetNation()

	useEffect(() => {
		// 다른 페이지에서 pagination number가 조정됐을 시, 초기화
		setSelectedPageAtom(1)
		setSelectedStudentAtom(-1)
	}, [])

	return (
		<>
			{checkedStudentAtom.length !== 0 && (
				<div css={modalWrapperCSS}>
					<span>
						{checkedStudentAtom.map((obj) => Object.values(obj)[0]).join(", ")}{" "}
						{checkedStudentAtom.length <= 1 ? "학생" : "학생들"}에 대해
					</span>
					<div css={modalContentCSS}>
						{/* studentId는 임시 */}
						<ClassStudentDetailMoney studentId={-1} />
						<div css={divideCSS}></div>
						<span>신용 점수를</span>
						<Button
							text={"올릴게요"}
							fontSize={`var(--teacher-h6)`}
							width={"80px"}
							height={"30px"}
							theme={"managePlus"}
							margin={"0 10px 0 0"}
							onClick={(e) => e.stopPropagation()}
						/>
						<Button
							text={"내릴게요"}
							fontSize={`var(--teacher-h6)`}
							width={"80px"}
							height={"30px"}
							theme={"manageMinus"}
							onClick={(e) => e.stopPropagation()}
						/>
					</div>
				</div>
			)}

			{/* {checkedStudentAtom.length !== 0 && (
				<Modal closeComp={closeComp} compState={compState} transition={"rightToLeft"} content={modalContent} />
			)} */}
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
		</>
	)
}

const wrapperCSS = css`
	flex: 1;
	display: flex;
	flex-direction: row;
	gap: 30px;
	/* position: relative; */
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
	position: fixed;
	top: 50px;
	margin-left: 200px;
	padding: 30px;
	border-radius: 10px;
	background-color: var(--common-back-color-2);
	box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
	z-index: 999999999;

	> span {
		font-size: var(--teacher-h5);
		color: var(--teacher-gray-color);
	}
`

// const modalWrapperCSS = css`
// 	width: 100vw;
// 	height: 100vh;
// 	background-color: red;
// 	display: flex;
// 	justify-content: flex-end;
// 	padding: 64px 64px;
// `

// const modalInnerWrapperCSS = css`
// 	width: 100%;
// 	height: 80px;
// 	background-color: var(--common-back-color-2);
// 	border-radius: 10px;
// 	padding: 30px;
// 	box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
// 	overflow-y: scroll;
// 	overflow-x: hidden;

// 	&::-webkit-scrollbar {
// 	}

// 	&::-webkit-scrollbar-thumb {
// 		background: rgba(0, 0, 0, 0.1);
// 	}

// 	&::-webkit-scrollbar-track {
// 		margin-top: 6px;
// 		margin-bottom: 6px;
// 	}
// `

const modalContentCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 20px;

	> span {
		font-size: var(--teacher-h5);
		color: var(--teacher-gray-color);
		margin-right: 15px;
	}
`

const divideCSS = css`
	height: 30px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	margin: 0 20px;
`

export default students
