import React, { useState, useEffect, useRef } from "react"
import html2canvas from "html2canvas"
import { navTo } from "@/store/store"
import { useAtom } from "jotai"
import { css } from "@emotion/react"
import { useRouter } from "next/router"
import Image from "next/image"

type TransitionWrapperProps = {
	children: any
}

function TransitionWrapper({ children }: TransitionWrapperProps) {
	const [screenshot, setScreenshot] = useState("")
	const [navToAtom, setNavToAtom] = useAtom(navTo)
	const [isTransitioning, setIsTransitioning] = useState<boolean>(false)

	const [scrollTop, setScrollTop] = useState<number>(0)
	const contentWrapperRef = useRef<HTMLDivElement>(null)
	const router = useRouter()

	const isIos = () => {
		let isIos = false
		const userPlatform = navigator.userAgent
		if (
			userPlatform !== undefined &&
			userPlatform?.length > 0 &&
			(userPlatform.indexOf("iPhone") !== -1 ||
				userPlatform.indexOf("iPad") !== -1 ||
				userPlatform.indexOf("iPod") !== -1)
		) {
			isIos = true
		}
		console.log(userPlatform, isIos)
		return isIos
	}

	useEffect(() => {
		router.beforePopState(({ url, as, options }) => {
			// if (as !== router.asPath) {
			// 	router.push(router.asPath)
			// 	setNavToAtom(() => url)
			// 	return false
			// }
			// return true
			if (isIos() !== true) {
				setNavToAtom(() => {
					return { url: url, transition: "leftToRight" }
				})
				return false
			} else {
				setNavToAtom(() => {
					return { url: url, transition: "none" }
				})
				return false
			}
		})
		return () => {
			router.beforePopState(() => true)
		}
	}, [])

	const handleScreenshot = () => {
		if (contentWrapperRef.current) {
			html2canvas(contentWrapperRef.current).then((canvas) => {
				const screenshot = canvas.toDataURL()
				setScreenshot(screenshot)
			})
		}
	}

	useEffect(() => {
		if (navToAtom.url !== "") {
			setScrollTop(() => window.scrollY)
			handleScreenshot()
		}
	}, [navToAtom.url])

	useEffect(() => {
		if (screenshot !== "") {
			router.push(navToAtom.url)
			setIsTransitioning(() => true)
			setTimeout(() => {
				setIsTransitioning(() => false)
				setNavToAtom(() => {
					return { url: "", transition: "" }
				})
			}, 300)
		}
	}, [screenshot])

	return (
		<div>
			<div className={"before-wrapper"} css={imgWrapperCSS}>
				{isTransitioning && <img css={imgCSS({ scrollTop })} src={screenshot} alt="screenshot" />}
			</div>
			<div
				ref={contentWrapperRef}
				className={"content-outer-wrapper"}
				css={[
					contentOuterWrapperCSS({ isTransitioning }),
					isTransitioning ? transitionsCSS({ isTransitioning })[navToAtom.transition] : null,
				]}
			>
				<div
					css={contentInnerWrapperCSS({ isTransitioning })}
					className={`content-wrapper ${isTransitioning ? "transitioning" : ""}`}
				>
					{children}
				</div>
			</div>
		</div>
	)
}

const imgWrapperCSS = css`
	width: 100vw;
	height: 100vh;
	position: absolute;
	z-index: -1;
	overflow: hidden;
`

const imgCSS = ({ scrollTop }: { scrollTop: number }) => {
	return css`
		/* width: 100vw;
        height: 100vh; */
		width: 100%;
		height: auto;
		transform: translate(0, -${scrollTop}px);
	`
}

const contentOuterWrapperCSS = ({ isTransitioning }: { isTransitioning: boolean }) => {
	return css`
		/* position: ${isTransitioning && "absolute"}; */
		overflow: ${isTransitioning ? "hidden" : "scroll"};
		/* z-index: 9999; */
	`
}

const contentInnerWrapperCSS = ({ isTransitioning }: { isTransitioning: boolean }) => {
	return css`
		background-color: var(--common-back-color);
		box-shadow: ${isTransitioning && "0px 0px 50px 1px rgba(0, 0, 0, 0.3)"};
		width: ${isTransitioning && "100vw"};
		height: ${isTransitioning && "100vh"};
	`
}

const transitionsCSS = ({ isTransitioning }: { isTransitioning: boolean }) => {
	const data: { [prop: string]: any } = {
		none: css`
			
		`,
		rightToLeft: css`
			& .transitioning {
				animation: rightToLeft 0.3s ease forwards;
			}
			@keyframes rightToLeft {
				from {
					transform: translateX(100%);
					visibility: visible;
				}

				to {
					transform: translateX(0%);
				}
			}
		`,
		leftToRight: css`
			& .transitioning {
				animation: leftToRight 0.3s ease forwards;
			}
			@keyframes leftToRight {
				from {
					transform: translateX(-100%);
					visibility: visible;
				}

				to {
					transform: translateX(0%);
				}
			}
		`,
		bottomToTop: css`
			& .transitioning {
				animation: bottomToTop 0.3s ease forwards;
			}
			@keyframes bottomToTop {
				from {
					transform: translateY(100%);
					visibility: visible;
				}

				to {
					transform: translateY(0%);
				}
			}
		`,
		scale: css`
			& .transitioning {
				animation: scale 0.3s ease forwards;
			}
			@keyframes scale {
				from {
					opacity: 0%;
					transform: scale(200%);
					visibility: visible;
				}

				to {
					opacity: 100%;
					transform: scale(100%);
				}
			}
		`,
		scaleReverse: css`
			& .transitioning {
				animation: scaleReverse 0.3s ease forwards;
			}
			@keyframes scaleReverse {
				from {
					opacity: 0%;
					transform: scale(80%);
					visibility: visible;
				}

				to {
					opacity: 100%;
					transform: scale(100%);
				}
			}
		`,
	}

	return data
}

export default TransitionWrapper
