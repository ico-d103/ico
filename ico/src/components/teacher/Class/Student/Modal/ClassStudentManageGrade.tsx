import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import { postCreditScoreAllAPI } from "@/api/teacher/class/postCreditScoreAllAPI"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import { useAtomValue } from "jotai"
import { checkedStudent } from "@/store/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"

function ClassStudentManageGrade() {
	const noti = useNotification()
	const queryClient = useQueryClient()
	const checkedStudentAtom = useAtomValue(checkedStudent)
	const postCreditScoreAllMutation = useMutation((args: { body: { studentIds: number[]; type: boolean } }) =>
		postCreditScoreAllAPI(args),
	)

	const postCreditScoreAll = (type: boolean) => {
		const keys = checkedStudentAtom.map((item) => parseInt(Object.keys(item)[0]))
		const args = { body: { studentIds: keys, type: type } }

		postCreditScoreAllMutation.mutate(args, {
			onSuccess: () => {
				noti({
					content: <NotiTemplate type={"ok"} content={"성공적으로 수정되었습니다."} />,
					duration: 2000,
					id: "credit",
				})

				queryClient.invalidateQueries(["studentList", "entered"])
				keys.forEach((id) => {
					queryClient.invalidateQueries(["enteredStudentDetail", id])
				})
			},
			onError: () => {
				noti({
					content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
					duration: 2000,
				})
			},
		})
	}

	return (
		<>
			<span css={spanCSS}>신용 점수를</span>
			<Button
				text={"올릴게요"}
				fontSize={`var(--teacher-h6)`}
				width={"80px"}
				height={"30px"}
				theme={"managePlus"}
				margin={"0 10px 0 0"}
				onClick={(e) => {
					e.stopPropagation()
					postCreditScoreAll(true)
				}}
			/>
			<Button
				text={"내릴게요"}
				fontSize={`var(--teacher-h6)`}
				width={"80px"}
				height={"30px"}
				theme={"manageMinus"}
				onClick={(e) => {
					e.stopPropagation()
					postCreditScoreAll(false)
				}}
			/>
		</>
	)
}

const spanCSS = css`
	font-size: var(--teacher-h5);
	color: var(--teacher-gray-color);
	margin-right: 15px;
`

export default ClassStudentManageGrade
