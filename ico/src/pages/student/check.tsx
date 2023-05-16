import { useState, useEffect, useRef } from "react"
import { css } from "@emotion/react"
import { postStudentTokenUpdateAPI } from "@/api/student/user/postStudentTokenUpdateAPI"
import { setCookie } from "@/api/cookie"
import { useRouter } from "next/router"
import { getTokenStatusAPI } from "@/api/common/getTokenStatusAPI"
import Button from "@/components/common/Button/Button"
import LoadImage from "@/components/common/LoadImage/LoadImage"

import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

function enter() {
	const router = useRouter()
	const noti = useNotification()

	const refreshToken = async () => {
		getTokenStatusAPI().then((res) => {
			if (res.status == "require_refresh_token") {
				postStudentTokenUpdateAPI().then((res) => {
					router.push("/student/home")
				})
			} else {
				noti({
					content: <NotiTemplate type={"alert"} content={`선생님께서 확인 중이에요.`} />,
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

				// if (res.status == "waiting") {
				// 	router.push("/student/check")
				// }

				// if (res.status == "require_refresh_token") {
				// 	router.push("/student/check")
				// }

				if (res.status == "approved") {
					router.push("/student/home")
				}
			}
		})
	}, [])

	return (
		<div css={checkWrapperCSS}>
			<LoadImage src={"/assets/check/check_image.png"} alt={"check_image"} wrapperCss={imageWrapper} dev={false} />

			<div
				css={css`
					margin-top: 5px;
					font-weight: 700;
					font-size: 5.5vw;

					margin-bottom: 10vh;
				`}
			>
				입국 심사를 통과할 때까지 기다려주세요.
			</div>

			<Button
				text={"우리반으로 이동!"}
				fontSize={`5vw`}
				width={"70vw"}
				height={"70vw"}
				theme={"mobileRadial"}
				onClick={refreshToken}
			></Button>
		</div>
	)
}

const checkWrapperCSS = css`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const imageWrapper = css`
	width: 200%;
	height: 125vw;
	overflow: visible;
`

export default enter
