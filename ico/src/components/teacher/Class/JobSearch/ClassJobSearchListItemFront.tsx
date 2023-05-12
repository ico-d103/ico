import { css } from "@emotion/react"
import { jobListType } from "@/types/teacher/apiReturnTypes"
import LoadImage from "@/components/common/LoadImage/LoadImage"

type ClassJobSearchListItemFrontPropsType = {
	job: jobListType
}

function ClassJobSearchListItemFront({ job }: ClassJobSearchListItemFrontPropsType) {
	return (
		<>
			<div css={imageWrapperCSS}>
				<LoadImage wrapperCss={imgCSS} src={job.image} alt={"job_image"} />
				<span>{job.total}</span>
			</div>
			<div css={contentWrapperCSS}>
				<div css={firstContentCSS}>
					<h4>{job.title}</h4>
					{job.recruitStudent !== 0 ? <h5>{job.recruitStudent}명 모집중</h5> : <h5>{job.studentNames[0]} 외</h5>}
				</div>
				<div css={divideLineCSS}></div>
				<div css={secondContentCSS}>
					<h5>{job.creditRating}등급 이상</h5>
					<h5>
						약 {job.salary} {localStorage.getItem("currency")}
					</h5>
				</div>
			</div>
		</>
	)
}

const imageWrapperCSS = css`
	height: 240px;
	background-color: #007bc0;
	position: relative;
	overflow: hidden;

	> span {
		position: absolute;
		bottom: 1px;
		right: 10px;

		font-size: 130px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.7);
	}
`

const imgCSS = css`
	position: absolute;
	top: 10px;
	left: 10px;
	z-index: 1;
	width: 150px;
	height: 250px;
	filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2));
`

const contentWrapperCSS = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	h4 {
		font-size: var(--teacher-h4);
	}

	h5 {
		font-size: var(--teacher-h5);
	}
`

const divideLineCSS = css`
	border: 1px solid rgba(0, 0, 0, 0.08);
`

const firstContentCSS = css`
	padding: 15px 10px 10px 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	> h4 {
		font-weight: bold;
	}
`

const secondContentCSS = css`
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 10px;
`

export default ClassJobSearchListItemFront
