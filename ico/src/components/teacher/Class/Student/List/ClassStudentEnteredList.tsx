import { css } from "@emotion/react"
import KebabMenu from "@/components/teacher/common/KebabMenu/KebabMenu"
import { getStudentListAPI } from "@/api/teacher/class/getStudentListAPI"
import { getStudentListType } from "@/types/teacher/apiReturnTypes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { putResetStudentsJobAPI } from "@/api/teacher/class/putResetStudentsJobAPI"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import ModalAlert from "@/components/common/Modal/ModalAlert"
import CollapseMenuStudentDetail from "@/components/teacher/common/CollapseMenu/CollapseMenuStudentDetail"
import ClassStudentDetail from "../Detail/ClassStudentDetail"
import { useAtom, useAtomValue } from "jotai"
import { checkedStudent, selectedStudent } from "@/store/store"
import ClassStudentDetailHead from "../Detail/ClassStudentDetailHead"
import CheckBox from "@/components/teacher/common/CheckBox/CheckBox"
import useModal from "@/components/common/Modal/useModal"
import { putDeportStudentsAPI } from "@/api/teacher/class/putDeportStudentsAPI"
import { postStudentsSalaryAPI } from "@/api/teacher/class/postStudentsSalaryAPI"

function StudentEnteredList() {
	const noti = useNotification()
	const queryClient = useQueryClient()
	const resetJobModal = useModal()
	const deportStudentsModal = useModal()
	const payStudentsSalaryModal = useModal()

	const { data } = useQuery<getStudentListType[]>(["studentList", "entered"], getStudentListAPI)
	const deportStudentsMutation = useMutation((args: { body: { studentIds: number[] } }) => putDeportStudentsAPI(args))
	const resetStudentsJobMutation = useMutation((args: { body: { studentIds: number[] } }) =>
		putResetStudentsJobAPI(args),
	)
	const postStudentsSalaryMutation = useMutation((args: { body: { studentIds: number[] } }) =>
		postStudentsSalaryAPI(args),
	)

	const selectedStudentAtom = useAtomValue(selectedStudent)
	const [checkedStudentAtom, setCheckedStudentAtom] = useAtom(checkedStudent)

	const resetStudentsJobHandler = () => {
		const keys = checkedStudentAtom.map((item) => parseInt(Object.keys(item)[0]))
		const args = { body: { studentIds: keys } }

		resetStudentsJobMutation.mutate(args, {
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

	const toggleStudentsAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
		// 전체 선택
		if (e.target.checked) {
			const selectAll: { [key: number]: string }[] = []

			data?.forEach((student) => {
				selectAll.push({ [student.id]: student.name })
			})

			setCheckedStudentAtom(selectAll)
		}
		// 전체 선택 해제
		else {
			setCheckedStudentAtom([])
		}
	}

	const checkValidModalOpen = (type: string) => {
		if (!checkedStudentAtom.length) {
			noti({
				content: <NotiTemplate type={"alert"} content={`선택된 학생이 없습니다.`} />,
				duration: 2000,
			})

			return
		}

		if (type === "reset") resetJobModal.open()
		else if (type === "deport") deportStudentsModal.open()
		else if (type === "salary") payStudentsSalaryModal.open()
	}

	const deportStudentsHandler = () => {
		const keys = checkedStudentAtom.map((item) => parseInt(Object.keys(item)[0]))
		const args = { body: { studentIds: keys } }

		deportStudentsMutation.mutate(args, {
			onSuccess: () => {
				noti({
					content: <NotiTemplate type={"ok"} content={"선택된 학생(들)을 내보냈습니다."} />,
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

	const payStudentsSalaryHandler = () => {
		const keys = checkedStudentAtom.map((item) => parseInt(Object.keys(item)[0]))
		const args = { body: { studentIds: keys } }

		postStudentsSalaryMutation.mutate(args, {
			onSuccess: () => {
				noti({
					content: <NotiTemplate type={"ok"} content={"학생(들)에게 월급을 지급했습니다."} />,
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

	return (
		<>
			<div css={wrapperCSS}>
				<div css={contentHeadCSS}>
					<div>
						<div css={titleCSS}>
							학생들 <small>({data && data.length > 0 ? data.length : 0})</small>
						</div>
						<CheckBox
							customCss={css`
								margin-left: 15px;
							`}
							checked={
								checkedStudentAtom.length === 0 ? false : checkedStudentAtom.length === data?.length ? true : false
							}
							id="all-check"
							onChange={toggleStudentsAllCheck}
						>
							<label htmlFor="all-check">학생 전체 선택</label>
						</CheckBox>
					</div>
					<KebabMenu
						dropdownList={[
							{
								name: "payStudentsSalary",
								content: null,
								label: "월급 지급",
								function: () => checkValidModalOpen("salary"),
							},
							{
								name: "resetJob",
								content: null,
								label: "직업 초기화",
								function: () => checkValidModalOpen("reset"),
							},
							{
								name: "deportStudent",
								content: null,
								label: "학생 내보내기",
								function: () => checkValidModalOpen("deport"),
							},
						]}
					/>
				</div>
				<div css={contentCSS}>
					{data?.map((student) => (
						<CollapseMenuStudentDetail
							key={student.id}
							studentId={student.id}
							titleChildren={<ClassStudentDetailHead student={student} />}
							contentChildren={selectedStudentAtom === student.id ? <ClassStudentDetail /> : null}
						></CollapseMenuStudentDetail>
					))}
				</div>
			</div>
			{resetJobModal(
				<ModalAlert
					title={`학생 ${checkedStudentAtom.length}명의 직업을 초기화합니다.`}
					titleSize={"var(--teacher-h2)"}
					proceed={resetStudentsJobHandler}
					width={"480px"}
					content={[
						"선택된 학생(들)이 올바른지 다시 확인해 주세요.",
						"선택된 학생(들)은 새로 직업을 구해야 합니다.",
						"월급날에 해지일까지 일한일 수만큼 보수를 받습니다.",
					]}
				/>,
			)}
			{deportStudentsModal(
				<ModalAlert
					title={`학생 ${checkedStudentAtom.length}명을 반에서 내보냅니다.`}
					titleSize={"var(--teacher-h2)"}
					proceed={deportStudentsHandler}
					width={"480px"}
					content={["선택된 학생(들)이 올바른지 다시 확인해 주세요.", "선택된 학생(들)의 데이터가 없어집니다."]}
				/>,
			)}
			{payStudentsSalaryModal(
				<ModalAlert
					title={`학생 ${checkedStudentAtom.length}명에게 월급을 지급합니다.`}
					titleSize={"var(--teacher-h2)"}
					proceed={payStudentsSalaryHandler}
					width={"480px"}
					content={[
						"선택된 학생(들)이 올바른지 다시 확인해 주세요.",
						"무직인 학생에게는 돈이 지급되지 않습니다.",
						"직업이 있더라도 임금이 없는 경우에는 돈이 지급되지 않습니다.",
					]}
				/>,
			)}
		</>
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

const contentHeadCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	> div {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
	}
`

const titleCSS = css`
	font-size: var(--teacher-h3);
	font-weight: bold;
	color: var(--teacher-main-color);
	padding: 10px;
	border-bottom: 2px solid #064f32;
	display: inline-block;
	/* margin-bottom: 20px; */

	> small {
		font-size: var(--teacher-h4);
	}
`

const checkCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 15px;
	margin-left: 15px;

	> input {
		width: 23px;
		height: 23px;
		cursor: pointer;
		border-radius: 50%;
		border: 1px solid #999;
		appearance: none;
		transition: background 0.2s;

		:checked {
			background: var(--teacher-main-color);
			border: none;
		}
	}

	> label {
		font-size: var(--teacher-h5);
		color: var(--teacher-gray-color);
		cursor: pointer;
	}
`

const contentCSS = css`
	display: flex;
	flex-direction: column;
`

export default StudentEnteredList
