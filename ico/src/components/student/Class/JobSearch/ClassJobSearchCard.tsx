import LoadImage from "@/components/common/LoadImage/LoadImage"
import { css } from "@emotion/react"
import ClassJobSearchModal from "./ClassJobSearchModal"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import { getCheckApplyFlagAPI } from "@/api/student/class/getCheckApplyFlagAPI"
import { jobListType } from "@/types/teacher/apiReturnTypes"
import { useState } from "react"
import useModal from "@/components/common/Modal/useModal"
import ModalContent from "@/components/common/Modal/ModalContent"
import { GOV_JOB } from "../../Gov/GovIcons"

type ClassJobSearchCardPropsType = {
	job: jobListType
	myGrade: number
}

function ClassJobSearchCard({ job, myGrade }: ClassJobSearchCardPropsType) {
	const modal = useModal()
	const noti = useNotification()
	const [isAlreadyApplied, setIsAlreadyApplied] = useState<string|null>(null)

	const checkValidApplyHandler = (canApply: boolean) => {
		if (!canApply) {
			noti({
				content: <NotiTemplate type={"alert"} content={`신용 등급이 적합하지 않습니다.`} />,
				duration: 3000,
			})

			return
		}

		getCheckApplyFlagAPI({ jobId: job.id }).then((res) => {
			if (res) {
				setIsAlreadyApplied(res) // 신청한 직업 취소할 수 있는 id 저장

				noti({
					content: <NotiTemplate type={"alert"} content={`이미 신청하였습니다.`} />,
					duration: 3000,
				})
			} else {
				setIsAlreadyApplied(null)
			}

			modal.open()
		})
	}

	return (
		<>
			<div
				css={myGrade <= job.creditRating ? wrapperCSS(job.color) : hiddenWrapperCSS(job.color)}
				onClick={() => checkValidApplyHandler(myGrade <= job.creditRating)}
			>
				<div css={imageWrapperCSS}>
					<LoadImage wrapperCss={imgCSS} src={job.image} alt={"job_image"} />
				</div>
				<div css={contentWrapperCSS}>
					<span css={nameCSS}>{job.title}</span>
					<span css={gradeCSS}>{job.creditRating}등급 이상</span>
					<span css={needCSS}>{job.total}명</span>
				</div>
			</div>
			{modal(
				<ModalContent width={"320px"}
				icon={GOV_JOB}
				title={`${job.title}`}
				titleSize={"var(--student-h2)"}
				content={<ClassJobSearchModal job={job} closeComp={modal.close} isAlreadyApplied={isAlreadyApplied} />}
				forChild={true} />
			)}
		</>
	)
}

const wrapperCSS = (color: string) => {
	return css`
		width: 270px;
		height: 160px;
		background-color: ${color};
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		position: relative;
		overflow: hidden;
	`
}

const hiddenWrapperCSS = (color: string) => {
	return css`
		width: 270px;
		height: 160px;
		background-color: ${color};
		filter: brightness(55%);
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		position: relative;
		overflow: hidden;
	`
}

const imageWrapperCSS = css`
	position: absolute;
	top: 5px;
	left: 25px;
	width: 100px;
	height: 180px;
`

const imgCSS = css`
	width: 100%;
	height: 100%;

	filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2));
`

const contentWrapperCSS = css`
	/* border: 1px solid red; */
	width: 140px;
	height: 120px;
	position: absolute;
	top: 20px;
	right: 20px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const nameCSS = css`
	text-align: right;
	font-size: var(--student-h2);
	color: white;
	font-weight: bold;
`

const gradeCSS = css`
	text-align: right;
	font-size: 1.1rem;
	color: white;
`

const needCSS = css`
	text-align: right;
	color: rgba(255, 255, 255, 0.7);
	font-size: 4rem;
	font-weight: bold;
`

export default ClassJobSearchCard
