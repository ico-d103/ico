import { css } from "@emotion/react"
import { getStudentListType } from "@/types/teacher/apiReturnTypes"
import { useSetAtom } from "jotai"
import { selectedStudent } from "@/store/store"
import useGetNation from "@/hooks/useGetNation"

type StudentEnteredListItemPropsType = {
	student: getStudentListType
	idx: number
}

function StudentEnteredListItem({ student, idx }: StudentEnteredListItemPropsType) {
	const [nation] = useGetNation()
	const setSelectedStudentAtom = useSetAtom(selectedStudent)

	const openStudentDetailHandler = (id: number) => {
		setSelectedStudentAtom(id)
	}

	return (
		<div css={wrapperCSS(idx)} onClick={() => openStudentDetailHandler(student.id)}>
			<div css={leftWrapperCSS}>
				<h4>{student.number}</h4>
				<h4>{student.name}</h4>
				<h4>{student.job}</h4>
			</div>
			<div css={rightWrapperCSS}>
				<div css={currencyWrapperCSS}>
					<div css={amountWrapperCSS}>{student.amount}</div>
					{nation.currency}
				</div>
				<div css={creditWrapperCSS}>{student.creditRating}등급</div>
			</div>
		</div>
	)
}

const wrapperCSS = (idx: number) => {
	return css`
		width: 100%;
		padding: 10px 15px;
		background-color: ${idx % 2 === 0 ? `var(--teacher-main-color-op-2)` : `var(--common-back-color-2)`};
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

const leftWrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 15px;

	> h4 {
		font-size: var(--teacher-h4);
	}

	> h4:nth-of-type(1) {
		font-weight: bold;
	}

	> h4:nth-of-type(2) {
		min-width: 70px;
	}
`

const rightWrapperCSS = css`
	padding: 3px 3px 3px 0px;
	background-color: var(--teacher-main-color);
	border-radius: 5px;
	/* width: 200px; */
	display: flex;
	flex-direction: row;
	align-items: center;

	> div {
		padding: 10px;
	}

	> div:nth-of-type(1) {
		color: var(--common-back-color-2);
	}

	> div:nth-of-type(2) {
		background-color: var(--common-back-color-2);
		border-radius: 3px 3px 3px 3px;
	}
`

const currencyWrapperCSS = css`
	display: flex;
`

const amountWrapperCSS = css`
	/* width: 70px; */
	text-align: right;
`

const creditWrapperCSS = css`
	width: 65px;
	display: flex;
	justify-content: center;
`

export default StudentEnteredListItem
