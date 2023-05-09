import React from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import { getImmigrationListType } from "@/types/teacher/apiReturnTypes"
import { putImmigrationAcceptAPI } from "@/api/teacher/class/putImmigrationAcceptAPI"
import { deleteImmigrationDenyAPI } from "@/api/teacher/class/deleteImmigrationDenyAPI"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type StudentWaitingListItemPropsType = {
	student: getImmigrationListType
}

function StudentWaitingListItem({ student }: StudentWaitingListItemPropsType) {
	const queryClient = useQueryClient()
	const acceptMutation = useMutation((id: number) => putImmigrationAcceptAPI({ id: id }))
	const denyMutation = useMutation((id: number) => deleteImmigrationDenyAPI({ id: id }))

	const immigrationAcceptHandler = () => {
		acceptMutation.mutate(52, {
			onSuccess: () => {
				return queryClient.invalidateQueries(["studentList", "studentImmigrationList"])
			},
		})
	}

	const immigrationDenyHandler = () => {
		denyMutation.mutate(52, {
			onSuccess: () => {
				return queryClient.invalidateQueries(["studentList", "studentImmigrationList"])
			},
		})
	}

	return (
		<div css={wrapperCSS(student.id)}>
			<div css={leftWrapperCSS}>
				<h4>{student.number}</h4>
				<h4>{student.name}</h4>
			</div>
			<div css={rightWrapperCSS}>
				<Button
					text={"승인"}
					fontSize={`var(--teacher-h5)`}
					width={"80px"}
					height={"30px"}
					theme={"positive"}
					onClick={immigrationAcceptHandler}
				/>
				<Button
					text={"반려"}
					fontSize={`var(--teacher-h5)`}
					width={"80px"}
					height={"30px"}
					theme={"warning"}
					onClick={immigrationDenyHandler}
				/>
			</div>
		</div>
	)
}

const wrapperCSS = (id: number) => {
	return css`
		width: 100%;
		padding: 10px 15px;
		background-color: ${id % 2 === 0 ? `var(--teacher-main-color-op-2)` : `var(--common-back-color-2)`};
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

	> h4 {
		font-size: var(--teacher-h4);
	}

	> h4:nth-of-type(1) {
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
