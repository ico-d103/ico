import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import { css } from "@emotion/react"
import { CLASS_SEARCH } from "@/components/student/Class/ClassIcons"
import ClassStudentsListItem from "@/components/student/Class/Students/ClassStudentsListItem"
import { ClassTabMenus } from "@/components/student/Class/ClassTabMenus"
import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { getStudentListAPI } from "@/api/student/class/getStudentListAPI"
import { useEffect, useState } from "react"
import { getStudentListType } from "@/types/student/apiReturnTypes"

function students() {
	const [studentList, setStudentList] = useState<getStudentListType[]>([])
	const [searchValue, setSearchValue] = useState<string>("")

	const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(() => e.target.value)
	}

	useEffect(() => {
		getStudentListAPI().then((res) => {
			setStudentList(res)
		})
	}, [])

	return (
		<div css={mainWrapperCSS}>
			<PageHeader title={"우리반"} addComp={<TabMenu menus={ClassTabMenus()} selected={0} />} />
			<div css={wrapperCSS}>
				<div css={contentCSS}>
					<div css={searchWrapperCSS}>
						<div>{CLASS_SEARCH}</div>
						<input
							placeholder="친구 이름을 검색해봐요"
							spellCheck="false"
							value={searchValue}
							onChange={searchInputHandler}
						/>
					</div>
					<div key={searchValue} css={contentWrapperCSS}>
						<span>전체 {studentList.length} 명</span>
						{studentList.map((student) => {
							if (student.name.includes(searchValue)) {
								return <ClassStudentsListItem key={student.number} student={student} />
							}
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

const mainWrapperCSS = css`
	padding-bottom: 16px;
	flex: 1;
	display: flex;
	flex-direction: column;
`

const wrapperCSS = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
`

const contentCSS = css`
	width: 95%;
	flex: 1;
	display: flex;
	flex-direction: column;
`

const searchWrapperCSS = css`
	width: 100%;
	height: 44px;
	background-color: var(--student-wrapper-color);
	border-radius: 10px;
	margin-bottom: 16px;
	height: 48px;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0 20px;
	gap: 10px;

	> input {
		width: 100%;
		
		border: none;
		outline: none;
		background: none;
		font-size: var(--student-h3);
	}
`

const contentWrapperCSS = css`
	width: 100%;
	background-color: var(--student-wrapper-color);
	padding: 30px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	flex: 1;

	> span {
		font-size: var(--student-h3);
		color: var(--teacher-gray-color);
	}
`

export default students
