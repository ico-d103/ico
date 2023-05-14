import { css } from "@emotion/react"
import StudentEnteredListItem from "./ClassStudentEnteredListItem"
import KebabMenu from "@/components/teacher/common/KebabMenu/KebabMenu"
import { getStudentListAPI } from "@/api/teacher/class/getStudentListAPI"
import { getStudentListType } from "@/types/teacher/apiReturnTypes"
import { useQuery } from "@tanstack/react-query"
import { putResetStudentsJobAPI } from "@/api/teacher/class/putResetStudentsJobAPI"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

function StudentEnteredList() {
	const noti = useNotification()
	const { data } = useQuery<getStudentListType[]>(["studentList", "entered"], getStudentListAPI)

	const resetStudentsJob = () => {
		putResetStudentsJobAPI()
			.then(() => {
				noti({
					content: <NotiTemplate type={"ok"} content={"직업을 초기화했습니다."} />,
					duration: 3000,
				})
			})
			.catch(() =>
				noti({
					content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
					duration: 3000,
				}),
			)
	}

	const dropdownList = [
		{
			name: "reset",
			content: null,
			label: "직업 초기화",
			function: resetStudentsJob,
		},
	]

	return (
		<div css={wrapperCSS}>
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
