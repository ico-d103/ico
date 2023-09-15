import { getStudentListAPI } from "@/api/teacher/class/getStudentListAPI"
import Button from "@/components/common/Button/Button"
import { getStudentListType } from "@/types/teacher/apiReturnTypes"
import { useEffect, useState } from "react"
import { css } from "@emotion/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postCreditScoreAPI } from "@/api/teacher/class/postCreditScoreAPI"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

function PowerCreditModalContent() {
	const noti = useNotification()
	const queryClient = useQueryClient()
	const [selectedStudent, setSelectedStudent] = useState<number>(-1)
	const [studentList, setStudentList] = useState<getStudentListType[]>([])
	const postCreditScoreMutation = useMutation((args: { studentId: number; body: { type: boolean } }) =>
		postCreditScoreAPI(args),
	)

	const postCreditScore = (type: boolean) => {
		const args = { studentId: selectedStudent, body: { type: type } }

		postCreditScoreMutation.mutate(args, {
			onSuccess: () => {
				noti({
					content: <NotiTemplate type={"ok"} content={"성공적으로 수정되었습니다."} />,
					duration: 3000,
					id: "credit",
				})

				queryClient.invalidateQueries(["studentList", "entered"])
				queryClient.invalidateQueries(["enteredStudentDetail", selectedStudent])
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
		getStudentListAPI().then((res) => {
			setStudentList(res)
		})
	}, [])

	return (
		<div css={wrapperCSS} onClick={(e) => e.stopPropagation()}>
			<div css={selectWrapperCSS}>
				<select onChange={(e) => setSelectedStudent(Number(e.target.value))}>
					{studentList.map((student) => (
						<option key={student.number} value={student.id}>
							{student.name}
						</option>
					))}
				</select>
				<span>학생의 신용점수를</span>
			</div>
			<div css={buttonWrapperCSS}>
				<Button
					text={"내릴게요"}
					fontSize={"var(--teacher-h5)"}
					width={"110px"}
					theme={"manageMinus"}
					onClick={() => postCreditScore(false)}
				/>
				<Button
					text={"올릴게요"}
					fontSize={"var(--teacher-h5)"}
					width={"110px"}
					theme={"mobileSoft3"}
					onClick={() => postCreditScore(true)}
				/>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	margin: 30px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 40px;
`

const selectWrapperCSS = css`
	display: flex;
	flex-direction: row;
	gap: 10px;
	align-items: center;
	font-size: var(--teacher-h4);

	> select {
		outline: none;
		padding: 5px 10px;
		border-radius: 20px;
		font-size: var(--teacher-h5);
	}
`

const buttonWrapperCSS = css`
	display: flex;
	flex-direction: row;
	gap: 20px;
`

export default PowerCreditModalContent
