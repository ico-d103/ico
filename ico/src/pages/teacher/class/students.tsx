import { useEffect } from "react"
import { css } from "@emotion/react"
import StudentList from "@/components/teacher/Class/Student/List/ClassStudentList"
import StudentDetail from "@/components/teacher/Class/Student/Detail/ClassStudentDetail"
import useMediaQuery from "@/hooks/useMediaQuery"
import useCompHandler from "@/hooks/useCompHandler"
import Modal from "@/components/common/Modal/Modal"
import { useAtomValue } from "jotai"
import { checkedStudent } from "@/store/store"
import Input from "@/components/common/Input/Input"
import Button from "@/components/common/Button/Button"
import useGetNation from "@/hooks/useGetNation"
import { CLASS_GRADE_DOWN, CLASS_GRADE_UP } from "@/components/teacher/Class/ClassIcons"

function students() {
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
		console.log(checkedStudentAtom.length)
	}, [checkedStudentAtom])

	return (
		<>
			<div css={modalWrapperCSS}>
				<span>체크를 통해 여러 명의 학생을 한 번에 관리해 보세요 !</span>
				<div css={modalContentCSS}>
					<Input
						theme={"greenDefault"}
						placeholder="사유를 입력해 주세요"
						customCss={reasonCSS}
						isTextarea={false}
						onClick={(e) => e.stopPropagation()}
					/>
					<Input
						theme={"greenDefault"}
						placeholder={nation.currency}
						customCss={moneyCSS}
						isTextarea={false}
						onClick={(e) => e.stopPropagation()}
					/>
					<Button
						text={"지급"}
						fontSize={`var(--teacher-h6)`}
						width={"50px"}
						height={"30px"}
						theme={"managePlus"}
						margin={"0 10px 0 0"}
						onClick={(e) => e.stopPropagation()}
					/>
					<Button
						text={"차감"}
						fontSize={`var(--teacher-h6)`}
						width={"50px"}
						height={"30px"}
						theme={"manageMinus"}
						onClick={(e) => e.stopPropagation()}
					/>
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
	margin-left: 180px;
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

const reasonCSS = css`
	width: 200px;
	height: 30px;
	margin-right: 20px;
`

const moneyCSS = css`
	width: 80px;
	height: 30px;
	margin-right: 20px;
`

const divideCSS = css`
	height: 30px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	margin: 0 20px;
`

export default students
