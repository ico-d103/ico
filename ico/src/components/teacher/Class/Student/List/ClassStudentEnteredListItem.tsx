import { css } from "@emotion/react"
import { getStudentDetailType, getStudentListType } from "@/types/teacher/apiReturnTypes"
import { useAtomValue, useSetAtom } from "jotai"
import { selectedStudent } from "@/store/store"
import useGetNation from "@/hooks/useGetNation"
import { CLASS_GRADE_DOWN, CLASS_GRADE_UP } from "../../ClassIcons"
import Button from "@/components/common/Button/Button"
import Input from "@/components/common/Input/Input"
import CollapseMenuStudentDetail from "@/components/teacher/common/CollapseMenu/CollapseMenuStudentDetail"
import ClassStudentDetailAccountList from "../Detail/ClassStudentDetailAccountList"
import { useQuery } from "@tanstack/react-query"
import { getStudentDetailAPI } from "@/api/teacher/class/getStudentDetailAPI"
import ClassStudentDetailCertificate from "../Detail/ClassStudentDetailCertificate"
import { useEffect } from "react"
import ClassStudentDetail from "../Detail/ClassStudentDetail"

type StudentEnteredListItemPropsType = {
	student: getStudentListType
	idx: number
}

function StudentEnteredListItem({ student, idx }: StudentEnteredListItemPropsType) {
	const [nation] = useGetNation()
	const selectedStudentAtom = useAtomValue(selectedStudent)

	// const { data, refetch } = useQuery<getStudentDetailType>(
	// 	["enteredStudentDetail", selectedStudentAtom],
	// 	() => getStudentDetailAPI({ id: selectedStudentAtom }),
	// 	{ enabled: false },
	// )

	return (
		<CollapseMenuStudentDetail
			studentId={student.id}
			titleChildren={
				<div css={wrapperCSS(idx)}>
					<div css={leftWrapperCSS}>
						<input type="checkbox" />
						<h5 css={numberCSS}>{student.number}</h5>
						<h5 css={nameCSS}>{student.name}</h5>
						<h5 css={jobCSS}>{student.job ? student.job : "무직"}</h5>
					</div>
					<div css={rightWrapperCSS}>
						<h5 css={amountCSS}>
							{student.amount} {nation.currency}
						</h5>
						<Input theme={"greenDefault"} placeholder="사유를 입력해 주세요" customCss={reasonCSS} />
						<Input theme={"greenDefault"} placeholder={nation.currency} customCss={moneyCSS} />
						<Button
							text={"지급"}
							fontSize={`var(--teacher-h6)`}
							width={"50px"}
							height={"30px"}
							theme={"managePlus"}
							margin={"0 10px 0 0"}
							onClick={() => {}}
						/>
						<Button
							text={"차감"}
							fontSize={`var(--teacher-h6)`}
							width={"50px"}
							height={"30px"}
							theme={"manageMinus"}
							onClick={() => {}}
						/>
						<div css={divideCSS}></div>
						<h5 css={creditRatingCSS}>{student.creditRating}등급</h5>
						<div css={buttonWrapperCSS}>
							<div>{CLASS_GRADE_DOWN}</div>
							<h4 css={creditScoreCSS}>{student.creditScore} 점</h4>
							<div>{CLASS_GRADE_UP}</div>
						</div>
					</div>
				</div>
			}
			contentChildren={selectedStudentAtom === student.id ? <ClassStudentDetail /> : <></>}
		></CollapseMenuStudentDetail>
	)
}

const contentChildrenCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 30px;

	> div:nth-of-type(1) {
		width: 45%;
	}

	> div:nth-of-type(2) {
		width: 55%;
	}
`

const wrapperCSS = (idx: number) => {
	return css`
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
}

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

const rightWrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
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
