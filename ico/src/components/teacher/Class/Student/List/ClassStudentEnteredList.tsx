import { css } from "@emotion/react"
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
import CollapseMenuStudentDetail from "@/components/teacher/common/CollapseMenu/CollapseMenuStudentDetail"
import ClassStudentDetail from "../Detail/ClassStudentDetail"
import { useAtom, useAtomValue } from "jotai"
import { checkedStudent, selectedStudent } from "@/store/store"
import ClassStudentDetailHead from "../Detail/ClassStudentDetailHead"
import CheckBox from "@/components/teacher/common/CheckBox/CheckBox"

function StudentEnteredList() {
	const noti = useNotification()
	const { data } = useQuery<getStudentListType[]>(["studentList", "entered"], getStudentListAPI)
	const [openJobResetModal, closeJobResetModal, jobResetModalState] = useCompHandler()
	const queryClient = useQueryClient()
	const resetStudentsJobMutation = useMutation((body: number[]) => putResetStudentsJobAPI({ body }))
	const selectedStudentAtom = useAtomValue(selectedStudent)
	const [checkedStudentAtom, setCheckedStudentAtom] = useAtom(checkedStudent)

	const resetStudentsJob = () => {
		const keys = checkedStudentAtom.map((item) => parseInt(Object.keys(item)[0]))

		resetStudentsJobMutation.mutate(keys, {
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

		if (type === "reset") openJobResetModal()
		else if (type === "deport") {
			// openDeportStudentModal()
		}
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
			<Modal
				compState={jobResetModalState}
				closeComp={closeJobResetModal}
				transition={"scale"}
				content={
					<ModalAlert
						title={"선택된 학생들의 직업을 초기화합니다."}
						titleSize={"var(--teacher-h2)"}
						proceed={resetStudentsJob}
						width={"480px"}
						content={[
							"선택된 학생들이 올바른지 다시 확인해 주세요.",
							"선택된 학생들은 새로 직업을 구해야 합니다.",
							"월급 날에 해지일까지 일한 날짜만큼 보수를 받습니다.",
						]}
					/>
				}
			/>
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
