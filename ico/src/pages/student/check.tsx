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
import Check from "@/components/student/Signup/Enter/Check"

function enter() {
	const router = useRouter()
	const noti = useNotification()
	const [getTokenStatus, setTokenStatus] = useGetTokenStatus()

	return (
		<div css={checkWrapperCSS}>
			<Check />
		</div>
	)
}

const checkWrapperCSS = css`
	width: 100%;
	height: 100%;
	display: grid;
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
