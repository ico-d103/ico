import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import { css } from "@emotion/react"
import { CLASS_SEARCH } from "@/components/student/Class/ClassIcons"
import ClassStudentsListItem from "@/components/student/Class/Students/ClassStudentsListItem"
import { ClassTabMenus } from "@/components/student/Class/ClassTabMenus"
import TabMenu from "@/components/student/layout/TabMenu/TabMenu"

function students() {
	const mockList = [
		{ id: 0, number: 1, name: "강교철", job: "한국 전력", grade: 3 },
		{ id: 1, number: 2, name: "김동주", job: "한국 전력", grade: 2 },
		{ id: 2, number: 3, name: "변윤경", job: "한국 전력", grade: 6 },
		{ id: 3, number: 4, name: "사공지은", job: "한국 전력", grade: 3 },
		{ id: 4, number: 5, name: "서재건", job: "한국 전력", grade: 1 },
		{ id: 5, number: 6, name: "오민준", job: "한국 전력", grade: 7 },
	]

	return (
		<>
			<PageHeader title={"반 친구들"} addComp={<TabMenu menus={ClassTabMenus()} selected={0} />} />
			<div css={wrapperCSS}>
				<div css={contentCSS}>
					<div css={searchWrapperCSS}>
						<div>{CLASS_SEARCH}</div>
						<input placeholder="친구 이름을 검색해봐요" spellCheck="false" />
					</div>
					<div css={contentWrapperCSS}>
						<span>전체 {mockList.length}</span>
						{mockList.map((mock) => (
							<ClassStudentsListItem key={mock.id} mock={mock} />
						))}
					</div>
				</div>
			</div>
		</>
	)
}

const wrapperCSS = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const contentCSS = css`
	width: 95%;
`

const searchWrapperCSS = css`
	width: 100%;
	height: 44px;
	background-color: var(--student-wrapper-color);
	border-radius: 10px;
	margin-bottom: 20px;

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

	> span {
		font-size: var(--student-h3);
		color: var(--teacher-gray-color);
	}
`

export default students
