import { css } from "@emotion/react"
import LoadImage from "@/components/common/LoadImage/LoadImage"
import Modal from "@/components/common/Modal/Modal"
import useCompHandler from "@/hooks/useCompHandler"
import ModalContent from "@/components/common/Modal/ModalContent"
import { GOV_JOB } from "../GovIcons"

type GovJobCardPropsType = {
	mock: {
		id: number
		student: string
		name: string
		content: string
		grade: number
		money: number
	}
}

function GovJobCard({ mock }: GovJobCardPropsType) {
	const [openComp, closeComp, compState] = useCompHandler()

	return (
		<div css={cardWrapperCSS} onClick={openComp}>
			<div css={imageWrapperCSS}>
				<LoadImage wrapperCss={imgCSS} src={"/assets/job/weather_caster.png"} alt={"job_image"} />
			</div>
			<div css={contentWrapperCSS}>
				<h3>{mock.student}</h3>
				<h4>{mock.name}</h4>
				<div css={divideCSS}></div>
				<div css={conditionWrapperCSS}>
					<h4>신용 등급</h4>
					<h3>{mock.grade}등급 이상</h3>
				</div>
				<div css={conditionWrapperCSS}>
					<h4>월급</h4>
					<h3>{mock.money} 미소</h3>
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
						title={`${mock.name}의 업무`}
						titleSize={"var(--student-h2)"}
						content={<span>하이</span>}
					/>
				}
			/>
		</div>
	)
}

const cardWrapperCSS = css`
	width: 270px;
	min-width: 270px;
	height: 150px;
	border-radius: 10px;
	background: #007bc0;
	position: relative;
	transition: all 0.2s;
`

const imageWrapperCSS = css`
	position: absolute;
	top: -20px;
	left: 10px;
	width: 102px;
	height: 164px;
`

const imgCSS = css`
	width: 100%;
	height: 100%;

	filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2));
`

const contentWrapperCSS = css`
	position: absolute;
	width: 130px;
	top: 20px;
	left: 120px;

	> h3 {
		color: var(--common-back-color-2);
		font-size: var(--student-h3);
		margin-bottom: 7px;
	}

	> h4 {
		font-size: var(--student-h4);
		color: rgba(255, 255, 255, 0.6);
		line-height: 18px;
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
	margin-bottom: 7px;

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
