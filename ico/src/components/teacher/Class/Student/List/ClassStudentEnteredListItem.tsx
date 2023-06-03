import { css } from "@emotion/react"
import { getStudentListType } from "@/types/teacher/apiReturnTypes"
import { useAtomValue } from "jotai"
import { selectedStudent } from "@/store/store"
import useGetNation from "@/hooks/useGetNation"
import { CLASS_GRADE_DOWN, CLASS_GRADE_UP } from "../../ClassIcons"
import Button from "@/components/common/Button/Button"
import Input from "@/components/common/Input/Input"
import CollapseMenuStudentDetail from "@/components/teacher/common/CollapseMenu/CollapseMenuStudentDetail"
import ClassStudentDetail from "../Detail/ClassStudentDetail"

type StudentEnteredListItemPropsType = {
	student: getStudentListType
	idx: number
}

function StudentEnteredListItem({ student, idx }: StudentEnteredListItemPropsType) {
	const [nation] = useGetNation()
	const selectedStudentAtom = useAtomValue(selectedStudent)

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
						/>
						<h5 css={numberCSS}>{student.number}</h5>
						<h5 css={nameCSS}>{student.name}</h5>
						<h5 css={jobCSS}>{student.job ? student.job : "무직"}</h5>
					</div>
					<div css={rightWrapperCSS}>
						<h5 css={amountCSS}>
							{student.amount} {nation.currency}
						</h5>
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

export default StudentEnteredListItem
