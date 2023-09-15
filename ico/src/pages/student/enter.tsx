import HorizontalContainer from "@/components/common/HorizontalContainer/HorizontalContainer"
import FirstPhase from "@/components/student/Signup/Enter/FirstPhase"
import React, { useState } from "react"
import { css } from "@emotion/react"
import SecondPhase from "@/components/student/Signup/Enter/SecondPhase"
import { postImmigrationAPI } from "@/api/student/user/postImmigrationAPI"
import useGetTokenStatus from "@/hooks/useGetTokenStatus"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

function enter() {
	const [phase, setPhase] = useState(0)
	const [code, setCode] = useState("")
	const [number, setNumber] = useState("")
	const [getTokenStatus, setTokenStatus] = useGetTokenStatus()
	const noti = useNotification()

	const submitHandler = async () => {
		postImmigrationAPI({
			body: {
				code,
				number: Number(number),
			},
		})
			.then((res) => {
				setTokenStatus({ showMessage: false })
				noti({
					content: <NotiTemplate type={"ok"} content={"선생님이 곧 확인할거예요!"} />,
					duration: 5000,
					id: "enter-alert",
				})
			})
			.catch((error) => {
				console.log(error)
				noti({
					content: <NotiTemplate type={"ok"} content={error.response.data.message} />,
					duration: 5000,
					id: "enter-alert",
				})
			})
	}

	return (
		<div css={wrapperCSS}>
			<HorizontalContainer phase={phase}>
				<HorizontalContainer.Step>
					<FirstPhase setPhase={setPhase} number={number} setNumber={setNumber} />
				</HorizontalContainer.Step>
				<HorizontalContainer.Step>
					<SecondPhase setPhase={setPhase} code={code} setCode={setCode} submitHandler={submitHandler} />
				</HorizontalContainer.Step>
			</HorizontalContainer>
		</div>
	)
}

const wrapperCSS = css`
	width: 100%;
	height: 100%;
	max-height: 100%;
	overflow: hidden;
`

export default enter
