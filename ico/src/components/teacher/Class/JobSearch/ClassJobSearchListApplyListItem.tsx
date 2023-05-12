import React from "react"
import { css } from "@emotion/react"
import { CLASS_APPLY_APPROVE, CLASS_APPLY_DENY } from "../ClassIcons"
import { postJobAcceptAPI } from "@/api/teacher/class/postJobAcceptAPI"
import { deleteJobDenyAPI } from "@/api/teacher/class/deleteJobDenyAPI"
import { useMutation } from "@tanstack/react-query"
import { getJobApplierType } from "@/types/teacher/apiReturnTypes"

type ClassJobSearchListApplyListItemPropsType = {
	student: getJobApplierType
}

function ClassJobSearchListApplyListItem({ student }: ClassJobSearchListApplyListItemPropsType) {
	// const acceptMutation = useMutation(({ id: string }) => postJobAcceptAPI(id))
	// const denyMutation = useMutation(({ id: string }) => deleteJobDenyAPI(id))

	const approveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
		e.stopPropagation() // 이벤트 버블링 방지

		// acceptMutation.mutate(id, {
		// 	onSuccess: () => {
		// 		return
		// 	},
		// })
	}

	const denyHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
		e.stopPropagation()

		// denyMutation.mutate(id, {
		// 	onSuccess: () => {
		// 		return
		// 	},
		// })
	}

	return (
		<div css={wrapperCSS}>
			<div>
				<div css={numberCSS}>{student.number}</div>
				<h5 css={nameCSS}>{student.name}</h5>
			</div>
			<div css={buttonWrapperCSS}>
				<div onClick={approveHandler}>{CLASS_APPLY_APPROVE}</div>
				<div onClick={denyHandler}>{CLASS_APPLY_DENY}</div>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	padding: 10px 0;

	h5 {
		font-size: var(--teacher-h5);
	}

	h6 {
		font-size: var(--teacher-h6);
	}

	> div {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
`

const numberCSS = css`
	width: 20px;
	height: 20px;
	border-radius: 100%;
	background-color: var(--teacher-main-color);
	font-size: var(--teacher-h6);
	color: var(--common-back-color-2);
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 5px;
`

const nameCSS = css`
	width: 65px;
`

const buttonWrapperCSS = css`
	gap: 10px;
	margin-right: 3px;

	> div {
		transition: all 0.2s;

		:hover {
			transform: scale(1.3);
		}
	}
`

export default ClassJobSearchListApplyListItem
