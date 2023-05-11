import React, { useEffect } from "react"
// import { notificationSliceActions } from "../../../redux/notificationSlice";

// import { useSelector, useDispatch } from "react-redux";

import { stackNotification } from "@/store/store"
import { useAtom } from "jotai"

const useNotification = () => {
	const [stackNotificationAtom, setStackNotificationAtom] = useAtom(stackNotification)

	const notiDelieverer = ({
		content,
		duration,
		width = '350px',
		height = '100px',
	}: {
		content: any
		duration: number
		width?: string
		height?: string
	}) => {
		let key =
			Object.keys(stackNotificationAtom).length !== 0
				? parseInt(Object.keys(stackNotificationAtom)[Object.keys(stackNotificationAtom).length - 1]) + 1
				: 0

		const value = {
			content: content,
			duration: duration,
			width: width,
			height: height,
			// passToFixed: props.passToFixed ? props.passToFixed : false,
		}

		setStackNotificationAtom((prev) => {
			return { ...prev, [key]: value }
		})
	}

	return notiDelieverer
	// return (
	//   <React.Fragment>

	//   </React.Fragment>
	// )
}

export default useNotification
