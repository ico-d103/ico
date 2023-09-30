
import React, {useEffect} from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import Input from "@/components/common/Input/Input"
import { removeCookie } from "@/api/cookie"
import useGetTokenStatus from "@/hooks/useGetTokenStatus"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import { deleteImmigrationAPI } from "@/api/student/user/deleteImmigrationAPI"
import { getTokenStatusAPI } from "@/api/common/getTokenStatusAPI"
import { postStudentTokenUpdateAPI } from "@/api/student/user/postStudentTokenUpdateAPI"
import { useRouter } from "next/router"

type FirstPhasePropsType = {

}

function Check({  }: FirstPhasePropsType) {
	const [getTokenStatus, setTokenStatus] = useGetTokenStatus()
	const noti = useNotification()
	const router = useRouter()

	const signoutHandler = () => {
		removeCookie("Authorization", { path: "/" })
		setTokenStatus({ showMessage: false }).then((res) => {})
		// navigate("/teacher/login")
	}

	const deleteImmigrationHandler = () => {
		deleteImmigrationAPI({}).then((res) => {
			setTokenStatus({ showMessage: false })
		})
	}

	const refreshToken = async () => {
		getTokenStatusAPI().then((res) => {
			if (res.status == "require_refresh_token") {
				postStudentTokenUpdateAPI().then((res) => {
					setTokenStatus({ showMessage: false }).then((res) => {
						// console.log("여기에 할일")
					})
					// router.push("/student/home")
				})
			} else {
				noti({
					content: <NotiTemplate type={"alert"} content={`선생님께서 곧 확인할거예요!`} />,
					duration: 3000,
				})
			}
		})
	}

	useEffect(() => {
		getTokenStatusAPI().then((res) => {
			if (res.role == "STUDENT") {
				if (res.status == "require_submit_code") {
					router.push("/student/enter")
				}

				if (res.status == "approved") {
					router.push("/student/home")
				}
			}
		})
	}, [])





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
						<span>선생님이 승인할 때까지 기다려 주세요!</span>
					</div>

			
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
							text={"다시 입력"}
							fontSize={`14px`}
							width={"128px"}
							height={"48px"}
							theme={"mobileCancel"}
							onClick={deleteImmigrationHandler}
						/>
						<Button
							text={"입장하기!"}
							fontSize={`14px`}
							width={"128px"}
							height={"48px"}
							theme={"mobileNormal"}
							onClick={refreshToken}
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

export default Check
