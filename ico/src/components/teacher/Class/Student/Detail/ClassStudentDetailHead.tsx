import { css } from "@emotion/react"
import KebabMenu from "@/components/teacher/common/KebabMenu/KebabMenu"
import { putReleaseAccountAPI } from "@/api/teacher/class/putReleaseAccountAPI"
import { useAtomValue } from "jotai"
import { selectedStudent } from "@/store/store"
import { putSuspendAccountAPI } from "@/api/teacher/class/putSuspendAccountAPI"

type ClassStudentDetailHeadPropsType = {
	studentName: string
	frozen: boolean
}

function ClassStudentDetailHead({ studentName, frozen }: ClassStudentDetailHeadPropsType) {
	const selectedStudentAtom = useAtomValue(selectedStudent)

	const resetStudentJob = () => {
		// 직업 초기화
	}

	const preventStudentAccount = () => {
		if (frozen) {
			putReleaseAccountAPI({ studentId: selectedStudentAtom })
				.then((res) => {
					console.log("계좌 정지 해제")
				})
				.catch((error) => {
					alert(error.response.message)
				})
		} else {
			putSuspendAccountAPI({ studentId: selectedStudentAtom })
				.then((res) => {
					console.log("계좌 정지")
				})
				.catch((error) => {
					alert(error.response.message)
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
