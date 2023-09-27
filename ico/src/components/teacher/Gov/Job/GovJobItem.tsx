import React, { useEffect, useReducer, useState } from "react"
import GovJobItemCard from "./GovJobItemCard"
import { css } from "@emotion/react"
import Input from "@/components/common/Input/Input"
import Modal from "@/components/common/Modal/Modal"
import ModalContent from "@/components/common/Modal/ModalContent"
import GovJobItemCardCustomize from "./GovJobItemCardCustomize"
import Button from "@/components/common/Button/Button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postGovJobAPI } from "@/api/teacher/gov/postGovJobAPI"
import { putGovJobAPI } from "@/api/teacher/gov/putGovJobAPI"
import GovJobItemCertItem from "./GovJobItemDetailCustomizeCertItem"
import Dropdown from "@/components/common/Dropdown/Dropdown"
import { inputType, validType, GovRuleClassDetailProps, validItemType } from "./GovJobItemType"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import GovJobItemDetailCustomize from "./GovJobItemDetailCustomize"
import useGovJobInput, { JOB_COLOR } from "./useGovJobInput"
import useModal from "@/components/common/Modal/useModal"
import { jobLicenseListType } from "@/types/teacher/apiReturnTypes"
import { deleteGovJobAPI } from "@/api/teacher/gov/deleteGovJobAPI"
import ModalAlert from "@/components/common/Modal/ModalAlert"

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

function GovJobItem(props: GovRuleClassDetailProps) {
	// const [openCardCustomize, closeCardCustomize, cardCustomizeState] = useCompHandler()
	// const [openDetailCustomize, closeDetailCustomize, detailCustomizeState] = useCompHandler()

	const cardCustomizeModal = useModal()
	const detailCustomizeModal = useModal()
	const deleteModal = useModal()

	const noti = useNotification()

	const { inputState, handler, isSubmitValid, validState } = useGovJobInput(props)

	const renderColorPicker = JOB_COLOR.map((el, idx) => {
		return (
			<div
				css={colorElementCSS({ backgroundColor: el, currentColor: inputState.color })}
				onClick={() => handler.colorPickHandler(el)}
			></div>
		)
	})

	const renderCardCustomButton = (
		<div css={currentColorWrapperCSS} onClick={cardCustomizeModal.open}>
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
	const renderCertSub = inputState?.jobLicenseList?.map((el, idx) => {
		if (el.rating !== -1) {
			certCount += 1
			return `${certCount > 1 ? ", " : ""}${el.subject}: ${el.rating}`
		}
	})

	let powerCount = 0
	const renderPowerSub = props.powerList.map((el) => {
		if (inputState.empowered.includes(String(el.id))) {
			powerCount += 1
			return `${powerCount > 1 ? ", " : ""}${el.detail}`
		}
	})

	const queryClient = useQueryClient();

	const deleteJobMutation = useMutation(
    ({ id }: { id: number; }) =>
		deleteGovJobAPI({ id })
  );

	const deleteHandler = () => {
		if (props.idx) {
			deleteJobMutation.mutate({id: props.idx}, {
				onSuccess: (res) => {
					noti({content: <NotiTemplate type={"ok"} content={"직업을 삭제하였습니다!"}/>, duration: 5000})
					queryClient.invalidateQueries(["teacher", "govJob"])
				},
				onError: (err: any) => {
					noti({content: <NotiTemplate type={"alert"} content={err.response.data.message}/>, duration: 5000})
				}
			})
		}
		
	}

	return (
		<React.Fragment>
			{cardCustomizeModal(
				<ModalContent
					width={"480px"}
					title={"명함 커스텀"}
					titleSize={"var(--student-h1)"}
					icon={APPLY_ICON}
					content={
						<GovJobItemCardCustomize
							closeComp={cardCustomizeModal.close}
							inputState={inputState}
							colorPicker={renderColorPicker}
							illustPicker={handler.illustPickerHandler}
						/>
					}
				/>,
			)}

			{detailCustomizeModal(
				<ModalContent
					width={"auto"}
					title={"직업 커스텀"}
					titleSize={"var(--student-h1)"}
					icon={APPLY_ICON}
					content={
						<GovJobItemDetailCustomize
							closeComp={detailCustomizeModal.close}
							jobLicenseList={inputState.jobLicenseList}
							empowered={inputState.empowered}
							powerList={props.powerList}
							empoweredInputHandler={handler.empoweredInputHandler}
							ratingHandler={handler.ratingHandler}
						/>
					}
				/>,
			)}

			{deleteModal(
        <ModalAlert content={['삭제하면 되돌릴 수 없습니다.']} proceed={deleteHandler} closeComp={deleteModal.close} width={"360px"} title={"상품 삭제"} titleSize={"24px"}/>
      )}

			<div css={itemWrapperCSS}>
				<div
					css={css`
						position: relative;
					`}
				>
					<GovJobItemCard
						job={inputState.title}
						wage={Number(inputState.wage)}
						backgroundColor={inputState.color}
						imgUrl={inputState.image}
					/>
					{renderCardCustomButton}
				</div>

				<div css={outerInputFieldCSS}>
					<div css={certFieldCSS}>{/* <div css={certInnerFieldCSS}>{renderCertField}</div> */}</div>
					<div css={inputFieldCSS}>
						<div>
							<Input
								theme={"titleNoTheme"}
								placeholder={"직업 명을 입력해 주세요."}
								value={inputState.title}
								customCss={css`
									border-bottom: 1px solid rgba(0, 0, 0, 0.07);
								`}
								onChange={handler.titleInputHandler}
							/>
							<Input
								theme={"none"}
								placeholder={"내용을 입력해 주세요."}
								onChange={handler.detailInputHandler}
								value={inputState.detail}
								isTextarea={true}
							/>
							{/* {JSON.stringify(validState)} */}
						</div>
						<div css={footerCSS}>
							<div css={prefWrapperCSS}>
								<Input
									theme={"radial"}
									customCss={css`
										width: 128px;
									`}
									onChange={handler.creditInputHandler}
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
									onChange={handler.wageInputHandler}
									leftContent={<div>일급</div>}
									rightContent={<div>{props.currency}</div>}
								/>
								<Input
									theme={"radial"}
									customCss={css`
										width: 148px;
									`}
									value={inputState.total}
									onChange={handler.totalInputHandler}
									leftContent={<div>인원 {props.count} /</div>}
									rightContent={<div>명</div>}
								/>

								<div css={inputItemWrapperCSS} onClick={detailCustomizeModal.open}>
									<div css={powerCertWrapperCSS}>
									{certCount !== 0 ? <React.Fragment>{renderCertSub}</React.Fragment> : "자격증 설정"}
									<span
										css={css`
											color: rgba(0, 0, 0, 0.5);
											margin-left: 8px;
											margin-right: 8px;
										`}
									>
										|
									</span>{" "}
									{powerCount !== 0 ? <React.Fragment>{renderPowerSub}</React.Fragment> : "권한 설정"}
									</div>
									
								</div>

							</div>

							<div css={ButtonWrapperCSS}>
								{props.closeHandler ? 
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
											props.closeHandler && props.closeHandler()
										}}
									/> : <Button
									text={"삭제"}
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
										deleteModal.open()
									}}
								/>
								}
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
										handler.submitHandler()
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
	z-index: 9999;
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

const powerCertWrapperCSS = css`
	white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
	max-width: 500px;
`

export default GovJobItem
