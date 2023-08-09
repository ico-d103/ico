import React, { useEffect, useRef } from "react"
// import { notificationSliceActions } from "../../../redux/notificationSlice";

// import { useSelector, useDispatch } from "react-redux";

import { stackNotification } from "@/store/store"
import { useAtom } from "jotai"


const useNotification = () => {
	const [stackNotificationAtom, setStackNotificationAtom] = useAtom(stackNotification)

	const notiDelieverer = ({
		content,
		duration,
		id,
		width = '350px',
		height = '100px',
	}: {
		content: any
		duration: number
		id?: string
		width?: string
		height?: string
	}) => {
		let key =
			Object.keys(stackNotificationAtom).length !== 0
				? parseInt(Object.keys(stackNotificationAtom)[Object.keys(stackNotificationAtom).length - 1]) + 1
				: 0
		
		if (id) {
			let strKey = ""
			for (let i = 0; i < id.length; i++) {
				const asc = id.charCodeAt(i)
				strKey += asc
			}
			key = Number(strKey)
		}
		
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
