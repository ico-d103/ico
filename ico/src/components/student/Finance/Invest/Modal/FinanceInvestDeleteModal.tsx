import React, { useState } from "react"
import Input from "@/components/common/Input/Input"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import { deleteFinanceInvestAPI } from "@/api/student/finance/deleteFinanceInvestAPI"
import useNotification from "@/hooks/useNotification"
import UseAnimations from "react-useanimations"
import alertTriangle from "react-useanimations/lib/alertTriangle"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

const ALERT_ICON = (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M12 8V12M12 16H12.01M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
			stroke="#D94A4A"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

const CHECK_ICON = (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M9 11L12 14L22 4M16 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V12"
			stroke="#0066FF"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

type FinanceInvestDeleteModalProps = {
	diff: number
	closeComp: Function
	refetch: Function
}

function FinanceInvestDeleteModal({diff, closeComp, refetch }: FinanceInvestDeleteModalProps) {
	const noti = useNotification()
	const [value, setValue] = useState<number>(0)



	const submitHandler = () => {
		deleteFinanceInvestAPI({}).then((res) => {
			refetch()
			noti({content: <NotiTemplate type={'ok'} content="투자 매도에 성공했어요!"/>, width: '300px', height: '120px', duration: 3000})
			closeComp()
		})
		.catch((err) => {
			console.log(err)
			noti({content: <NotiTemplate type={'alert'} content="투자 매도에 실패했어요!"/>, width: '300px', height: '120px', duration: 3000})
		})
	}
	return (
		<div css={wrapperCSS}>
			
			{diff < 0 && <div css={mentWrapperCSS}>
				<div css={iconWrapperCSS}>{ALERT_ICON}</div>

				<span css={mentCSS}>이번에 매도하면 손해를 보게 되요!</span>
			</div>}

			{diff > 0 && <div css={mentWrapperCSS}>
				<div css={iconWrapperCSS}>{CHECK_ICON}</div>

				<span css={mentCSS}>이번에 매도하면 수익을 얻을 수 있어요!</span>
			</div>}

			
			

			<div css={mentWrapperCSS}>
				<div css={iconWrapperCSS}>{ALERT_ICON}</div>

				<span css={mentCSS}>하루에 한번만 매도/매수할 수 있어요!</span>
			</div>

			<div css={buttonWrapperCSS}>
				<Button
					text={"매도"}
					fontSize={"var(--student-h3)"}
					width={"47%"}
					theme={diff > 0 ? "positive" : "warning"}
					onClick={() => {
						submitHandler()
					}}
				/>
				<Button
					text={"취소"}
					fontSize={"var(--student-h3)"}
					width={"47%"}
					theme={"cancelDark"}
					onClick={() => {
						closeComp()
					}}
				/>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	width: 100%;
`

const grayLabelCSS = css`
	color: rgba(0, 0, 0, 0.6);
	font-size: var(--student-h3);
	margin-bottom: 8px;
`

const inputCSS = css`
	width: 100%;
	margin-bottom: 12px;
`

const mentWrapperCSS = css`
	display: flex;
	margin-bottom: 12px;
`

const iconWrapperCSS = css`
	/* height: 100%; */
	/* background-color: red; */
	/* margin-top: 4px; */
`

const mentCSS = css`
	font-size: 14px;
	margin-left: 8px;
	height: 24px;
	margin-top: 4px;
	line-height: 130%;
`

const buttonWrapperCSS = css`
	margin-top: 24px;
	display: flex;
	justify-content: space-between;
`

const balanceLabelCSS = css`
	/* width: 200px; */
	color: rgba(0, 20, 50, 0.6);
	margin-right: 8px;
	white-space: nowrap;
`

export default FinanceInvestDeleteModal
