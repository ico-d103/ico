import React from "react"
import ReactDOM from "react-dom"
import Notification from "./Notification"
import Portal from "../Portal/Portal"
import { stackNotification } from "@/store/store"
import { useAtom } from "jotai"
import { css } from "@emotion/react"
// import { useSelector } from "react-redux";

const NotificationOverlay = (props: any) => {
	const [stackNotificationAtom, setStackNotificationAtom] = useAtom(stackNotification)
	// const stack = useSelector((state) => state.notificationSlice.stack);

	const notiProcessor = Object.keys(stackNotificationAtom).map((key) => {
		const numKey = Number(key)
		console.log(stackNotificationAtom)
		return (
			<Notification
				// passToFixed={stackNotificationAtom[numKey].passToFixed}
				key={key}
				id={key}
				width={stackNotificationAtom[numKey].width ? stackNotificationAtom[numKey].width : "320px"}
				height={stackNotificationAtom[numKey].height ? stackNotificationAtom[numKey].height : "320px"}
				content={stackNotificationAtom[numKey].content}
				duration={stackNotificationAtom[numKey].duration ? stackNotificationAtom[numKey].duration : 3000}
				state={stackNotificationAtom}
			/>
		)
	})

	return (
		<div css={backdropCSS}>
			<div css={notificationPlace}>
				{notiProcessor}
			</div>
		</div>
	)
}

const StackNotification = (props: any) => {
	return (
		<React.Fragment>
			<Portal>
				<NotificationOverlay {...props} />
			</Portal>
		</React.Fragment>
	)
}

const backdropCSS = css`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 99999999999;
	pointer-events: none;
	display: flex;
	justify-content: flex-end;
`

const notificationPlace = css`
	padding-top: 10px;
	position: fixed;
	display: flex;
	flex-direction: column;
	z-index: 99999999999;
	align-items: flex-end;
	width: 100vw;
	height: 100%;
`

export default StackNotification
