import LoadImage from "@/components/common/LoadImage/LoadImage"
import { css } from "@emotion/react"
import Modal from "@/components/common/Modal/Modal"
import useCompHandler from "@/hooks/useCompHandler"
import ClassJobSearchModal from "./ClassJobSearchModal"

type ClassJobSearchCardPropsType = {
	mock: {
		id: number
		name: string
		need: number
	}
}

function ClassJobSearchCard({ mock }: ClassJobSearchCardPropsType) {
	const [openComp, closeComp, compState] = useCompHandler()

	return (
		<div css={wrapperCSS} onClick={openComp}>
			<div css={imageWrapperCSS}>
				<LoadImage wrapperCss={imgCSS} src={"/assets/job/weather_caster.png"} alt={"job_image"} />
			</div>
			<div css={contentWrapperCSS}>
				<span css={nameCSS}>{mock.name}</span>
				<span css={needCSS}>{mock.need}</span>
			</div>
			<Modal
				compState={compState}
				closeComp={closeComp}
				transition={"scale"}
				content={<ClassJobSearchModal job={mock.name} />}
			/>
		</div>
	)
}

const wrapperCSS = css`
	width: 150px;
	height: 100px;
	background-color: #007bc0;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	position: relative;
`

const imageWrapperCSS = css`
	position: absolute;
	top: 5px;
	left: 10px;
	width: 50px;
	height: 90px;
`

const imgCSS = css`
	width: 100%;
	height: 100%;

	filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2));
`

const contentWrapperCSS = css`
	width: 70px;
	height: 80px;
	position: absolute;
	top: 10px;
	right: 10px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const nameCSS = css`
	text-align: right;
	font-size: var(--student-h3);
	color: white;
`

const needCSS = css`
	text-align: right;
	color: rgba(255, 255, 255, 0.7);
	font-size: 3rem;
	font-weight: bold;
`

export default ClassJobSearchCard
