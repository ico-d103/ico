import { css } from "@emotion/react"
import { jobListType } from "@/types/teacher/apiReturnTypes"
import LoadImage from "@/components/common/LoadImage/LoadImage"

type ClassJobSearchListItemFrontPropsType = {
	job: jobListType
}

function ClassJobSearchListItemFront({ job }: ClassJobSearchListItemFrontPropsType) {
	return (
		<>
			<div css={imageWrapperCSS(job.color)}>
				<LoadImage wrapperCss={imgCSS} src={job.image} alt={"job_image"} />
				<span>
					{job.count}/{job.total}
				</span>
			</div>
			<div css={contentWrapperCSS}>
				<div css={firstContentCSS}>
					<h3>{job.title}</h3>
				</div>
				<div css={divideLineCSS}></div>
				<div css={secondContentCSS}>
					<h5>{job.creditRating}등급 이상</h5>
					<h5>
						월급 약 {job.salary} {localStorage.getItem("currency")}
					</h5>
				</div>
			</div>
		</>
	)
}

const imageWrapperCSS = (color: string) => {
	return css`
		height: 240px;
		background-color: ${color};
		position: relative;
		overflow: hidden;
		user-select: none;

		> span {
			position: absolute;
			bottom: 10px;
			right: 10px;
			z-index: 10;

			font-size: 4.5rem;
			font-weight: bold;
			color: rgba(255, 255, 255, 0.7);
		}
	`
}

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

	h3 {
		font-size: var(--teacher-h3);
	}

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

	> h3 {
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
