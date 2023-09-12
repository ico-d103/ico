import { useState, useEffect, useRef } from "react"
import { css } from "@emotion/react"
import { postStudentTokenUpdateAPI } from "@/api/student/user/postStudentTokenUpdateAPI"
import { removeCookie, setCookie } from "@/api/cookie"
import { useRouter } from "next/router"
import { getTokenStatusAPI } from "@/api/common/getTokenStatusAPI"
import Button from "@/components/common/Button/Button"
import LoadImage from "@/components/common/LoadImage/LoadImage"

import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import useGetTokenStatus from "@/hooks/useGetTokenStatus"
import { deleteImmigrationAPI } from "@/api/student/user/deleteImmigrationAPI"

function enter() {
	const router = useRouter()
	const noti = useNotification()
	const [getTokenStatus, setTokenStatus] = useGetTokenStatus()

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

	const signoutHandler = () => {
		removeCookie("Authorization", { path: "/" })
		setTokenStatus({ showMessage: false }).then((res) => {
			// console.log("여기에 할일")
		})
		// navigate("/teacher/login")
	}

	const deleteImmigrationHandler = () => {
		deleteImmigrationAPI({}).then((res) => {
			setTokenStatus({ showMessage: false })
		})
	}

	return (
		<div css={checkWrapperCSS}>
			<div css={logoutWrapperCSS}>
				<div onClick={signoutHandler}>로그아웃</div>
			</div>
			<LoadImage src={"/assets/check/check_image_1.png"} alt={"check_image"} wrapperCss={imageWrapper} dev={false} />

			<div
				css={css`
					/* margin-top: 24px; */
					font-weight: 700;
					font-size: 5.5vw;

					/* margin-bottom: 24px; */
				`}
			>
				입국 심사를 통과할 때까지 기다려주세요.
			</div>

			{/* <Button
				text={"우리반으로 이동!"}
				fontSize={`5vw`}
				width={"70vw"}
				height={"70vw"}
				theme={"mobileRadial"}
				onClick={refreshToken}
				cssProps={css`
					margin-bottom: 36px;
				`}
			></Button> */}
			<div css={radialButtonOuterCSS} onClick={refreshToken}>
				<div css={radialButtonInner1CSS}></div>
				<div css={radialButtonInner2CSS}></div>
				<div css={radialButtonLabelCSS}>입장</div>
			</div>

			<div onClick={deleteImmigrationHandler} css={delImmiCSS}>
				코드 다시 입력하기
			</div>
		</div>
	)
}

const checkWrapperCSS = css`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	flex: 1;
`

const imageWrapper = css`
	width: 200%;
	height: 80vw;
	overflow: visible;
`

const logoutWrapperCSS = css`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	padding: 16px;
	position: absolute;
	z-index: 200;
`

const radialButtonOuterCSS = css`
	border: none;
	border-radius: 100%;

	position: relative;

	width: 70vw;
	height: 70vw;

	background: linear-gradient(90deg, #7080fa, #40fef1);
`

const radialButtonInner1CSS = css`
	border: none;
	border-radius: 100%;
	color: #3d2f21;

	animation-name: first;
	animation-duration: 2s;
	animation-iteration-count: infinite;
	/* animation-delay: 0s, 0.3s; */
	animation-direction: alternate;
	position: absolute;

	width: 100%;
	height: 100%;

	background: linear-gradient(180deg, #fa709a, #fee140);
	@keyframes first {
		from {
			opacity: 100%;
		}

		to {
			opacity: 0%;
			/* box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.5); */
		}
	}
`

const radialButtonInner2CSS = css`
	border: none;
	border-radius: 100%;
	color: #3d2f21;

	animation-name: first;
	animation-duration: 2s;
	animation-delay: 2s;
	animation-iteration-count: infinite;
	/* animation-delay: 0s, 0.3s; */
	animation-direction: alternate;
	position: absolute;

	width: 100%;
	height: 100%;

	background: linear-gradient(270deg, #70fa8c, #f8fe40);
	@keyframes first {
		from {
			opacity: 100%;
		}

		to {
			opacity: 0%;
			/* box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.5); */
		}
	}
`

const radialButtonLabelCSS = css`
	position: absolute;
	z-index: 10;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 25vw;
	font-weight: 500;
	opacity: 100%;

	border-radius: 100%;
	overflow: hidden;
	color: white;
	/* text-shadow: 2px 2px 2px gray; */
`

const delImmiCSS = css`
	color: rgba(0, 0, 0, 0.6);
	font-size: var(--student-h3);
`

export default enter
