import { css } from "@emotion/react"
import { getStudentListType } from "@/types/teacher/apiReturnTypes"
import { useAtomValue, useAtom } from "jotai"
import { selectedStudent, checkedStudent } from "@/store/store"
import useGetNation from "@/hooks/useGetNation"
import { CLASS_GRADE_DOWN, CLASS_GRADE_UP } from "../../ClassIcons"
import CollapseMenuStudentDetail from "@/components/teacher/common/CollapseMenu/CollapseMenuStudentDetail"
import ClassStudentDetail from "../Detail/ClassStudentDetail"
import ClassStudentDetailMoney from "../Detail/ClassStudentDetailMoney"

type StudentEnteredListItemPropsType = {
	student: getStudentListType
	idx: number
}

function StudentEnteredListItem({ student, idx }: StudentEnteredListItemPropsType) {
	const [nation] = useGetNation()
	const selectedStudentAtom = useAtomValue(selectedStudent)
	const [checkedStudentAtom, setCheckedStudentAtom] = useAtom(checkedStudent)

	const changeToggleState = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setCheckedStudentAtom([...checkedStudentAtom, student.id])
		} else {
			setCheckedStudentAtom(checkedStudentAtom.filter((id) => id !== student.id))
		}
	}

	return (
		<CollapseMenuStudentDetail
			studentId={student.id}
			titleChildren={
				<div css={wrapperCSS}>
					<div css={leftWrapperCSS}>
						<input
							type="checkbox"
							onClick={(e) => {
								e.stopPropagation()
							}}
							onChange={changeToggleState}
						/>
						<h5 css={numberCSS}>{student.number}</h5>
						<h5 css={nameCSS}>{student.name}</h5>
						<h5 css={jobCSS}>{student.job ? student.job : "무직"}</h5>
					</div>
					<div css={rightWrapperCSS}>
						<h5 css={amountCSS}>
							{student.amount} {nation.currency}
						</h5>
						<ClassStudentDetailMoney studentId={student.id} />
						<div css={divideCSS}></div>
						<h5 css={creditRatingCSS}>{student.creditRating}등급</h5>
						<div css={buttonWrapperCSS}>
							<div onClick={(e) => e.stopPropagation()}>{CLASS_GRADE_DOWN}</div>
							<h4 css={creditScoreCSS}>{student.creditScore} 점</h4>
							<div onClick={(e) => e.stopPropagation()}>{CLASS_GRADE_UP}</div>
						</div>
					</div>
				</div>
			}
			contentChildren={selectedStudentAtom === student.id ? <ClassStudentDetail /> : <></>}
		></CollapseMenuStudentDetail>
	)
}

const wrapperCSS = css`
	width: 100%;
	padding: 15px 15px;
	background-color: var(--common-back-color-2);
	border-radius: 10px;

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	transition: all 0.2s;

	:hover {
		filter: brightness(93%);
	}
`

const divideCSS = css`
	height: 40px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	margin: 0 20px;
`

const leftWrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 15px;

	> h5 {
		font-size: var(--teacher-h5);
	}

	> input {
		width: 20px;
		height: 20px;
		cursor: pointer;
	}
`

const rightWrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

const numberCSS = css`
	min-width: 20px;
`

const nameCSS = css`
	font-weight: bold;
	min-width: 55px;
`

const jobCSS = css`
	min-width: 100px;
	color: var(--teacher-gray-color);
`

const creditRatingCSS = css`
	min-width: 40px;
	font-weight: bold;
`

const creditScoreCSS = css`
	min-width: 40px;
`

const amountCSS = css`
	min-width: 110px;
	font-weight: bold;
`

const buttonWrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 10px;
	min-width: 130px;

	> div {
		cursor: pointer;
		transition: all 0.2s;

		:hover {
			transform: scale(1.2);
		}
	}
`

export default StudentEnteredListItem
