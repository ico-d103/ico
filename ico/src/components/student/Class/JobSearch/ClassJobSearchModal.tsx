import { postResumeAPI } from "@/api/student/class/postResumeAPI"
import Button from "@/components/common/Button/Button"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import useGetNation from "@/hooks/useGetNation"
import useNotification from "@/hooks/useNotification"
import { getGovJobType } from "@/types/teacher/apiReturnTypes"
import { appendEulReul } from "@/util/isEndWithConsonant"
import { css } from "@emotion/react"

type ClassJobSearchModalPropsType = {
	job: getGovJobType
	closeComp: () => void
	isAlreadyApplied: boolean
}

function ClassJobSearchModal({ job, closeComp, isAlreadyApplied }: ClassJobSearchModalPropsType) {
	const noti = useNotification()
	const [nation] = useGetNation()

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

	return (
		<div css={wrapperCSS}>
			<span>
				월급 {(job.wage * 30).toLocaleString("ko-KR")} {nation.currency}
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
						onClick={() => alert("직업 신청 취소")}
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
