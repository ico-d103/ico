import React from "react"
import { css } from "@emotion/react"
import { useQueryClient } from '@tanstack/react-query';
import { useMutation, useQuery } from "@tanstack/react-query";
import { putGovJobAPI } from "@/api/teacher/gov/putGovJobAPI";
import { postGovJobAPI } from "@/api/teacher/gov/postGovJobAPI";
import useGetNation from "@/hooks/useGetNation";


function GovJobCreate({
	subInputChangeHandler,
	inputState,
	buttons,
	count,
	closeHandler,
	idx,
}: {
	subInputChangeHandler?: any
	inputState?: any
	buttons?: any
	count?: number
	closeHandler?: Function
	idx?: number
}) {
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

	const [nation] = useGetNation()

	const queryClient = useQueryClient();
	// 직업 추가 구현시 수정해서 사용

	const createMutation = useMutation((a: number) => postGovJobAPI({body: {image: 'https://d3bkfkkihwj5ql.cloudfront.net/worker_male.png', title: inputState.title, detail: inputState.content, total: inputState.sub.total, wage: inputState.sub.wage, color: inputState.sub.backgroundColor, creditRating: inputState.sub.credit}}));
	const updateMutation = useMutation((idx: number) => putGovJobAPI({idx, body: {title: inputState.title, detail: inputState.content, total: inputState.sub.total, wage: inputState.sub.wage, color: inputState.sub.backgroundColor, creditRating: inputState.sub.credit}}));

	const submit = () => {
		if (typeof idx === 'number') {
			updateMutation.mutate(idx, {
				onSuccess: formData => {
					closeHandler && closeHandler()
				  return queryClient.invalidateQueries(["teacher", "govJob"]); // 'return' wait for invalidate
				}})
		} else {
			// 직업 추가 구현시 수정해서 사용
			createMutation.mutate(1, {
				onSuccess: formData => {
					closeHandler && closeHandler()
				  return queryClient.invalidateQueries(["teacher", "govJob"]); // 'return' wait for invalidate
				}})
		}
	}

	const creditInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (Number(event.target.value) <= 10) {
			subInputChangeHandler && subInputChangeHandler({ key: "credit", event })
		}
	}

	const wageInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (Number(event.target.value) <= 1000000) {
			subInputChangeHandler && subInputChangeHandler({ key: "wage", event })
		}
	}

	const totalInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

		
		if (Number(event.target.value) <= 100) {
			subInputChangeHandler && subInputChangeHandler({ key: "total", event })
		}
	}

	const colorPickHandler = (value: string) => {
		subInputChangeHandler && subInputChangeHandler({ key: "backgroundColor", value })
	}

	const renderColorPicker = COLOR.map((el, idx) => {
		return (
			<div
				css={colorElementCSS({ backgroundColor: el, currentColor: inputState.sub.backgroundColor })}
				onClick={() => colorPickHandler(el)}
			></div>
		)
	})

	return (
		<React.Fragment>
			<div css={secondaryInputWrapperCSS}>
				<div css={creditValueInputWrapperCSS}>
					<div css={textCSS}>신용</div>
					<input
						value={inputState?.sub.credit}
						onChange={(event) => {
							creditInputHandler(event)
						}}
						type={"number"}
						min={1}
						max={10}
						css={inputCSS}
					/>
					등급
				</div>

				<div css={wageValueInputWrapperCSS}>
					<div css={textCSS}>일급</div>
					<div css={innerWageWrapperCSS}>
						<input
							value={inputState?.sub.wage}
							onChange={(event) => {
								wageInputHandler(event)
							}}
							type={"number"}
							min={1}
							max={20}
							css={inputCSS}
						/>
						{nation.currency}
					</div>
				</div>


				<div css={totalValueInputWrapperCSS}>
					<div css={textCSS}>인원 {count && count + ' /'} </div>
					<input
						value={inputState?.sub.total}
						onChange={(event) => {
							totalInputHandler(event)
						}}
						type={"number"}
						min={1}
						max={100}
						css={inputCSS}
					/>
					명
				</div>


				<div css={currentColorWrapperCSS}>
					<div css={selectedColorElementCSS({ backgroundColor: inputState.sub.backgroundColor })}>
						<div className={'color-picker'} css={colorPickerWrapperCSS}>{renderColorPicker}</div>
					</div>
				</div>
				
			</div >
			{buttons(submit)}
		</React.Fragment>
	)
}

const secondaryInputWrapperCSS = css`
	display: flex;
`

const textCSS = css`
	/* height: 100%;
	display: flex;
	align-items: center;
	color: white;
	margin: 0px 16px 0px 16px; */
	margin: 0px 6px 0px 0px;
	color: rgba(255, 255, 255, 0.4);
`

const creditValueInputWrapperCSS = css`
	height: 40px;
	width: 120px;
	color: var(--common-back-color-2);
	display: flex;
	box-sizing: border-box;
	padding: 8px;
	justify-content: space-between;
	align-items: center;
	position: relative;
	/* background-color: rgba(255, 255, 255, 0.03); */
	border-radius: 10px;
	transition-property: background-color;
	transition-duration: 0.3s;
	margin-right: 8px;
	white-space: nowrap;
	&:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}
`

const wageValueInputWrapperCSS = css`
	height: 40px;
	width: 160px;
	color: var(--common-back-color-2);
	display: flex;
	box-sizing: border-box;
	padding: 8px;
	justify-content: space-between;
	align-items: center;
	position: relative;
	/* background-color: rgba(255, 255, 255, 0.03); */
	border-radius: 10px;
	transition-property: background-color;
	transition-duration: 0.3s;
	margin-right: 8px;
	white-space: nowrap;
	&:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}
`


const totalValueInputWrapperCSS = css`
	height: 40px;
	width: 120px;
	color: var(--common-back-color-2);
	display: flex;
	box-sizing: border-box;
	padding: 8px;
	justify-content: space-between;
	align-items: center;
	position: relative;
	/* background-color: rgba(255, 255, 255, 0.03); */
	border-radius: 10px;
	transition-property: background-color;
	transition-duration: 0.3s;
	margin-right: 24px;
	white-space: nowrap;
	&:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}
`

const innerWageWrapperCSS = css`
	flex: 1;
	display: flex;
	align-items: center;
`

const inputCSS = css`
	flex: 1;
	/* width: 100%; */
	height: 28px;
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 10px;
	border: none;
	outline: none;
	color: var(--common-back-color-2);
	text-align: right;
	margin-right: 6px;
	padding-right: 6px;
	font-size: var(--teacher-h5);
	&::-webkit-inner-spin-button {
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
	}
`

const currentColorWrapperCSS = css`
	height: 100%;
	display: flex;
	align-items: center;
`

const colorPickerWrapperCSS = css`
	transition-property: opacity;
	transition-duration: 0.3s;
	pointer-events: none;
	opacity: 0%;
	position: absolute;
	height: 100%;
	display: flex;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.5);
	backdrop-filter: blur(20px);
	border-radius: 10px;
	padding:24px 12px 24px 12px;
	box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.3);
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


const selectedColorElementCSS = ({ backgroundColor }: { backgroundColor: string; }) => {
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

		&:hover .color-picker {
			pointer-events: auto;
			opacity: 100%;
		}

		
	`
}

export default GovJobCreate
