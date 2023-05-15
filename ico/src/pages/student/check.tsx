import { useState, useEffect, useRef } from "react"
import { css } from "@emotion/react"
import { postStudentTokenUpdateAPI } from "@/api/student/user/postStudentTokenUpdateAPI"
import { setCookie } from "@/api/cookie"
import { useRouter } from "next/router"
import { getTokenStatusAPI } from "@/api/common/getTokenStatusAPI"
import Button from "@/components/common/Button/Button"
import LoadImage from "@/components/common/LoadImage/LoadImage"

function enter() {
	const router = useRouter()

	const refreshToken = async () => {
		getTokenStatusAPI().then((res) => {
			if (res.status == "check ") {
				postStudentTokenUpdateAPI().then((res) => {
					router.push("/studnet/home")
				})
			} else {
				;("선생님께서 확인 중이에요")
			}
		})

		postStudentTokenUpdateAPI().then((res) => {
			console.log(res)
			router.push("/student/home")
		})
	}

	useEffect(() => {
		getTokenStatusAPI().then((res) => {
			// console.log(res.status)

			if (res.role == "STUDENT") {
				if (res.status == "require_submit_code") {
					router.push("/student/enter")
				}

				if (res.status == "waiting") {
					router.push("/student/check")
				}

				if (res.status == "require_refresh_token") {
					router.push("/student/check")
				}

				if (res.status == "approved") {
					router.push("/student/home")
				}
			}
		})
	}, [])

	return (
		<div css={checkWrapperCSS}>
			<LoadImage src={"/assets/check/check_image.png"} alt={"check_image"} wrapperCss={imageWrapper} dev={false} />

			<div>
				<Button
					text={"우리반으로!"}
					fontSize={`5vw`}
					width={"90vw"}
					height={"15vw"}
					theme={"mobileNormal"}
					onClick={refreshToken}
				></Button>
			</div>

			<div>우리반으로 버튼이 눌러지지 않는다면..?</div>
			<div>아직 선생님께서 확인하시는 중이에요!</div>
			<div>조금만 기다려주세요.</div>
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
	height: 75vw;
`

export default enter
