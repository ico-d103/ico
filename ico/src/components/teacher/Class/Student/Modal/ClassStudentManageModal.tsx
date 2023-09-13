import { useState } from "react"
import { css } from "@emotion/react"
import { useAtom } from "jotai"
import { checkedStudent } from "@/store/store"
import ClassStudentDetailMoney from "../Detail/ClassStudentDetailMoney"
import ClassStudentManageGrade from "./ClassStudentManageGrade"
import ClassStudentManageLicense from "./ClassStudentManageLicense"
import { useQuery } from "@tanstack/react-query"
import { getLicenseType } from "@/types/teacher/apiReturnTypes"
import { getLicenseAPI } from "@/api/teacher/gov/getLicenseAPI"

function ClassStudentManageModal() {
	const [openMoreMenu, setOpenMoreMenu] = useState<boolean>(false)
	const [checkedStudentAtom, setCheckedStudentAtom] = useAtom(checkedStudent)
	const { data } = useQuery<getLicenseType[]>(["teacher", "studentsLicense"], getLicenseAPI)

	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<span>
					{checkedStudentAtom.length <= 12
						? checkedStudentAtom.map((obj) => Object.values(obj)[0]).join(", ")
						: checkedStudentAtom
								.map((obj) => Object.values(obj)[0])
								.slice(0, 12)
								.join(", ")}{" "}
					{checkedStudentAtom.length === 1 ? "학생" : "학생들 "}
					{checkedStudentAtom.length > 12 && `외 ${checkedStudentAtom.length - 12}명`}에 대해
				</span>
				<button onClick={() => setCheckedStudentAtom([])}>닫기</button>
			</div>
			<div css={contentCSS}>
				<div css={contentTopCSS}>
					<ClassStudentDetailMoney
						studentId={checkedStudentAtom.map((item) => parseInt(Object.keys(item)[0]))}
						manageAll={true}
					/>
					<div css={divideCSS}></div>
					<ClassStudentManageGrade />
				</div>
				<button onClick={() => setOpenMoreMenu(!openMoreMenu)}>
					{openMoreMenu ? "자격증 관리 닫기" : "자격증 관리 열기"}
				</button>
				{openMoreMenu && data && <ClassStudentManageLicense license={data} />}
			</div>
		</div>
	)
}

const wrapperCSS = css`
	width: 55%;
	position: fixed;
	margin: 0 auto;
	top: 50px;
	left: 320px;
	right: 0;
	padding: 30px;
	border-radius: 10px;
	background-color: var(--common-back-color-2);
	box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
	z-index: 999999999;
`

const headerCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: 10px;

	> span {
		font-size: var(--teacher-h5);
		color: var(--teacher-gray-color);
	}

	> button {
		background: none;
		font-size: var(--teacher-h5);
		min-width: 40px;
		transition: all 0.2s;

		:hover {
			color: var(--teacher-gray-color);
		}
	}
`

const contentCSS = css`
	display: flex;
	flex-direction: column;

	> button {
		background: none;
		margin-top: 5px;
		font-size: var(--teacher-h5);
		transition: all 0.1s;

		:hover {
			color: var(--teacher-gray-color);
		}
	}
`

const contentTopCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 20px 0;
`

const divideCSS = css`
	height: 30px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	margin: 0 20px;
`

export default ClassStudentManageModal
