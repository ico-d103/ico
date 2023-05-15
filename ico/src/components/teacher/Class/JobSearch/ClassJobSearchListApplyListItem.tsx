import { css } from "@emotion/react"
import { CLASS_APPLY_APPROVE, CLASS_APPLY_DENY } from "../ClassIcons"
import { postJobAcceptAPI } from "@/api/teacher/class/postJobAcceptAPI"
import { deleteJobDenyAPI } from "@/api/teacher/class/deleteJobDenyAPI"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getJobApplierType } from "@/types/teacher/apiReturnTypes"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

type ClassJobSearchListApplyListItemPropsType = {
	student: getJobApplierType
	jobId: number
}

function ClassJobSearchListApplyListItem({ student, jobId }: ClassJobSearchListApplyListItemPropsType) {
	const noti = useNotification()
	const queryClient = useQueryClient()
	const acceptMutation = useMutation((id: string) => postJobAcceptAPI({ id }))
	const denyMutation = useMutation((id: string) => deleteJobDenyAPI({ id }))

	const approveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
		e.stopPropagation() // 이벤트 버블링 방지

		acceptMutation.mutate(student.resumeId, {
			onSuccess: () => {
				noti({
					content: <NotiTemplate type={"ok"} content={`${student.name}의 신청을 승인했습니다.`} />,
					duration: 3000,
				})

				queryClient.invalidateQueries(["jobList"])
				queryClient.invalidateQueries(["jobApplier", jobId])
			},
			onError: () => {
				noti({
					content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
					duration: 3000,
				})
			},
		})
	}

	const denyHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
		e.stopPropagation()

		denyMutation.mutate(student.resumeId, {
			onSuccess: () => {
				noti({
					content: <NotiTemplate type={"ok"} content={`${student.name}의 신청을 반려했습니다.`} />,
					duration: 3000,
				})

				queryClient.invalidateQueries(["jobList"])
				queryClient.invalidateQueries(["jobApplier", jobId])
			},
			onError: () => {
				noti({
					content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
					duration: 3000,
				})
			},
		})
	}

	return (
		<div css={wrapperCSS}>
			<div>
				<div css={numberCSS}>{student.number}</div>
				<h4 css={nameCSS}>{student.name}</h4>
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

	h4 {
		font-size: var(--teacher-h4);
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
	width: 25px;
	height: 25px;
	border-radius: 100%;
	background-color: var(--teacher-main-color);
	font-size: var(--teacher-h5);
	color: var(--common-back-color-2);
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 8px;
`

const nameCSS = css`
	width: 65px;
`

const buttonWrapperCSS = css`
	gap: 10px;
	margin-right: 4px;

	> div {
		transition: all 0.2s;

		:hover {
			transform: scale(1.3);
		}
	}
`

export default ClassJobSearchListApplyListItem
