import { css } from "@emotion/react"
import ClassJobSearchListApplyListItem from "./ClassJobSearchListApplyListItem"
import { jobListType } from "@/types/teacher/apiReturnTypes"
import { useQuery } from "@tanstack/react-query"
import { getJobApplierAPI } from "@/api/teacher/class/getJobApplierAPI"

type ClassJobSearchListItemBackPropsType = {
	job: jobListType
}

function ClassJobSearchListItemBack({ job }: ClassJobSearchListItemBackPropsType) {
	const mockApplyList = [
		{ id: 0, number: 1, name: "강교철", grade: 1 },
		{ id: 1, number: 2, name: "김동주", grade: 2 },
		{ id: 2, number: 3, name: "변윤경", grade: 3 },
		{ id: 3, number: 4, name: "사공지은", grade: 4 },
		{ id: 4, number: 5, name: "서재건", grade: 5 },
		{ id: 5, number: 6, name: "오민준", grade: 6 },
		{ id: 6, number: 7, name: "사공지은", grade: 4 },
		{ id: 7, number: 8, name: "서재건", grade: 5 },
		{ id: 8, number: 9, name: "오민준", grade: 6 },
	]

	// const { data } = useQuery<return 타입>(["jobApplier"], ({ id: number }) => getJobApplierAPI(id))

	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<b>{job.title}</b> 신청자 목록
			</div>
			<div css={listWrapperCSS}>
				{mockApplyList.map((mock) => (
					<ClassJobSearchListApplyListItem key={mock.id} mockList={mock} />
				))}
			</div>
		</div>
	)
}

const wrapperCSS = css`
	padding: 25px 20px;
`

const headerCSS = css`
	font-size: var(--teacher-h4);

	> b {
		font-weight: bold;
	}
`

const listWrapperCSS = css`
	width: 100%;
	margin-top: 10px;
	overflow: scroll;
`

export default ClassJobSearchListItemBack
