import React, { useEffect, useReducer, useState } from "react"
import GovJobCard from "./GovJobCard"
import { css } from "@emotion/react"
import Input from "@/components/common/Input/Input"
import Modal from "@/components/common/Modal/Modal"
import ModalContent from "@/components/common/Modal/ModalContent"
import GovJobItemCardCustomize from "./GovJobItemCardCustomize"
import useCompHandler from "@/hooks/useCompHandler"
import LoadImage from "@/components/common/LoadImage/LoadImage"
import Button from "@/components/common/Button/Button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postGovJobAPI } from "@/api/teacher/gov/postGovJobAPI"
import { putGovJobAPI } from "@/api/teacher/gov/putGovJobAPI"
import GovJobItemCertItem from "./GovJobItemCertItem"
import Dropdown from "@/components/common/Dropdown/Dropdown"
import { inputType, validType, GovRuleClassDetailProps, certificationType, validItemType } from "./GovJobItemType"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

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

const inputReducer = (state: inputType, action: { type: string; value: any }): inputType => {
	switch (action.type) {
		case "CHANGE_TITLE":
			return { ...state, title: action.value }
		case "CHANGE_DETAIL":
			return { ...state, detail: action.value }
		case "CHANGE_WAGE":
			return { ...state, wage: action.value }
		case "CHANGE_CREDIT":
			return { ...state, creditRating: action.value }
		case "CHANGE_COLOR":
			return { ...state, color: action.value }
		case "CHANGE_IMG_URL":
			return { ...state, image: action.value }
		case "CHANGE_TOTAL":
			return { ...state, total: action.value }
		case "CHANGE_CERTIFICATION":
			return { ...state, certification: action.value }
		case "CHANGE_ROLE_STATUS":
			return { ...state, roleStatus: action.value }
		default:
			return state
	}
}

const validReducer = (state: validType, action: { type: string; value: validItemType }): validType => {
	switch (action.type) {
		case "CHANGE_TITLE":
			return { ...state, title: action.value }
		case "CHANGE_DETAIL":
			return { ...state, detail: action.value }
		case "CHANGE_WAGE":
			return { ...state, wage: action.value }
		case "CHANGE_CREDIT":
			return { ...state, creditRating: action.value }
		case "CHANGE_COLOR":
			return { ...state, color: action.value }
		case "CHANGE_IMG_URL":
			return { ...state, image: action.value }
		case "CHANGE_TOTAL":
			return { ...state, total: action.value }
		case "CHANGE_CERTIFICATION":
			return { ...state, certification: action.value }
		case "CHANGE_ROLE_STATUS":
			return { ...state, roleStatus: action.value }
		default:
			return state
	}
}

function GovJobItem({
	title,
	detail,
	wage,
	color,
	image,
	creditRating,
	total,
	count,
	idx,
	currency,
	roleStatus,
	roleStatusList,
	certification,
	closeHandler,
}: GovRuleClassDetailProps) {
	const initialInput: inputType = {
		title: title ? title : "",
		detail: detail ? detail : "",
		wage: wage ? String(wage) : "",
		creditRating: creditRating ? String(creditRating) : "",
		color: color ? color : "#FF165C",
		image: image ? image : "/assets/job/worker_male.png",
		total: total ? String(total) : "",
		roleStatus: roleStatus ? roleStatus : null,
		certification,
	}

	const initialValid: validType = {
		title: title ? "notChanged" : "empty",
		detail: detail ? "notChanged" : "empty",
		wage: wage ? "notChanged" : "empty",
		creditRating: creditRating ? "notChanged" : "empty",
		color: color ? "notChanged" : "changed",
		image: image ? "notChanged" : "changed",
		total: total ? "notChanged" : "empty",
		roleStatus: roleStatus ? "notChanged" : "empty",
		certification: certification ? "notChanged" : "changed",
	}

	const [inputState, dispatchInput] = useReducer(inputReducer, initialInput)
	const [validState, dispatchValid] = useReducer(validReducer, initialValid)
	const [isSubmitValid, setIsSubmitValid] = useState<boolean>(false)
	const [illustIdx, setIllustIdx] = useState<number>(ILLUST.indexOf(inputState.image))
	const [openComp, closeComp, compState] = useCompHandler()
	const [openDropdown, closeDropdown, dropdownState] = useCompHandler()
	const noti = useNotification()

	useEffect(() => {
		const validHandler = function (el: certificationType, idx: number) {
			return el.rating === certification[idx].rating
		}

		const isCertValid = inputState.certification.every(validHandler)

		if (isCertValid === false) {
			dispatchValid({ type: "CHANGE_CERTIFICATION", value: "changed" })
		} else {
			dispatchValid({ type: "CHANGE_CERTIFICATION", value: "notChanged" })
		}
	}, [inputState.certification, certification])

	useEffect(() => {
		if (inputState.title !== title && inputState.title.trim() !== "") {
			dispatchValid({ type: "CHANGE_TITLE", value: "changed" })
		} else if (inputState.title === title) {
			dispatchValid({ type: "CHANGE_TITLE", value: "notChanged" })
		} else if (inputState.title.trim() === "") {
			dispatchValid({ type: "CHANGE_TITLE", value: "empty" })
		}

		if (inputState.detail !== detail && inputState.detail.trim() !== "") {
			dispatchValid({ type: "CHANGE_DETAIL", value: "changed" })
		} else if (inputState.detail === detail) {
			dispatchValid({ type: "CHANGE_DETAIL", value: "notChanged" })
		} else if (inputState.detail.trim() === "") {
			dispatchValid({ type: "CHANGE_DETAIL", value: "empty" })
		}

		if (Number(inputState.wage) !== wage && inputState.wage !== "") {
			dispatchValid({ type: "CHANGE_WAGE", value: "changed" })
		} else if (Number(inputState.wage) === wage) {
			dispatchValid({ type: "CHANGE_WAGE", value: "notChanged" })
		} else if (inputState.wage === "") {
			dispatchValid({ type: "CHANGE_WAGE", value: "empty" })
		}

		if (
			Number(inputState.creditRating) !== creditRating &&
			inputState.creditRating !== "" &&
			inputState.creditRating !== "0"
		) {
			dispatchValid({ type: "CHANGE_CREDIT", value: "changed" })
		} else if (Number(inputState.creditRating) === creditRating) {
			dispatchValid({ type: "CHANGE_CREDIT", value: "notChanged" })
		} else if (inputState.creditRating === "" || inputState.creditRating === "0") {
			dispatchValid({ type: "CHANGE_CREDIT", value: "empty" })
		}

		if (inputState.color !== color && inputState.color.trim() !== "") {
			dispatchValid({ type: "CHANGE_COLOR", value: "changed" })
		} else if (inputState.color === color) {
			dispatchValid({ type: "CHANGE_COLOR", value: "notChanged" })
		} else if (inputState.color.trim() === "") {
			dispatchValid({ type: "CHANGE_COLOR", value: "empty" })
		}

		if (inputState.image !== image && inputState.image.trim() !== "") {
			dispatchValid({ type: "CHANGE_IMG_URL", value: "changed" })
		} else if (inputState.image === image) {
			dispatchValid({ type: "CHANGE_IMG_URL", value: "notChanged" })
		} else if (inputState.image.trim() === "") {
			dispatchValid({ type: "CHANGE_IMG_URL", value: "empty" })
		}

		if (Number(inputState.total) !== total && inputState.total !== "") {
			dispatchValid({ type: "CHANGE_TOTAL", value: "changed" })
		} else if (Number(inputState.total) === total) {
			dispatchValid({ type: "CHANGE_TOTAL", value: "notChanged" })
		} else if (inputState.total === "") {
			dispatchValid({ type: "CHANGE_TOTAL", value: "empty" })
		}

		if (
			(inputState.roleStatus && roleStatus && inputState.roleStatus.id !== roleStatus.id) ||
			(roleStatus === null && inputState.roleStatus !== null) ||
			(roleStatus !== null && inputState.roleStatus === null)
		) {
			dispatchValid({ type: "CHANGE_ROLE_STATUS", value: "changed" })
		} else if (roleStatus === null && inputState.roleStatus === null) {
			dispatchValid({ type: "CHANGE_ROLE_STATUS", value: "notChanged" })
		} else if (inputState.roleStatus && roleStatus && inputState.roleStatus.id === roleStatus.id) {
			dispatchValid({ type: "CHANGE_ROLE_STATUS", value: "notChanged" })
		}
	}, [inputState, title, detail, wage, color, image, creditRating, total, roleStatus])

	useEffect(() => {
		const arr = Object.values(validState)
		setIsSubmitValid(() => !arr.includes("empty") && arr.includes("changed"))
	}, [validState])

	const queryClient = useQueryClient()

	const createMutation = useMutation((a: number) =>
		postGovJobAPI({
			body: inputState,
		}),
	)
	const updateMutation = useMutation((idx: number) =>
		putGovJobAPI({
			idx,
			body: inputState,
		}),
	)

	const submitHandler = () => {
		if (typeof idx === "number") {
			updateMutation.mutate(idx, {
				onSuccess: (formData) => {
					noti({ content: <NotiTemplate type={"ok"} content={"직업을 수정하였습니다."} />, duration: 5000 })
					return queryClient.invalidateQueries(["teacher", "govJob"]) // 'return' wait for invalidate
				},
			})
		} else {
			createMutation.mutate(1, {
				onSuccess: (formData) => {
					closeHandler && closeHandler()
					noti({ content: <NotiTemplate type={"ok"} content={"직업을 생성하였습니다."} />, duration: 5000 })
					return queryClient.invalidateQueries(["teacher", "govJob"]) // 'return' wait for invalidate
				},
			})
		}
	}

	const colorPickHandler = (value: string) => {
		dispatchInput({ type: "CHANGE_COLOR", value })
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
				css={colorElementCSS({ backgroundColor: el, currentColor: inputState.color })}
				onClick={() => colorPickHandler(el)}
			></div>
		)
	})

	const renderCardCustomButton = (
		<div css={currentColorWrapperCSS} onClick={openComp}>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M21 18L19.9999 19.094C19.4695 19.6741 18.7502 20 18.0002 20C17.2501 20 16.5308 19.6741 16.0004 19.094C15.4693 18.5151 14.75 18.1901 14.0002 18.1901C13.2504 18.1901 12.5312 18.5151 12 19.094M3.00003 20H4.67457C5.16376 20 5.40835 20 5.63852 19.9447C5.84259 19.8957 6.03768 19.8149 6.21663 19.7053C6.41846 19.5816 6.59141 19.4086 6.93732 19.0627L19.5001 6.49998C20.3285 5.67156 20.3285 4.32841 19.5001 3.49998C18.6716 2.67156 17.3285 2.67156 16.5001 3.49998L3.93729 16.0627C3.59139 16.4086 3.41843 16.5816 3.29475 16.7834C3.18509 16.9624 3.10428 17.1574 3.05529 17.3615C3.00003 17.5917 3.00003 17.8363 3.00003 18.3255V20Z"
					stroke="black"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	)

	let certCount = 0
	const renderCertSub = inputState?.certification?.map((el, idx) => {
		if (el.rating !== -1) {
			certCount += 1
			return `${certCount > 1 ? ", " : ""}${el.subject}: ${el.rating}`
		}
	})

	const ratingHandler = ({ id, reverse = false }: { id: number; reverse: boolean }) => {
		let curIdx: number = 0

		inputState.certification.forEach((item, idx) => {
			if (item.id === id) {
				curIdx = idx
			}
		})

		let value: number | null = null
		if (reverse === true) {
			if (inputState.certification[curIdx].rating > 1) {
				value = inputState.certification[curIdx].rating - 1
			} else if (inputState.certification[curIdx].rating === -1) {
				value = 10
			}
		} else {
			if (inputState.certification[curIdx].rating < 10 && inputState.certification[curIdx].rating !== -1) {
				value = inputState.certification[curIdx].rating + 1
			} else {
				value = -1
			}
		}

		if (value !== null) {
			dispatchInput({
				type: "CHANGE_CERTIFICATION",
				value: inputState.certification.map((item) => (id === item.id ? { ...item, rating: value } : item)),
			})
		}
	}

	const renderCertField = inputState?.certification?.map((el, idx) => {
		return (
			<GovJobItemCertItem
				arrIdx={idx}
				id={el.id}
				subject={el.subject}
				rating={el.rating}
				ratingHandler={ratingHandler}
			/>
		)
	})

	const titleInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatchInput({ type: "CHANGE_TITLE", value: event.target.value })
	}

	const detailInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatchInput({ type: "CHANGE_DETAIL", value: event.target.value })
	}

	const creditInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (Number(event.target.value) <= 10) {
			dispatchInput({ type: "CHANGE_CREDIT", value: event.target.value })
		}
	}

	const wageInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (Number(event.target.value) <= 1000000) {
			dispatchInput({ type: "CHANGE_WAGE", value: Number(event.target.value) })
		}
	}

	const totalInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (Number(event.target.value) <= 100) {
			dispatchInput({ type: "CHANGE_TOTAL", value: Number(event.target.value) })
		}
	}

	const dropdownList = [
		{
			name: "noRole",
			content: null,
			label: "권한 없음",
			function: () => {
				dispatchInput({
					type: "CHANGE_ROLE_STATUS",
					value: null,
				})
			},
		},
	].concat(
		roleStatusList.map((el, idx) => {
			return {
				name: el.status,
				content: null,
				label: el.subject,
				function: () => {
					dispatchInput({
						type: "CHANGE_ROLE_STATUS",
						value: {
							id: el.id,
							status: el.status,
							subject: el.subject,
						},
					})
				},
			}
		}),
	)

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
							<GovJobItemCardCustomize
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
				<div
					css={css`
						position: relative;
					`}
				>
					<GovJobCard
						job={inputState.title}
						wage={Number(inputState.wage)}
						backgroundColor={inputState.color}
						imgUrl={inputState.image}
					/>
					{renderCardCustomButton}
				</div>

				<div css={outerInputFieldCSS}>
					<div css={certFieldCSS}>
						<div css={certInnerFieldCSS}>{renderCertField}</div>
					</div>
					<div css={inputFieldCSS}>
						<div>
							<Input
								theme={"titleNoTheme"}
								placeholder={"직업 명을 입력해 주세요."}
								value={inputState.title}
								customCss={css`
									border-bottom: 1px solid rgba(0, 0, 0, 0.07);
								`}
								onChange={titleInputHandler}
							/>
							<Input
								theme={"none"}
								placeholder={"내용을 입력해 주세요."}
								onChange={detailInputHandler}
								value={inputState.detail}
								isTextarea={true}
							/>
						</div>
						<div css={footerCSS}>
							<div css={prefWrapperCSS}>
								<Input
									theme={"radial"}
									customCss={css`
										width: 128px;
									`}
									onChange={creditInputHandler}
									value={inputState.creditRating}
									leftContent={<div>신용</div>}
									rightContent={<div>등급</div>}
								/>
								<Input
									theme={"radial"}
									customCss={css`
										width: 164px;
									`}
									value={inputState.wage}
									onChange={wageInputHandler}
									leftContent={<div>월급</div>}
									rightContent={<div>{currency}</div>}
								/>
								<Input
									theme={"radial"}
									customCss={css`
										width: 148px;
									`}
									value={inputState.total}
									onChange={totalInputHandler}
									leftContent={<div>인원 {count} /</div>}
									rightContent={<div>명</div>}
								/>

								{certCount !== 0 && <div css={inputItemWrapperCSS}>{renderCertSub}</div>}

								<div
									css={[
										inputItemWrapperCSS,
										css`
											min-width: 100px;
										`,
									]}
									onClick={openDropdown}
								>
									<Dropdown
										compState={dropdownState}
										closeComp={closeDropdown}
										width={"100%"}
										height={"32px"}
										element={dropdownList}
										align={"left"}
										customCss={css`
											top: 36px;
										`}
									/>
									{inputState.roleStatus ? inputState.roleStatus.subject : "권한 없음"}
								</div>
							</div>

							<div css={ButtonWrapperCSS}>
								{closeHandler && (
									<Button
										text={"취소"}
										fontSize={`var(--teacher-h5)`}
										width={"84px"}
										cssProps={css`
											flex: 1;
											margin-right: 8px;
											margin-bottom: 8px;
											height: 32px;
										`}
										theme={"cancelDark"}
										onClick={() => {
											closeHandler()
										}}
									/>
								)}
								<Button
									text={"저장"}
									fontSize={`var(--teacher-h5)`}
									width={"84px"}
									cssProps={css`
										flex: 1;
										margin-right: 8px;
										margin-bottom: 8px;
										height: 32px;
									`}
									theme={"cancelDark"}
									onClick={() => {
										submitHandler()
									}}
									disabled={isSubmitValid ? false : true}
								/>
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
	/* overflow: hidden; */
`

const footerCSS = css`
	width: 100%;
	display: flex;
	justify-content: space-between;
`

const ButtonWrapperCSS = css`
	height: 100%;
	display: flex;
	align-items: flex-end;
	gap: 8px;
`

const prefWrapperCSS = css`
	flex: 1;
	/* height: 48px; */
	/* background-color: rgba(0, 0, 0, 0.03); */
	/* display: flex; */
	/* align-items: center; */
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
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
	position: absolute;
	/* height: 100%; */
	display: flex;
	align-items: center;
	justify-content: center;
	/* position: absolute; */
	top: 32px;
	right: 32px;
	width: 32px;
	height: 32px;
	background-color: rgba(255, 255, 255, 1);
	opacity: 80%;
	border-radius: 100%;
	box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	z-index: 999999;
	/* top: -420%; */
	transition-property: background-color transform box-shadow opacity;
	transition-duration: 0.2s;
	& path {
		stroke: rgba(0, 0, 0, 0.7);
	}

	&:hover {
		/* background-color: rgba(255, 255, 255, 1); */
		transform: scale(110%);
		box-shadow: 0px 5px 10px 1px rgba(0, 0, 0, 0.3);
		opacity: 100%;
	}
`

const inputItemWrapperCSS = css`
	border-radius: 10px;
	background-color: rgba(255, 255, 255, 0.5);
	/* overflow: hidden; */
	border: 1px solid rgba(0, 0, 0, 0.1);
	height: 32px;
	padding: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition-property: background-color;
	transition-duration: 0.2s;
	cursor: pointer;
	user-select: none;
	position: relative;

	&:hover {
		background-color: rgba(255, 255, 255, 1);
	}
`

const outerInputFieldCSS = css`
	display: flex;
	flex: 1;
`

const certFieldCSS = css`
	background-color: rgba(0, 0, 0, 0.03);
	/* min-width: 200px;
	max-width: 400px;
	width: 15vw; */
	/* height: 100%; */
	margin: 14px 14px 14px 0px;
	border-radius: 10px;
`

const certInnerFieldCSS = css`
	min-height: 100%;
	height: 1px;
	overflow-y: scroll;

	padding: 8px;
`

export default GovJobItem
