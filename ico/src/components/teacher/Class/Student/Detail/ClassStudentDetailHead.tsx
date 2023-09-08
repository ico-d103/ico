import { useEffect, useState } from "react"
import { css } from "@emotion/react"
import ClassStudentDetailMoney from "./ClassStudentDetailMoney"
import { CLASS_GRADE_DOWN, CLASS_GRADE_UP } from "../../ClassIcons"
import { getStudentListType } from "@/types/teacher/apiReturnTypes"
import useNotification from "@/hooks/useNotification"
import useGetNation from "@/hooks/useGetNation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { checkedStudent } from "@/store/store"
import { postCreditScoreAPI } from "@/api/teacher/class/postCreditScoreAPI"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import CheckBox from "@/components/teacher/common/CheckBox/CheckBox"

type ClassStudentDetailHeadPropsType = {
	student: getStudentListType
}

function ClassStudentDetailHead({ student }: ClassStudentDetailHeadPropsType) {
	const noti = useNotification()
	const [nation] = useGetNation()
	const queryClient = useQueryClient()
	const [checkedStudentAtom, setCheckedStudentAtom] = useAtom(checkedStudent)
	const postCreditScoreMutation = useMutation((args: { studentId: number; body: { type: boolean } }) =>
		postCreditScoreAPI(args),
	)
	const [isChecked, setIsChecked] = useState<boolean>(false)

	const changeToggleState = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setCheckedStudentAtom([...checkedStudentAtom, { [student.id]: student.name }])
		} else {
			setCheckedStudentAtom(
				checkedStudentAtom.filter((obj) => {
					return !obj.hasOwnProperty(student.id)
				}),
			)
		}
	}

	const postCreditScore = (type: boolean) => {
		const args = { studentId: student.id, body: { type: type } }

		postCreditScoreMutation.mutate(args, {
			onSuccess: () => {
				noti({
					content: <NotiTemplate type={"ok"} content={"성공적으로 수정되었습니다."} />,
					duration: 3000,
					id: "credit"
				})

				queryClient.invalidateQueries(["studentList", "entered"])
				queryClient.invalidateQueries(["enteredStudentDetail", student.id])
			},
			onError: () => {
				noti({
					content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
					duration: 3000,
				})
			},
		})
	}

	useEffect(() => {
		checkedStudentAtom.find((item) => {
			if (Object.keys(item)[0] === student.id.toString()) {
				setIsChecked(true)
			}
		})

		return () => {
			setIsChecked(false)
		}
	}, [checkedStudentAtom])

	return (
		<div css={wrapperCSS}>
			<CheckBox
				customCss={leftWrapperCSS}
				checked={isChecked}
				onClick={(e) => {
					e.stopPropagation()
				}}
				onChange={changeToggleState}
				id={`${student.id}`}
			>
				<label
					htmlFor={`${student.id}`}
					onClick={(e) => {
						e.stopPropagation()
					}}
				>
					<span css={numberCSS}>{student.number}</span>
					<span css={nameCSS}>{student.name}</span>
				</label>
				<span css={jobCSS}>{student.job ? student.job : "무직"}</span>
			</CheckBox>
			<div css={rightWrapperCSS}>
				<span css={amountCSS}>
					{student.amount} {nation.currency}
				</span>
				<ClassStudentDetailMoney studentId={student.id} manageAll={false} />
				<div css={divideCSS}></div>
				<span css={creditRatingCSS}>{student.creditRating}등급</span>
				<div css={buttonWrapperCSS}>
					<div
						onClick={(e) => {
							e.stopPropagation()
							postCreditScore(false)
						}}
					>
						{CLASS_GRADE_DOWN}
					</div>
					<h4 css={creditScoreCSS}>{student.creditScore} 점</h4>
					<div
						onClick={(e) => {
							e.stopPropagation()
							postCreditScore(true)
						}}
					>
						{CLASS_GRADE_UP}
					</div>
				</div>
			</div>
		</div>
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

	> span {
		font-size: var(--teacher-h5);
	}

	/* > input {
		width: 23px;
		height: 23px;
		cursor: pointer;
		border-radius: 50%;
		border: 1px solid #999;
		appearance: none;
		transition: background 0.2s;

		:checked {
			background: var(--teacher-main-color);
			border: none;
		}
	} */

	> label {
		display: flex;
		flex-direction: row;
		min-width: 100px;
	}
`

const rightWrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

const numberCSS = css`
	min-width: 25px;
`

const nameCSS = css`
	font-weight: bold;
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

export default ClassStudentDetailHead
