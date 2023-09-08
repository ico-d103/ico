import { deleteResumeApplyAPI } from "@/api/student/class/deleteResumeApplyAPI"
import { postResumeAPI } from "@/api/student/class/postResumeAPI"
import Button from "@/components/common/Button/Button"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import useGetNation from "@/hooks/useGetNation"
import useNotification from "@/hooks/useNotification"
import { jobListType } from "@/types/teacher/apiReturnTypes"
import { appendEulReul } from "@/util/isEndWithConsonant"
import { css } from "@emotion/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type ClassJobSearchModalPropsType = {
	job: jobListType
	closeComp: () => void
	isAlreadyApplied: string|null
}

function ClassJobSearchModal({ job, closeComp, isAlreadyApplied }: ClassJobSearchModalPropsType) {
	const noti = useNotification()
	const [nation] = useGetNation()
	const deleteResumeMutation = useMutation((params: {id: number, resumeId: string}) => deleteResumeApplyAPI( params ))

	const applyJobHandler = () => {
		postResumeAPI({ id: job.id })
			.then(() => {
				noti({
					content: <NotiTemplate type={"ok"} content={`${appendEulReul(job.title)} 신청했어요!`} />,
					duration: 3000,
				})

				closeComp()
			})
			.catch((error) => {
				noti({
					content: <NotiTemplate type={"alert"} content={error.response.data.message} />,
					duration: 3000,
				})
			})
	}

	const deleteApplyJobHandler= () => {
		if (isAlreadyApplied) {
			deleteResumeMutation.mutate(
				{id: job.id, resumeId: isAlreadyApplied}, {
					onSuccess: ()=> {
						noti({
							content: (
								<NotiTemplate type={"ok"} content={'직업 신청을 취소했어요!'} />
							),
							duration: 3000,
						})
	
						closeComp()
					},
					onError: () => {
						noti({
							content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
							duration: 3000,
						})
					}
				}
			)
			
		}
	}

	return (
		<div css={wrapperCSS}>
			<span>
				월급 {job.wage} {nation.currency}
			</span>
			<textarea readOnly value={job.detail} />
			<div css={buttonWrapperCSS}>
				<Button
					text={"취소"}
					fontSize={"var(--student-h3)"}
					width={"130px"}
					theme={"mobileCancel"}
					onClick={closeComp}
				/>
				{isAlreadyApplied ? (
					<Button
						text={"신청 취소"}
						fontSize={"var(--student-h3)"}
						width={"130px"}
						theme={"mobileSoft2"}
						onClick={deleteApplyJobHandler}
					/>
				) : (
					<Button
						text={"신청하기"}
						fontSize={"var(--student-h3)"}
						width={"130px"}
						theme={"mobileSoft2"}
						onClick={applyJobHandler}
					/>
				)}
			</div>
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;

	> textarea {
		width: 286px;
		height: 100px;
		background: rgba(0, 0, 0, 0.05);
		border-radius: 10px;
		resize: none;
		outline: none;
		border: none;
		padding: 15px;
	}
`

const buttonWrapperCSS = css`
	display: flex;
	flex-direction: row;
	gap: 15px;
`

export default ClassJobSearchModal
