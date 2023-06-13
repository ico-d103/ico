import React, { useReducer, useState } from "react"
import GovJobCard from "./GovJobCard"
import { css } from "@emotion/react"
import Input from "@/components/common/Input/Input"
import Modal from "@/components/common/Modal/Modal"
import ModalContent from "@/components/common/Modal/ModalContent"
import GovJobCreateModal from "./GovJobCreateModal"
import useCompHandler from "@/hooks/useCompHandler"
import LoadImage from "@/components/common/LoadImage/LoadImage"

type GovRuleClassDetailProps = {
	job?: string
	description?: string
	wage?: number
	credit?: number
	backgroundColor?: string
	imgUrl?: string
	total?: number
	count?: number
	actualIdx?: number
	currency?: string
}

const APPLY_ICON = (
	<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M24.9993 29V17M18.9992 23H30.9993M24.9993 40C34.3881 40 41.9992 32.3888 41.9992 23C41.9992 13.6112 34.3881 6 24.9993 6C15.6104 6 7.99925 13.6112 7.99925 23C7.99925 24.9 8.31094 26.7272 8.88599 28.4332C9.10239 29.0752 9.21059 29.3962 9.2301 29.6429C9.24938 29.8864 9.23481 30.0571 9.17456 30.2939C9.11354 30.5336 8.97884 30.783 8.70944 31.2816L5.43812 37.3367C4.9715 38.2004 4.73819 38.6323 4.79041 38.9655C4.83589 39.2558 5.00674 39.5115 5.2576 39.6645C5.5456 39.8402 6.03385 39.7897 7.01033 39.6887L17.2524 38.63C17.5625 38.598 17.7176 38.5819 17.859 38.5873C17.998 38.5927 18.0961 38.6057 18.2317 38.637C18.3696 38.6687 18.5429 38.7355 18.8896 38.8691C20.7857 39.5996 22.8457 40 24.9993 40Z"
			stroke="black"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

const COLOR = [
	"#FF165C",
	"#FF4A4A",
	"#FF8B4A",
	"#FFA234",
	"#FAC91D",
	"#A6D953",
	"#7BD979",
	"#4AB6A9",
	"#4A87FF",
	"#634AFF",
]

const ILLUST = [
	"https://d3bkfkkihwj5ql.cloudfront.net/worker_male.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/worker_female.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/Student1.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/Student2.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/Student3.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/Student4.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/Student5.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/Student6.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/cleaner.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/chef.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/designer.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/garbage_collector.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/reporter.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/repairman.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/firefighter.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/police.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/doctor.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/weather_caster.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/postman.png",
]

const inputReducer = (
	state: {
		job: string
		description: string
		wage: string
		credit: string
		backgroundColor: string
		imgUrl: string
		total: string
	},
	action: { type: string; value: string },
) => {
	switch (action.type) {
		case "CHANGE_JOB":
			return { ...state, job: action.value }
		case "CHANGE_DESCRIPTION":
			return { ...state, description: action.value }
		case "CHANGE_WAGE":
			return { ...state, wage: action.value }
		case "CHANGE_CREDIT":
			return { ...state, credit: action.value }
		case "CHANGE_BACKGROUND_COLOR":
			return { ...state, backgroundColor: action.value }
		case "CHANGE_IMG_URL":
			return { ...state, imgUrl: action.value }
		case "CHANGE_TOTAL":
			return { ...state, total: action.value }
		default:
			return state
	}
}

function GovJobItem({
	job,
	description,
	wage,
	backgroundColor,
	imgUrl,
	credit,
	total,
	count,
	actualIdx,
	currency,
}: GovRuleClassDetailProps) {
	const [inputState, dispatchInput] = useReducer(inputReducer, {
		job: job ? job : "",
		description: description ? description : "",
		wage: wage ? String(wage) : "",
		credit: credit ? String(credit) : "",
		backgroundColor: backgroundColor ? backgroundColor : "#FF165C",
		imgUrl: imgUrl ? imgUrl : "/assets/job/worker_male.png",
		total: total ? String(total) : "",
	})

	const [illustIdx, setIllustIdx] = useState<number>(ILLUST.indexOf(inputState.imgUrl))
	const [openComp, closeComp, compState] = useCompHandler()

	const colorPickHandler = (value: string) => {
		dispatchInput({ type: "CHANGE_BACKGROUND_COLOR", value })
	}

	const illustPickerHandler = (reverse = false) => {
		if (reverse) {
			if (illustIdx > 0) {
				dispatchInput({ type: "CHANGE_IMG_URL", value: ILLUST[illustIdx - 1] })
				setIllustIdx((prev) => prev - 1)
			} else {
				dispatchInput({ type: "CHANGE_IMG_URL", value: ILLUST[ILLUST.length - 1] })
				setIllustIdx(() => ILLUST.length - 1)
			}
		} else {
			if (illustIdx < ILLUST.length - 1) {
				dispatchInput({ type: "CHANGE_IMG_URL", value: ILLUST[illustIdx + 1] })
				setIllustIdx((prev) => prev + 1)
			} else {
				dispatchInput({ type: "CHANGE_IMG_URL", value: ILLUST[0] })
				setIllustIdx(() => 0)
			}
		}
	}

	const renderColorPicker = COLOR.map((el, idx) => {
		return (
			<div
				css={colorElementCSS({ backgroundColor: el, currentColor: inputState.backgroundColor })}
				onClick={() => colorPickHandler(el)}
			></div>
		)
	})

	return (
		<React.Fragment>
			<Modal
				content={
					<ModalContent
						width={"480px"}
						title={"명함 커스텀"}
						titleSize={"var(--student-h1)"}
						icon={APPLY_ICON}
						content={
							<GovJobCreateModal
								closeComp={closeComp}
								inputState={inputState}
								colorPicker={renderColorPicker}
								illustPicker={illustPickerHandler}
							/>
						}
					/>
				}
				compState={compState}
				closeComp={closeComp}
				transition={"scale"}
			/>

			<div css={itemWrapperCSS}>
				<GovJobCard
					job={inputState.job}
					wage={Number(inputState.wage)}
					backgroundColor={inputState.backgroundColor}
					imgUrl={inputState.imgUrl}
				/>
				<div css={inputFieldCSS}>
					<div>
						<Input
							theme={"none"}
							placeholder={"직업 명을 입력해 주세요."}
							defaultValue={job}
							customCss={css`
								border-bottom: 1px solid rgba(0, 0, 0, 0.07);
							`}
						/>
						<Input theme={"none"} placeholder={"내용을 입력해 주세요."} defaultValue={description} isTextarea={true} />
					</div>
					<div css={prefWrapperCSS}>
						<Input
							theme={"radial"}
							customCss={css`
								width: 128px;
								margin-right: 8px;
							`}
							defaultValue={inputState.credit}
							leftContent={<div>신용</div>}
							rightContent={<div>등급</div>}
						/>
						<Input
							theme={"radial"}
							customCss={css`
								width: 164px;
								margin-right: 8px;
							`}
							defaultValue={inputState.wage}
							leftContent={<div>월급</div>}
							rightContent={<div>{currency}</div>}
						/>
						<Input
							theme={"radial"}
							customCss={css`
								width: 148px;
								margin-right: 8px;
							`}
							defaultValue={inputState.total}
							leftContent={<div>인원 {count} /</div>}
							rightContent={<div>명</div>}
						/>

						<div css={currentColorWrapperCSS}>
							<div onClick={openComp} css={selectedColorElementCSS({ backgroundColor: inputState.backgroundColor })}>
								<div
									css={css`
										width: 100%;
										height: 100%;
										border-radius: 100%;
										overflow: hidden;
									`}
								>
									<LoadImage
										src={inputState.imgUrl}
										alt={"thumbnail"}
										wrapperCss={css`
											width: 100%;
											height: 300%;
											top: -30%;
											filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.4));
										`}
									/>
								</div>

								{/* <div className={'color-picker'} css={colorPickerWrapperCSS}>{renderColorPicker}</div> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

const itemWrapperCSS = () => {
	return css`
		width: 100%;
		/* background-color: var(--teacher-main-color-2); */
		display: flex;
	`
}

const inputFieldCSS = css`
	background-color: rgba(0, 0, 0, 0.03);
	flex: 1;
	margin: 14px 14px 14px 0px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	overflow: hidden;
`

const prefWrapperCSS = css`
	width: 100%;
	height: 64px;
	background-color: rgba(0, 0, 0, 0.03);
	display: flex;
	align-items: center;
	padding: 8px;
`

const colorElementCSS = ({ backgroundColor, currentColor }: { backgroundColor: string; currentColor: string }) => {
	return css`
		width: 28px;
		height: 28px;
		background-color: ${backgroundColor};
		border-radius: 100px;
		border: 2px solid rgba(255, 255, 255, 0.7);
		margin: 0px 5px 0px 5px;
		cursor: pointer;
		transition-property: filter;
		transition-duration: 0.3s;

		filter: ${backgroundColor !== currentColor && "brightness(50%)"};
	`
}

const currentColorWrapperCSS = css`
	height: 100%;
	display: flex;
	align-items: center;
	/* position: absolute; */
	top: 0;
	/* top: -420%; */
`

const selectedColorElementCSS = ({ backgroundColor }: { backgroundColor: string }) => {
	return css`
		position: relative;
		width: 28px;
		height: 28px;
		background-color: ${backgroundColor};
		border-radius: 100px;
		border: 2px solid rgba(255, 255, 255, 0.7);
		margin: 0px 5px 0px 5px;
		cursor: pointer;
		transition-property: filter;
		transition-duration: 0.3s;
		display: flex;
		align-items: center;
		justify-content: center;
	`
}

export default GovJobItem
