import React, { useRef, useEffect } from "react"
import styles from "./Notification.module.css"
import { stackNotification } from "@/store/store"
import { useAtom } from "jotai"
import { css } from "@emotion/react"




const Notification = (props: any) => {
	const indicatorRef = useRef<HTMLDivElement>(null)
	const popUpRef = useRef<HTMLDivElement>(null)
	const contentWrapperRef = useRef<HTMLDivElement>(null)
	const [stackNotificationAtom, setStackNotificationAtom] = useAtom(stackNotification)
	const duration = props.duration


	useEffect(() => {
		// if (indicatorRef.current) {
		// 	indicatorRef.current.style.transitionProperty = "width"
		// 	indicatorRef.current.style.transitionDuration = `${props.duration / 1000}s`
		// }

		// if (popUpRef.current && contentWrapperRef.current) {
		// 	popUpRef.current.style.height = "0px"
		// 	if (document.body.offsetWidth > 480) {
		// 		popUpRef.current.style.width = `${props.width + 40}px`
		// 		contentWrapperRef.current.style.width = `${props.width}px`
		// 	} else {
		// 		popUpRef.current.style.width = `90vw`
		// 		contentWrapperRef.current.style.width = `90vw`
		// 	}

		// 	contentWrapperRef.current.style.height = `${props.height}px`
		// 	if (document.body.offsetWidth > 480) {
		// 		popUpRef.current.style.right = `-${props.width + 20}px`
		// 	} else {
		// 		popUpRef.current.style.right = `-90vw`
		// 	}

		// 	popUpRef.current.style.transitionProperty = "right top height"
		// 	popUpRef.current.style.transitionDuration = `0.3s`
		// }

		// setTimeout(function () {
		// 	if (popUpRef.current) {
		// 		popUpRef.current.style.height = `${props.height + 20}px`
		// 	}
		// }, 100)
		// setTimeout(function () {
		// 	if (popUpRef.current && indicatorRef.current) {
		// 		indicatorRef.current.style.width = "0px"

		// 		if (document.body.offsetWidth > 480) {
		// 			popUpRef.current.style.right = `0px`
		// 		} else {
		// 			popUpRef.current.style.right = `5vw`
		// 		}
		// 	}
		// }, 400)
		// setTimeout(function () {
		// 	if (popUpRef.current) {
		// 		if (document.body.offsetWidth > 480) {
		// 			popUpRef.current.style.right = `-${props.width + 20}px`
		// 		} else {
		// 			popUpRef.current.style.right = `-90vw`
		// 		}
		// 	}
		// }, duration + 300)
		// setTimeout(function () {
		// 	// if (props.passToFixed === true) {
		// 	//     alert('fawe')
		// 	//     dispatch(notificationSliceActions.fixedPush(JSON.stringify(props.id)))
		// 	// }
		// 	if (popUpRef.current) {
		// 		popUpRef.current.style.height = "0px"
		// 	}
		// }, duration + 600)






		setTimeout(function () {
			// const temp = {...stackNotificationAtom}

			setStackNotificationAtom((prev) => {
				delete prev[props.id]
				return { ...prev }
			})
		}, duration + 900)
	}, [])

	const notiHandler = () => {
		
	}

	return (
		<div ref={popUpRef} onClick={() => notiHandler()} css={initCSS({width: props.width, height: props.height, duration: props.duration})}>
			<div ref={contentWrapperRef}  className={`content-wrapper`} css={contentWrapperCSS}>
				<div css={contentCSS}>{props.content}</div>
				<div ref={indicatorRef}  css={indicatorCSS({duration})}/>
			</div>
		</div>
	)
}

const initCSS = ({width, height, duration}: {width: number, height: number, duration: number}) => {
  return css`

position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* display: flex;
  justify-content: center; */
  /* background-color: red; */

  @media (max-width: 480px) {
    width: 100vw;
    height: calc(${height} + 20px);
    

    & .content-wrapper {
      width: 90vw;
      height: ${height};
    }


    transform: translate(100vw, 0px);
		animation-fill-mode: forwards;
    animation-name: step1, step2, step3;
    animation-delay: 0s, ${duration}ms, ${duration + 300}ms;
    animation-duration: 0.3s, 0.3s, 0.3s;
    @keyframes step1 {
      from {
        transform: translate(100vw, 0px);
        
      }

      to {
        transform: translate(0px, 0px);
        
      }
    }

    @keyframes step2 {
      from {
        transform: translate(0px, 0px);

      }

      to {
        transform: translate(100vw, 0px);

      }
    }

    @keyframes step3 {
      from {
        height: ${height};
      }

      to {
        height: 0px;
      }
    }
	}



	@media (min-width: 481px) {
    width: calc(${width} + 40px);
    height: calc(${height} + 20px);
    

    & .content-wrapper {
      width: ${width};
      height: ${height};
    }


    transform: translate(100vw, 0px);
		animation-fill-mode: forwards;
    animation-name: step1, step2, step3;
    animation-delay: 0s, ${duration}ms, ${duration + 300}ms;
    animation-duration: 0.3s, 0.3s, 0.3s;
    @keyframes step1 {
      from {
        transform: translate(100vw, 0px);
        
      }

      to {
        transform: translate(0px, 0px);
        
      }
    }

    @keyframes step2 {
      from {
        transform: translate(0px, 0px);

      }

      to {
        transform: translate(100vw, 0px);

      }
    }

    @keyframes step3 {
      from {
        height: ${height};
      }

      to {
        height: 0px;
      }
    }
	}
    

  `
}


const contentWrapperCSS = css`
    display: flex;
  flex-direction: column;
  justify-content: end;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(30px);
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  overflow: hidden;

  @media all and (max-width: 480px) {
      max-width: 90vw;
  }
  

`

const contentCSS = css`
    height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: all;
`

const indicatorCSS = ({duration}: {duration: number}) => {
    return css`
      height: 3px;
    width: 100%;
    /* background-color: rgba(154, 76, 249, 0.7); */
    background-color: var(--teacher-highlight-color);


			animation: exec ${duration}ms ease forwards;

			@keyframes exec {
				from {
					
					width: 100%;
				}

				to {
					width: 0%;
				}
			}
  `
}
export default Notification
