import { css } from "@emotion/react"
import KebabMenu from "@/components/teacher/common/KebabMenu/KebabMenu"
import { putReleaseAccountAPI } from "@/api/teacher/class/putReleaseAccountAPI"
import { useAtomValue } from "jotai"
import { selectedStudent } from "@/store/store"
import { putSuspendAccountAPI } from "@/api/teacher/class/putSuspendAccountAPI"
import { putResetStudentJobAPI } from "@/api/teacher/class/putResetStudentJobAPI"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

type ClassStudentDetailHeadPropsType = {
	studentName: string
	frozen: boolean
}

function ClassStudentDetailHead({ studentName, frozen }: ClassStudentDetailHeadPropsType) {
	const noti = useNotification()
	const selectedStudentAtom = useAtomValue(selectedStudent)

	const resetStudentJob = () => {
		putResetStudentJobAPI({ studentId: selectedStudentAtom })
			.then(() => {
				noti({
					content: <NotiTemplate type={"ok"} content={`${studentName}의 직업을 초기화했습니다.`} />,
					duration: 3000,
				})
			})
			.catch(() => {
				noti({
					content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
					duration: 3000,
				})
			})
	}

	const preventStudentAccount = () => {
		if (frozen) {
			putReleaseAccountAPI({ studentId: selectedStudentAtom })
				.then(() => {
					noti({
						content: <NotiTemplate type={"ok"} content={`${studentName}의 계좌 정지를 해제하였습니다.`} />,
						duration: 3000,
					})
				})
				.catch((error) => {
					noti({
						content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
						duration: 3000,
					})
				})
		} else {
			putSuspendAccountAPI({ studentId: selectedStudentAtom })
				.then(() => {
					noti({
						content: <NotiTemplate type={"ok"} content={`${studentName}의 계좌를 정지하였습니다.`} />,
						duration: 3000,
					})
				})
				.catch((error) => {
					noti({
						content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
						duration: 3000,
					})
				})
		}
	}

	const dropdownList = [
		{
			name: "reset",
			content: null,
			label: "직업 초기화",
			function: resetStudentJob,
		},
		{
			name: "prevent",
			content: null,
			label: frozen ? "계좌 정지 해제" : "계좌 정지",
			function: preventStudentAccount,
		},
	]

	return (
		<div css={studentWrapperCSS}>
			<div css={studentNameCSS}>{studentName}</div>
			<KebabMenu dropdownList={dropdownList} />
		</div>
	)
}

const studentWrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-top: 20px;
`

const studentNameCSS = css`
	font-size: var(--teacher-h3);
	font-weight: bold;
	color: var(--teacher-main-color);
	padding: 10px;
	border-bottom: 2px solid #064f32;
	display: inline-block;
`

export default ClassStudentDetailHead
