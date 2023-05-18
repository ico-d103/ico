import { css } from "@emotion/react"
import ClassJobSearchListItem from "./ClassJobSearchListItem"
import { jobListType } from "@/types/teacher/apiReturnTypes"

type ClassJobSearchListPropsType = {
	jobList: jobListType[]
}

function ClassJobSearchList({ jobList }: ClassJobSearchListPropsType) {
	return (
		<div css={wrapper}>
			{jobList.map((job) => (
				<ClassJobSearchListItem key={job.id} job={job} />
			))}
		</div>
	)
}

const wrapper = css`
	margin-top: 40px;
	display: grid;
	place-items: center;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	grid-column-gap: 20px;
	grid-row-gap: 30px;
`

export default ClassJobSearchList
