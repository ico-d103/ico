import React, { useRef, useEffect } from "react"
import styles from "./Notification.module.css"
import { stackNotification } from "@/store/store"
import { useAtom } from "jotai"

const Notification = (props: any) => {
	const indicatorRef = useRef<HTMLDivElement>(null)
	const popUpRef = useRef<HTMLDivElement>(null)
	const contentWrapperRef = useRef<HTMLDivElement>(null)
	const [stackNotificationAtom, setStackNotificationAtom] = useAtom(stackNotification)
	const duration = props.duration

	useEffect(() => {
		if (indicatorRef.current) {
			indicatorRef.current.style.transitionProperty = "width"
			indicatorRef.current.style.transitionDuration = `${props.duration / 1000}s`
		}

		if (popUpRef.current && contentWrapperRef.current) {
			popUpRef.current.style.height = "0px"
			if (document.body.offsetWidth > 480) {
				popUpRef.current.style.width = `${props.width + 40}px`
				contentWrapperRef.current.style.width = `${props.width}px`
			} else {
				popUpRef.current.style.width = `90vw`
				contentWrapperRef.current.style.width = `90vw`
			}

			contentWrapperRef.current.style.height = `${props.height}px`
			if (document.body.offsetWidth > 480) {
				popUpRef.current.style.right = `-${props.width + 20}px`
			} else {
				popUpRef.current.style.right = `-90vw`
			}

			popUpRef.current.style.transitionProperty = "right top height"
			popUpRef.current.style.transitionDuration = `0.3s`
		}

		setTimeout(function () {
			if (popUpRef.current) {
				popUpRef.current.style.height = `${props.height + 20}px`
			}
		}, 100)
		setTimeout(function () {
			if (popUpRef.current && indicatorRef.current) {
				indicatorRef.current.style.width = "0px"

				if (document.body.offsetWidth > 480) {
					popUpRef.current.style.right = `0px`
				} else {
					popUpRef.current.style.right = `5vw`
				}
			}
		}, 400)
		setTimeout(function () {
			if (popUpRef.current) {
				if (document.body.offsetWidth > 480) {
					popUpRef.current.style.right = `-${props.width + 20}px`
				} else {
					popUpRef.current.style.right = `-90vw`
				}
			}
		}, duration + 300)
		setTimeout(function () {
			// if (props.passToFixed === true) {
			//     alert('fawe')
			//     dispatch(notificationSliceActions.fixedPush(JSON.stringify(props.id)))
			// }
			if (popUpRef.current) {
				popUpRef.current.style.height = "0px"
			}
		}, duration + 600)
		setTimeout(function () {
			// const temp = {...stackNotificationAtom}

			setStackNotificationAtom((prev) => {
				delete prev[props.id]
				return { ...prev }
			})
		}, duration + 900)
	}, [])

	const notiHandler = () => {
		if (popUpRef.current) {
			if (document.body.offsetWidth > 480) {
				popUpRef.current.style.right = `-${props.width + 20}px`
			} else {
				popUpRef.current.style.right = `-90vw`
			}
		}

		setTimeout(function () {
			if (popUpRef.current) {
				popUpRef.current.style.height = "0px"
			}
		}, 300)
		// setTimeout(function() {
		//     dispatch(notificationSliceActions.delete(JSON.stringify(props.id)))
		// }, 600);
	}

	return (
		<div ref={popUpRef} onClick={() => notiHandler()} className={styles["pop-up"]}>
			<div ref={contentWrapperRef} className={styles["content-wrapper"]}>
				<div className={styles["content"]}>{props.content}</div>
				<div ref={indicatorRef} className={styles["indicator"]} />
			</div>
		</div>
	)
}

export default Notification
