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
import { useEffect } from "react"

function StudentEnteredList() {
	const noti = useNotification()
	const { data } = useQuery<getStudentListType[]>(["studentList", "entered"], getStudentListAPI)
	const [openJobResetModal, closeJobResetModal, jobResetModalState] = useCompHandler()
	const queryClient = useQueryClient()
	const resetStudentsJobMutation = useMutation((a: number) => putResetStudentsJobAPI())
	const selectedStudentAtom = useAtomValue(selectedStudent)
	const [checkedStudentAtom, setCheckedStudentAtom] = useAtom(checkedStudent)

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

	return (
		<>
			<div css={wrapperCSS}>
				<div css={contentHeadCSS}>
					<div>
						<div css={titleCSS}>
							학생들 <small>({data && data.length > 0 ? data.length : 0})</small>
						</div>
						<div css={checkCSS}>
							<input type="checkbox" id="all-check" onChange={toggleStudentsAllCheck} />
							<label htmlFor="all-check">학생 전체 선택</label>
						</div>
					</div>
					<KebabMenu
						dropdownList={[
							{
								name: "resetJob",
								content: null,
								label: "직업 초기화",
								function: openJobResetModal,
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
