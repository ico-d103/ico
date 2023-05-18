import { css } from "@emotion/react"
import LoadImage from "@/components/common/LoadImage/LoadImage"
import Modal from "@/components/common/Modal/Modal"
import useCompHandler from "@/hooks/useCompHandler"
import ModalContent from "@/components/common/Modal/ModalContent"
import { GOV_JOB } from "../GovIcons"
import GovJobCardModalContent from "./GovJobCardModalContent"
import useGetNation from "@/hooks/useGetNation"
import { getGovJobType } from "@/types/teacher/apiReturnTypes"
import { appendEiGa } from "@/util/isEndWithConsonant"

type GovJobCardPropsType = {
	job: getGovJobType
}

function GovJobCard({ job }: GovJobCardPropsType) {
	const [openComp, closeComp, compState] = useCompHandler()
	const [nation] = useGetNation()

	return (
		<>
			<div css={cardWrapperCSS(job.color)} onClick={openComp}>
				<div css={imageWrapperCSS}>
					<LoadImage wrapperCss={imgCSS} src={job.image} alt={"job_image"} />
				</div>
				<div css={contentWrapperCSS}>
					<h3>{job.title}</h3>
					<div css={divideCSS}></div>
					<div css={conditionWrapperCSS}>
						<h4>신용 등급</h4>
						<h3>{job.creditRating}등급 이상</h3>
					</div>
					<div css={conditionWrapperCSS}>
						<h4>월급</h4>
						<h3>
							{(job.wage * 30).toLocaleString('ko-KR')} {nation.currency}
						</h3>
					</div>
				</div>
			</div>
			<Modal
				compState={compState}
				closeComp={closeComp}
				transition={"scale"}
				content={
					<ModalContent
						width={"320px"}
						icon={GOV_JOB}
						title={`${appendEiGa(job.title)} 하는일`}
						titleSize={"var(--student-h2)"}
						content={<GovJobCardModalContent content={job.detail} closeComp={closeComp} />}
						forChild={true}
					/>
				}
			/>
		</>
	)
}

const cardWrapperCSS = (color: string) => {
	return css`
		width: 270px;
		min-width: 270px;
		height: 160px;
		border-radius: 10px;
		background: ${color};
		position: relative;
		transition: all 0.2s;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	`
}

const imageWrapperCSS = css`
	position: absolute;
	top: 5px;
	left: 20px;
	width: 100px;
	height: 180px;
`

const imgCSS = css`
	width: 100%;
	height: 100%;

	filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2));
`

const contentWrapperCSS = css`
	position: absolute;
	width: 130px;
	height: 120px;
	top: 20px;
	left: 120px;
	margin-top: 8px;
	display: flex;
	flex-direction: column;
	/* justify-content: space-around; */

	> h3 {
		color: var(--common-back-color-2);
		font-size: var(--student-h2);
	}
`

const divideCSS = css`
	margin: 10px 0;
	border: 1px solid rgba(255, 255, 255, 0.4);
`

const conditionWrapperCSS = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 6px;

	> h3 {
		font-size: var(--student-h3);
		color: var(--common-back-color-2);
	}

	> h4 {
		font-size: var(--student-h4);
		color: rgba(255, 255, 255, 0.6);
	}
`

export default GovJobCard
