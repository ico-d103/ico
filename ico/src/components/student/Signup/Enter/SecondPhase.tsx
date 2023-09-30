
import React, { useEffect } from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import Input from "@/components/common/Input/Input"
import { removeCookie } from "@/api/cookie"
import useGetTokenStatus from "@/hooks/useGetTokenStatus"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

type FirstPhasePropsType = {
	setPhase: React.Dispatch<React.SetStateAction<number>>
	code: string
	setCode: React.Dispatch<React.SetStateAction<string>>
	submitHandler: () => void
}

function SecondPhase({ setPhase, code, setCode, submitHandler }: FirstPhasePropsType) {
	const [getTokenStatus, setTokenStatus] = useGetTokenStatus()
	const noti = useNotification()

	const signoutHandler = () => {
		removeCookie("Authorization", { path: "/" })
		setTokenStatus({ showMessage: false }).then((res) => {})
		// navigate("/teacher/login")
	}

	const goBackHandler = () => {
		setPhase(() => 0)
	}

	const inputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (e.target.value.length <= 5) {
			setCode(() => e.target.value)
		}
	}

	useEffect(() => {
		const filteredValue = code.toUpperCase().replace(/[^A-Z0-9]/g, "")
		if (code.length !== filteredValue.length) {
			noti({
				content: <NotiTemplate type={"alert"} content={"영어와 숫자만 입력할 수 있어요!"} />,
				duration: 5000,
				id: "enter-alert",
			})
		}
		setCode(() => filteredValue)
	}, [code])

	return (
		<div
			css={css`
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
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
						<span>2. 선생님이 알려주신 <span css={css`font-weight: 700;`}>국가 코드</span>를 입력해 주세요.</span>
					</div>

					<Input
						placeholder="ABC12"
						theme={"studentEnter"}
						customCss={css`
							width: 260px;
						`}
						value={code}
						onChange={inputHandler}
					/>
					<div css={buttonWrapperCSS}>
						<Button
							text={"이전으로!"}
							fontSize={`14px`}
							width={"128px"}
							height={"48px"}
							theme={"mobileCancel"}
							onClick={goBackHandler}
						/>
						<Button
							text={"반 입장!"}
							fontSize={`14px`}
							width={"128px"}
							height={"48px"}
							theme={"mobileNormal"}
							onClick={submitHandler}
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

export default SecondPhase
