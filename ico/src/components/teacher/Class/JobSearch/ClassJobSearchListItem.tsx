import { useState } from "react"
import { css } from "@emotion/react"
import ClassJobSearchListItemFront from "./ClassJobSearchListItemFront"
import ClassJobSearchListItemBack from "./ClassJobSearchListItemBack"
import { jobListType } from "@/types/teacher/apiReturnTypes"

type ClassJobSearchListItemPropsType = {
	job: jobListType
}

function ClassJobSearchListItem({ job }: ClassJobSearchListItemPropsType) {
	const [isReverse, setIsReverse] = useState<boolean>(false)

	return (
		<div css={wrapperCSS} onClick={() => setIsReverse(!isReverse)}>
			{!isReverse ? <ClassJobSearchListItemFront job={job} /> : <ClassJobSearchListItemBack job={job} />}
		</div>
	)
}

const wrapperCSS = css`
	width: 250px;
	height: 350px;
	background: var(--common-back-color-2);
	border: 1px solid rgba(0, 0, 0, 0.1);
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	transition: all 0.2s;
	cursor: pointer;

	overflow: scroll;
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
	::-webkit-scrollbar {
		display: none;
	}

	:hover {
		transform: scale(1.1);
	}
`

export default ClassJobSearchListItem
