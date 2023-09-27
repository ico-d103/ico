
import React from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import Input from "@/components/common/Input/Input"
import { removeCookie } from "@/api/cookie"
import useGetTokenStatus from "@/hooks/useGetTokenStatus"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

type FirstPhasePropsType = {
	setPhase: React.Dispatch<React.SetStateAction<number>>
	number: string
	setNumber: React.Dispatch<React.SetStateAction<string>>
}

function FirstPhase({ setPhase, number, setNumber }: FirstPhasePropsType) {
	const [getTokenStatus, setTokenStatus] = useGetTokenStatus()
	const noti = useNotification()

	const signoutHandler = () => {
		removeCookie("Authorization", { path: "/" })
		setTokenStatus({ showMessage: false }).then((res) => {})
		// navigate("/teacher/login")
	}

	const passFirstPhaseHandler = () => {
		if (number) {
			setPhase(() => 1)
		} else {
			noti({
				content: <NotiTemplate type={"alert"} content={"번호를 입력해 주세요!"} />,
				duration: 5000,
				id: "enter-alert",
			})
		}
	}

	const inputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (!Object.is(Number(e.target.value), NaN) && e.target.value.length <= 2) {
			setNumber(() => e.target.value)
		} else {
			noti({
				content: <NotiTemplate type={"alert"} content={"숫자 두 자리까지만 입력할 수 있어요!"} />,
				duration: 5000,
				id: "enter-alert",
			})
		}
	}

	return (
		<div
			css={css`
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				overflow: hidden;
			`}
		>
			<div css={imageWrapperCSS}>
				<img src={"/assets/enter/enter_image.png"} alt={"signup_illust"} css={imageCSS} />
			</div>

			<div css={WrapperCSS}>
				<div css={innerWrapperCSS}>
					<div
						css={css`
							display: flex;
							flex-direction: column;
							gap: 16px;
							align-items: center;
						`}
					>
						<div
							css={css`
								margin-top: 12px;
								font-weight: 700;
								font-size: 36px;
							`}
						>
							반 입장
						</div>
						<span>1. <span css={css`font-weight: 700;`}>반에서의 번호</span>를 입력해 주세요.</span>
					</div>

					<Input
						placeholder="#"
						theme={"studentEnter"}
						customCss={css`
							width: 84px;
						`}
						type={"number"}
						value={number}
						onChange={inputHandler}
					/>
					<div css={buttonWrapperCSS}>
						<Button
							text={"로그아웃"}
							fontSize={`14px`}
							width={"128px"}
							height={"48px"}
							theme={"mobileCancel"}
							onClick={signoutHandler}
						/>
						<Button
							text={"다음으로!"}
							fontSize={`14px`}
							width={"128px"}
							height={"48px"}
							theme={"mobileNormal"}
							onClick={passFirstPhaseHandler}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

const WrapperCSS = css`
	flex: 1;
	display: grid;
	/* padding-bottom: 36px; */
`

const innerWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	gap: 24px;
	padding: 24px;
	box-sizing: border-box;
`

const imageWrapperCSS = css`
	@media (max-width: 768px) {
		width: 300%;
		height: 50vh;
	}

	@media (min-width: 769px) {
		width: 70%;
	}

	/* margin-top: 16px; */
	/* height: auto; */
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`

const imageCSS = css`
	@media (max-width: 768px) {
		height: 100%;
		object-fit: cover;
	}

	@media (min-width: 769px) {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
`

const buttonWrapperCSS = css`
	display: flex;
	gap: 16px;
`

export default FirstPhase
