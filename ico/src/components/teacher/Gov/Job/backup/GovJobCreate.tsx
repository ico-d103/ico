// import React, { useState } from "react"
// import { css } from "@emotion/react"
// import { useQueryClient } from "@tanstack/react-query"
// import { useMutation, useQuery } from "@tanstack/react-query"
// import { putGovJobAPI } from "@/api/teacher/gov/putGovJobAPI"
// import { postGovJobAPI } from "@/api/teacher/gov/postGovJobAPI"
// import useGetNation from "@/hooks/useGetNation"
// import LoadImage from "@/components/common/LoadImage/LoadImage"
// import useCompHandler from "@/hooks/useCompHandler"
// import Modal from "@/components/common/Modal/Modal"
// import ModalContent from "@/components/common/Modal/ModalContent"
// import GovJobCreateModal from "./GovJobCreateModal"

// const APPLY_ICON = (
// 	<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
// 		<path
// 			d="M24.9993 29V17M18.9992 23H30.9993M24.9993 40C34.3881 40 41.9992 32.3888 41.9992 23C41.9992 13.6112 34.3881 6 24.9993 6C15.6104 6 7.99925 13.6112 7.99925 23C7.99925 24.9 8.31094 26.7272 8.88599 28.4332C9.10239 29.0752 9.21059 29.3962 9.2301 29.6429C9.24938 29.8864 9.23481 30.0571 9.17456 30.2939C9.11354 30.5336 8.97884 30.783 8.70944 31.2816L5.43812 37.3367C4.9715 38.2004 4.73819 38.6323 4.79041 38.9655C4.83589 39.2558 5.00674 39.5115 5.2576 39.6645C5.5456 39.8402 6.03385 39.7897 7.01033 39.6887L17.2524 38.63C17.5625 38.598 17.7176 38.5819 17.859 38.5873C17.998 38.5927 18.0961 38.6057 18.2317 38.637C18.3696 38.6687 18.5429 38.7355 18.8896 38.8691C20.7857 39.5996 22.8457 40 24.9993 40Z"
// 			stroke="black"
// 			stroke-width="3"
// 			stroke-linecap="round"
// 			stroke-linejoin="round"
// 		/>
// 	</svg>
// )

// function GovJobCreate({
// 	subInputChangeHandler,
// 	inputState,
// 	buttons,
// 	count,
// 	closeHandler,
// 	idx,
// }: {
// 	subInputChangeHandler?: any
// 	inputState?: any
// 	buttons?: any
// 	count?: number
// 	closeHandler?: Function
// 	idx?: number
// }) {
// 	const COLOR = [
// 		"#FF165C",
// 		"#FF4A4A",
// 		"#FF8B4A",
// 		"#FFA234",
// 		"#FAC91D",
// 		"#A6D953",
// 		"#7BD979",
// 		"#4AB6A9",
// 		"#4A87FF",
// 		"#634AFF",
// 	]

// 	const ILLUST = [
// 		"https://d3bkfkkihwj5ql.cloudfront.net/worker_male.png",
// 		"https://d3bkfkkihwj5ql.cloudfront.net/worker_female.png",
// 		"https://d3bkfkkihwj5ql.cloudfront.net/Student1.png",
// 		"https://d3bkfkkihwj5ql.cloudfront.net/Student2.png",
// 		"https://d3bkfkkihwj5ql.cloudfront.net/Student3.png",
// 		"https://d3bkfkkihwj5ql.cloudfront.net/Student4.png",
// 		"https://d3bkfkkihwj5ql.cloudfront.net/Student5.png",
// 		"https://d3bkfkkihwj5ql.cloudfront.net/Student6.png",
// 		"https://d3bkfkkihwj5ql.cloudfront.net/cleaner.png",
// 		"https://d3bkfkkihwj5ql.cloudfront.net/chef.png",
// 		"https://d3bkfkkihwj5ql.cloudfront.net/designer.png",
// 		"https://d3bkfkkihwj5ql.cloudfront.net/garbage_collector.png",
// 		"https://d3bkfkkihwj5ql.cloudfront.net/reporter.png",
// 		"https://d3bkfkkihwj5ql.cloudfront.net/repairman.png",
// 		"https://d3bkfkkihwj5ql.cloudfront.net/firefighter.png",
// 		"https://d3bkfkkihwj5ql.cloudfront.net/police.png",
// 		"https://d3bkfkkihwj5ql.cloudfront.net/doctor.png",
// 		"https://d3bkfkkihwj5ql.cloudfront.net/weather_caster.png",
// 		"https://d3bkfkkihwj5ql.cloudfront.net/postman.png",
// 	]

// 	const [nation] = useGetNation()
// 	const [openComp, closeComp, compState] = useCompHandler()
// 	const [illustIdx, setIllustIdx] = useState<number>(ILLUST.indexOf(inputState.sub.imgUrl))
// 	const queryClient = useQueryClient()
// 	// 직업 추가 구현시 수정해서 사용

// 	const createMutation = useMutation((a: number) =>
// 		postGovJobAPI({
// 			body: {
// 				image: inputState.sub.imgUrl,
// 				title: inputState.title,
// 				detail: inputState.content,
// 				total: inputState.sub.total,
// 				wage: inputState.sub.wage,
// 				color: inputState.sub.backgroundColor,
// 				creditRating: inputState.sub.credit,
// 			},
// 		}),
// 	)
// 	const updateMutation = useMutation((idx: number) =>
// 		putGovJobAPI({
// 			idx,
// 			body: {
// 				image: inputState.sub.imgUrl,
// 				title: inputState.title,
// 				detail: inputState.content,
// 				total: inputState.sub.total,
// 				wage: inputState.sub.wage,
// 				color: inputState.sub.backgroundColor,
// 				creditRating: inputState.sub.credit,
// 			},
// 		}),
// 	)

// 	const submit = () => {
// 		if (typeof idx === "number") {
// 			updateMutation.mutate(idx, {
// 				onSuccess: (formData) => {
// 					closeHandler && closeHandler()
// 					return queryClient.invalidateQueries(["teacher", "govJob"]) // 'return' wait for invalidate
// 				},
// 			})
// 		} else {
// 			// 직업 추가 구현시 수정해서 사용
// 			createMutation.mutate(1, {
// 				onSuccess: (formData) => {
// 					closeHandler && closeHandler()
// 					return queryClient.invalidateQueries(["teacher", "govJob"]) // 'return' wait for invalidate
// 				},
// 			})
// 		}
// 	}

// 	const creditInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		if (Number(event.target.value) <= 10) {
// 			subInputChangeHandler && subInputChangeHandler({ key: "credit", event })
// 		}
// 	}

// 	const wageInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		if (Number(event.target.value) <= 1000000) {
// 			subInputChangeHandler && subInputChangeHandler({ key: "wage", event })
// 		}
// 	}

// 	const totalInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		if (Number(event.target.value) <= 100) {
// 			subInputChangeHandler && subInputChangeHandler({ key: "total", event })
// 		}
// 	}

// 	const colorPickHandler = (value: string) => {
// 		subInputChangeHandler && subInputChangeHandler({ key: "backgroundColor", value })
// 	}

// 	const illustPickerHandler = (reverse = false) => {
// 		if (reverse) {
// 			if (illustIdx > 0) {
// 				subInputChangeHandler && subInputChangeHandler({ key: "imgUrl", value: ILLUST[illustIdx - 1] })
// 				setIllustIdx((prev) => prev - 1)
// 			} else {
// 				subInputChangeHandler && subInputChangeHandler({ key: "imgUrl", value: ILLUST[ILLUST.length - 1] })
// 				setIllustIdx(() => ILLUST.length - 1)
// 			}
// 		} else {
// 			if (illustIdx < ILLUST.length - 1) {
// 				subInputChangeHandler && subInputChangeHandler({ key: "imgUrl", value: ILLUST[illustIdx + 1] })
// 				setIllustIdx((prev) => prev + 1)
// 			} else {
// 				subInputChangeHandler && subInputChangeHandler({ key: "imgUrl", value: ILLUST[0] })
// 				setIllustIdx(() => 0)
// 			}
// 		}
// 	}

// 	const renderColorPicker = COLOR.map((el, idx) => {
// 		return (
// 			<div
// 				css={colorElementCSS({ backgroundColor: el, currentColor: inputState.sub.backgroundColor })}
// 				onClick={() => colorPickHandler(el)}
// 			></div>
// 		)
// 	})

// 	return (
// 		<React.Fragment>
// 			<Modal
// 				content={
// 					<ModalContent
// 						width={"480px"}
// 						title={"명함 커스텀"}
// 						titleSize={"var(--student-h1)"}
// 						icon={APPLY_ICON}
// 						content={
// 							<GovJobCreateModal
// 								closeComp={closeComp}
// 								inputState={inputState}
// 								colorPicker={renderColorPicker}
// 								illustPicker={illustPickerHandler}
// 							/>
// 						}
// 					/>
// 				}
// 				compState={compState}
// 				closeComp={closeComp}
// 				transition={"scale"}
// 			/>
// 			<div css={secondaryInputWrapperCSS}>
// 				<div css={creditValueInputWrapperCSS}>
// 					<div css={textCSS}>신용</div>
// 					<input
// 						value={inputState?.sub.credit}
// 						onChange={(event) => {
// 							creditInputHandler(event)
// 						}}
// 						type={"number"}
// 						min={1}
// 						max={10}
// 						css={[
// 							inputCSS,
// 							css`
// 								width: 32px;
// 							`,
// 						]}
// 					/>
// 					등급
// 				</div>

// 				<div css={wageValueInputWrapperCSS}>
// 					<div css={textCSS}>일급</div>
// 					<div css={innerWageWrapperCSS}>
// 						<input
// 							value={inputState?.sub.wage}
// 							onChange={(event) => {
// 								wageInputHandler(event)
// 							}}
// 							type={"number"}
// 							min={1}
// 							max={20}
// 							css={[
// 								inputCSS,
// 								css`
// 									width: 64px;
// 								`,
// 							]}
// 						/>
// 						{nation.currency}
// 					</div>
// 				</div>

// 				<div css={totalValueInputWrapperCSS}>
// 					<div css={textCSS}>인원 {typeof count === "number" && count + " /"} </div>
// 					<input
// 						value={inputState?.sub.total}
// 						onChange={(event) => {
// 							totalInputHandler(event)
// 						}}
// 						type={"number"}
// 						min={1}
// 						max={100}
// 						css={[
// 							inputCSS,
// 							css`
// 								width: 32px;
// 							`,
// 						]}
// 					/>
// 					명
// 				</div>

// 				<div css={currentColorWrapperCSS}>
// 					<div onClick={openComp} css={selectedColorElementCSS({ backgroundColor: inputState.sub.backgroundColor })}>
// 						<div
// 							css={css`
// 								width: 100%;
// 								height: 100%;
// 								border-radius: 100%;
// 								overflow: hidden;
// 							`}
// 						>
// 							<LoadImage
// 								src={inputState.sub.imgUrl}
// 								alt={"thumbnail"}
// 								wrapperCss={css`
// 									width: 100%;
// 									height: 300%;
// 									top: -30%;
// 									filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.4));
// 								`}
// 							/>
// 						</div>

// 						{/* <div className={'color-picker'} css={colorPickerWrapperCSS}>{renderColorPicker}</div> */}
// 					</div>
// 				</div>
// 			</div>
// 			{buttons(submit)}
// 		</React.Fragment>
// 	)
// }

// const secondaryInputWrapperCSS = css`
// 	display: flex;
// 	position: relative;
// `

// const textCSS = css`
// 	/* height: 100%;
// 	display: flex;
// 	align-items: center;
// 	color: white;
// 	margin: 0px 16px 0px 16px; */
// 	margin: 0px 6px 0px 0px;
// 	color: rgba(255, 255, 255, 0.4);
// `

// const creditValueInputWrapperCSS = css`
// 	height: 40px;
// 	width: 120px;
// 	color: var(--common-back-color-2);
// 	display: flex;
// 	box-sizing: border-box;
// 	padding: 8px;
// 	justify-content: space-between;
// 	align-items: center;
// 	position: relative;
// 	/* background-color: rgba(255, 255, 255, 0.03); */
// 	border-radius: 10px;
// 	transition-property: background-color;
// 	transition-duration: 0.3s;
// 	/* margin-right: 0px; */
// 	white-space: nowrap;
// 	&:hover {
// 		background-color: rgba(255, 255, 255, 0.2);
// 	}
// `

// const wageValueInputWrapperCSS = css`
// 	height: 40px;
// 	width: 150px;
// 	color: var(--common-back-color-2);
// 	display: flex;
// 	box-sizing: border-box;
// 	padding: 8px;
// 	justify-content: space-between;
// 	align-items: center;
// 	position: relative;
// 	/* background-color: rgba(255, 255, 255, 0.03); */
// 	border-radius: 10px;
// 	transition-property: background-color;
// 	transition-duration: 0.3s;
// 	/* margin-right: 8px; */
// 	white-space: nowrap;
// 	&:hover {
// 		background-color: rgba(255, 255, 255, 0.2);
// 	}
// `

// const totalValueInputWrapperCSS = css`
// 	height: 40px;
// 	width: 120px;
// 	color: var(--common-back-color-2);
// 	display: flex;
// 	box-sizing: border-box;
// 	padding: 8px;
// 	justify-content: space-between;
// 	align-items: center;
// 	position: relative;
// 	/* background-color: rgba(255, 255, 255, 0.03); */
// 	border-radius: 10px;
// 	transition-property: background-color;
// 	transition-duration: 0.3s;
// 	/* margin-right: 24px; */
// 	white-space: nowrap;
// 	&:hover {
// 		background-color: rgba(255, 255, 255, 0.2);
// 	}
// `

// const innerWageWrapperCSS = css`
// 	flex: 1;
// 	display: flex;
// 	align-items: center;
// `

// const inputCSS = css`
// 	/* flex: 1; */
// 	/* width: 32px; */
// 	height: 28px;
// 	background-color: rgba(255, 255, 255, 0.1);
// 	border-radius: 10px;
// 	border: none;
// 	outline: none;
// 	color: var(--common-back-color-2);
// 	text-align: right;
// 	margin-right: 6px;
// 	padding-right: 6px;
// 	font-size: var(--teacher-h5);
// 	&::-webkit-inner-spin-button {
// 		appearance: none;
// 		-moz-appearance: none;
// 		-webkit-appearance: none;
// 	}
// `

// const currentColorWrapperCSS = css`
// 	height: 100%;
// 	display: flex;
// 	align-items: center;
// 	/* position: absolute; */
// 	top: 0;
// 	/* top: -420%; */
// `

// const colorPickerWrapperCSS = css`
// 	transition-property: opacity;
// 	transition-duration: 0.3s;
// 	pointer-events: none;
// 	opacity: 0%;
// 	position: absolute;
// 	height: 100%;
// 	display: flex;
// 	align-items: center;
// 	background-color: rgba(255, 255, 255, 0.5);
// 	backdrop-filter: blur(20px);
// 	border-radius: 10px;
// 	padding: 24px 12px 24px 12px;
// 	box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.3);
// `

// const colorElementCSS = ({ backgroundColor, currentColor }: { backgroundColor: string; currentColor: string }) => {
// 	return css`
// 		width: 28px;
// 		height: 28px;
// 		background-color: ${backgroundColor};
// 		border-radius: 100px;
// 		border: 2px solid rgba(255, 255, 255, 0.7);
// 		margin: 0px 5px 0px 5px;
// 		cursor: pointer;
// 		transition-property: filter;
// 		transition-duration: 0.3s;

// 		filter: ${backgroundColor !== currentColor && "brightness(50%)"};
// 	`
// }

// const selectedColorElementCSS = ({ backgroundColor }: { backgroundColor: string }) => {
// 	return css`
// 		position: relative;
// 		width: 28px;
// 		height: 28px;
// 		background-color: ${backgroundColor};
// 		border-radius: 100px;
// 		border: 2px solid rgba(255, 255, 255, 0.7);
// 		margin: 0px 5px 0px 5px;
// 		cursor: pointer;
// 		transition-property: filter;
// 		transition-duration: 0.3s;
// 		display: flex;
// 		align-items: center;
// 		justify-content: center;
// 	`
// }

// export default GovJobCreate
