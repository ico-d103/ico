import React from "react"
import ModalContent from "./ModalContent"
import { css } from "@emotion/react"
import UseAnimations from "react-useanimations"
import alertTriangle from "react-useanimations/lib/alertTriangle"
import Button from "../Button/Button"

type ModalAlertProps = {
	content: string[]
	width: string
	title: string
	titleSize: string
	proceed: any
	closeComp?: Function
	forChild?: boolean
}

function ModalAlert({ content, proceed, closeComp, width, title, titleSize, forChild }: ModalAlertProps) {
	const ICON = (
		<div
			css={css`
				margin-bottom: -16px;
			`}
		>
			<UseAnimations animation={alertTriangle} size={128} />
		</div>
	)

	const CONTENT: JSX.Element = (
		<div css={contentWrapperCSS}>
			주의 : 이 과정은 되돌릴 수 없습니다!
			<div css={messageWrapperCSS}>
				{content.map((el, idx) => {
					return (
						<div css={mentWrapperCSS} key={idx}>
							<div>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M12 8V12M12 16H12.01M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
										stroke="#D94A4A"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<span css={mentCSS}>{el}</span>
						</div>
					)
				})}
			</div>
			<div css={buttonWrapperCSS}>
				<Button
					text={"확인"}
					fontSize={"var(--student-h3)"}
					width={"40%"}
					theme={forChild ? "mobileWarning" : "warning"}
					onClick={() => {
						proceed && proceed()
						closeComp && closeComp()
					}}
					margin={"0px 16px 0px 0px"}
				/>
				<Button
					text={"취소"}
					fontSize={"var(--student-h3)"}
					width={"40%"}
					theme={forChild ? "mobileCancel" : "cancelDark"}
					onClick={() => {
						closeComp && closeComp()
					}}
				/>
			</div>
		</div>
	)

	return (
		<ModalContent title={title} titleSize={titleSize} width={width} icon={ICON} content={CONTENT} forChild={forChild} />
	)
}

const contentWrapperCSS = css`
	width: 100%;
`

const mentWrapperCSS = css`
	display: flex;
`
const mentCSS = css`
	font-size: 14px;
	margin-left: 8px;
	height: 24px;
	margin-top: 4px;
	line-height: 130%;
`

const messageWrapperCSS = css`
	margin-top: 8px;
	margin-bottom: 24px;
`

const buttonWrapperCSS = css`
	display: flex;
	justify-content: center;
	width: 100%;
`
export default ModalAlert
