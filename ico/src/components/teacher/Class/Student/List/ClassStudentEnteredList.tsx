import { css } from "@emotion/react"
import StudentEnteredListItem from "./ClassStudentEnteredListItem"
import KebabMenu from "@/components/teacher/common/KebabMenu/KebabMenu"
import { getStudentListAPI } from "@/api/teacher/class/getStudentListAPI"
import { getStudentListType } from "@/types/teacher/apiReturnTypes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { putResetStudentsJobAPI } from "@/api/teacher/class/putResetStudentsJobAPI"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import ModalAlert from "@/components/common/Modal/ModalAlert"
import useCompHandler from "@/hooks/useCompHandler"
import Modal from "@/components/common/Modal/Modal"
import { checkedStudent } from "@/store/store"
import { useAtomValue } from "jotai"
import { useEffect } from "react"

function StudentEnteredList() {
	const noti = useNotification()
	const { data } = useQuery<getStudentListType[]>(["studentList", "entered"], getStudentListAPI)
	const [openJobResetModal, closeJobResetModal, jobResetModalState] = useCompHandler()
	const [openPasswordResetModal, closePasswordResetModal, passwordResetModalState] = useCompHandler()
	const checkedStudentAtom = useAtomValue(checkedStudent)

	useEffect(() => {
		console.log(checkedStudentAtom)
	}, [checkedStudentAtom])

	const queryClient = useQueryClient()
	const resetStudentsJobMutation = useMutation((a: number) => putResetStudentsJobAPI())

	const resetStudentsJob = () => {
		resetStudentsJobMutation.mutate(0, {
			onSuccess: () => {
				noti({
					content: <NotiTemplate type={"ok"} content={"직업을 초기화했습니다."} />,
					duration: 3000,
				})

				return queryClient.invalidateQueries(["studentList", "entered"])
			},
			onError: () => {
				noti({
					content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
					duration: 3000,
				})
			},
		})
	}

	const dropdownList = [
		{
			name: "resetJob",
			content: null,
			label: "직업 초기화",
			function: openJobResetModal,
		},
		{
			name: "resetPW",
			content: null,
			label: "비번 초기화",
			function: openPasswordResetModal,
		},
		{
			name: "resetAccount",
			content: null,
			label: "계좌 정지",
			function: () => {}, // 체크박스로 선택된 학생들만 계좌 정지
		},
	]

	return (
		<div css={wrapperCSS}>
			<Modal
				compState={jobResetModalState}
				closeComp={closeJobResetModal}
				transition={"scale"}
				content={
					<ModalAlert
						title={"모든 학생들의 직업을 초기화합니다."}
						titleSize={"var(--teacher-h2)"}
						proceed={resetStudentsJob}
						width={"480px"}
						content={[
							"모든 학생들의 직업이 초기화됩니다!",
							"더이상 학생들이 직업 활동을 할 수 없습니다!",
							"월급 날에 해지일까지 일한 날짜만큼 보수를 받습니다.",
						]}
					/>
				}
			/>
			<Modal
				compState={passwordResetModalState}
				closeComp={closePasswordResetModal}
				transition={"scale"}
				content={
					<ModalAlert
						title={"모든 학생들의 비밀번호를 초기화합니다."}
						titleSize={"var(--teacher-h2)"}
						proceed={resetStudentsJob}
						width={"480px"}
						content={["모든 학생들의 비밀번호가 초기화됩니다!"]}
					/>
				}
			/>
			<div css={contentTitleCSS}>
				<div css={titleCSS}>
					학생들 <small>({data && data.length > 0 ? data.length : 0})</small>
				</div>
				<KebabMenu dropdownList={dropdownList} />
			</div>
			<div css={contentCSS}>
				{data?.map((student, idx) => (
					<StudentEnteredListItem key={student.id} student={student} idx={idx} />
				))}
			</div>
		</div>
	)
}

export async function getServerSideProps() {
	return {
		props: {},
	}
}

const wrapperCSS = css`
	flex: 1;
`

const contentTitleCSS = css`
	display: flex;
	flex-direction: row;
	/* align-items: center; */
	justify-content: space-between;
`

const titleCSS = css`
	font-size: var(--teacher-h3);
	font-weight: bold;
	color: var(--teacher-main-color);
	padding: 10px;
	border-bottom: 2px solid #064f32;
	display: inline-block;
	margin-bottom: 20px;

	> small {
		font-size: var(--teacher-h4);
	}
`

const contentCSS = css`
	display: flex;
	flex-direction: column;
`

export default StudentEnteredList
