import React from "react"
import ReactDOM from "react-dom"
import styles from "./StackNotification.module.css"
import Notification from "./Notification"
import Portal from "../Portal/Portal"
import { stackNotification } from "@/store/store"
import { useAtom } from "jotai"
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
				width={stackNotificationAtom[numKey].width ? stackNotificationAtom[numKey].width : 320}
				height={stackNotificationAtom[numKey].height ? stackNotificationAtom[numKey].height : 150}
				content={stackNotificationAtom[numKey].content}
				duration={stackNotificationAtom[numKey].duration ? stackNotificationAtom[numKey].duration : 3000}
				state={stackNotificationAtom}
			/>
		)
	})

	return (
		<div className={styles["backdrop"]}>
			<div className={styles["notification-place"]}>{notiProcessor}</div>
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

export default StackNotification
