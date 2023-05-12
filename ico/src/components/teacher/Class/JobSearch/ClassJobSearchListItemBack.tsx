import { css } from "@emotion/react"
import ClassJobSearchListApplyListItem from "./ClassJobSearchListApplyListItem"
import { getJobApplierType, jobListType } from "@/types/teacher/apiReturnTypes"
import { useQuery } from "@tanstack/react-query"
import { getJobApplierAPI } from "@/api/teacher/class/getJobApplierAPI"

type ClassJobSearchListItemBackPropsType = {
	job: jobListType
}

function ClassJobSearchListItemBack({ job }: ClassJobSearchListItemBackPropsType) {
	const { data } = useQuery<getJobApplierType[]>(["jobApplier"], () => getJobApplierAPI({ id: job.id }))

	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<b>{job.title}</b> 신청자 목록
			</div>
			{data?.length === 0 ? (
				<div css={noneWrapperCSS}>
					<span>신청자가 없습니다.</span>
				</div>
			) : (
				<div css={listWrapperCSS}>
					{data?.map((student) => (
						<ClassJobSearchListApplyListItem key={student.resumeId} student={student} />
					))}
				</div>
			)}
		</div>
	)
}

const wrapperCSS = css`
	padding: 25px 20px;
	position: relative;
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

const noneWrapperCSS = css`
	position: absolute;
	top: calc(300px / 2);
`

export default ClassJobSearchListItemBack
