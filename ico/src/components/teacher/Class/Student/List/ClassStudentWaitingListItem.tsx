import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import { getImmigrationListType } from "@/types/teacher/apiReturnTypes"
import { putImmigrationAcceptAPI } from "@/api/teacher/class/putImmigrationAcceptAPI"
import { deleteImmigrationDenyAPI } from "@/api/teacher/class/deleteImmigrationDenyAPI"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type StudentWaitingListItemPropsType = {
	student: getImmigrationListType
	idx: number
}

function StudentWaitingListItem({ student, idx }: StudentWaitingListItemPropsType) {
	const queryClient = useQueryClient()
	const acceptMutation = useMutation((immigrationId: number) =>
		putImmigrationAcceptAPI({ immigrationId: immigrationId }),
	)
	const denyMutation = useMutation((immigrationId: number) =>
		deleteImmigrationDenyAPI({ immigrationId: immigrationId }),
	)

	const immigrationAcceptHandler = () => {
		acceptMutation.mutate(student.immigrationId, {
			onSuccess: () => {
				return queryClient.invalidateQueries(["studentList"])
			},
		})
	}

	const immigrationDenyHandler = () => {
		denyMutation.mutate(student.immigrationId, {
			onSuccess: () => {
				return queryClient.invalidateQueries(["studentList"])
			},
		})
	}

	return (
		<div css={wrapperCSS(idx)}>
			<div css={leftWrapperCSS}>
				<h5>{student.number}</h5>
				<h5>{student.name}</h5>
			</div>
			<div css={rightWrapperCSS}>
				<Button
					text={"승인"}
					fontSize={`var(--teacher-h5)`}
					width={"80px"}
					height={"30px"}
					theme={"managePlus"}
					onClick={immigrationAcceptHandler}
				/>
				<Button
					text={"반려"}
					fontSize={`var(--teacher-h5)`}
					width={"80px"}
					height={"30px"}
					theme={"manageMinus"}
					onClick={immigrationDenyHandler}
				/>
			</div>
		</div>
	)
}

const wrapperCSS = (idx: number) => {
	return css`
		width: 100%;
		padding: 10px 20px;
		background-color: ${idx % 2 === 0 ? `var(--teacher-main-color-op-2)` : `var(--common-back-color-2)`};
		border-radius: 10px;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	`
}

const leftWrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 15px;

	> h5:nth-of-type(1) {
		min-width: 20px;
		font-size: var(--teacher-h5);
	}

	> h5:nth-of-type(2) {
		font-size: var(--teacher-h5);
		font-weight: bold;
	}
`

const rightWrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 15px;
`

export default StudentWaitingListItem
