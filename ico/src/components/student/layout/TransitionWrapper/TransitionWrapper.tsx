import React, { useState, useEffect, useRef } from "react"
import html2canvas from "html2canvas"
import { navTo, isNavigating } from "@/store/store"
import { useAtom } from "jotai"
import { css } from "@emotion/react"
import { useRouter } from "next/router"
import Image from "next/image"
import DomToImage from "dom-to-image"
import * as htmlToImage from "html-to-image"
import useNavigate from "@/hooks/useNavigate"

type TransitionWrapperProps = {
	children: any
}

function TransitionWrapper({ children }: TransitionWrapperProps) {
	const [screenshot, setScreenshot] = useState("")
	const [navToAtom, setNavToAtom] = useAtom(navTo)
	const [isNavigatingAtom, setIsNavigatingAtom] = useAtom(isNavigating)
	const [beforeTransition, setBeforeTransition] = useState<boolean>(false)
	const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
	const [isImageLoading, setIsImageLoading] = useState<boolean>(false)
	const [scrollTop, setScrollTop] = useState<number>(0)
	const imageRef = useRef<HTMLImageElement>(null)
	const contentWrapperRef = useRef<HTMLDivElement>(null)
	const contentInnerWrapperRef = useRef<HTMLDivElement>(null)
	const router = useRouter()
	const navigate = useNavigate()

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
		return isIos
	}

	useEffect(() => {
		// window.history.scrollRestoration = "auto";
		window.history.scrollRestoration = "manual"

		router.beforePopState(({ url, as, options }) => {
			if (isIos() === true) {
				setIsNavigatingAtom(() => true)
				setNavToAtom(() => {
					return { url: "", transition: "" }
				})
				// navigate("", "")

				return true
			} else {
				setIsNavigatingAtom(() => true)
				setNavToAtom(() => {
					return { url: url, transition: "beforeScale" }
				})
				// navigate(url, "beforeScale")
				return false
			}
		})

		return () => {
			router.beforePopState(() => true)
		}
	}, [])

	const handleScreenshot = () => {
		if (contentInnerWrapperRef.current) {
			html2canvas(
				contentInnerWrapperRef.current,
				{
					scale: 0.5,
					useCORS: true,
				},
				// {
				// 	scrollX: -window.scrollX,
				// 	scrollY: -window.scrollY,
				// 	windowWidth: document.documentElement.clientWidth,
				// 	windowHeight: document.documentElement.clientHeight
				// 	// width: 100,
				// 	// height: 100
				// }
			).then((canvas) => {
				const screenshot = canvas.toDataURL()
				setScreenshot(screenshot)
			})

			// htmlToImage.toJpeg(contentInnerWrapperRef.current, { quality: 0,includeQueryParams:true  })
			// .then(function (canvas) {
			// 	const screenshot = canvas
			// 	setScreenshot(screenshot)
			// });

			// DomToImage.toJpeg(contentInnerWrapperRef.current)
			// .then(function (dataUrl) {
			// 	const screenshot = dataUrl
			// 	setScreenshot(screenshot)
			// })
		}
	}

	useEffect(() => {
		if (navToAtom.url !== "") {
			setScrollTop(() => window.scrollY)

			handleScreenshot()
			// setScrollTop(() => window.scrollY)
		}
	}, [navToAtom.url])

	useEffect(() => {
		if (screenshot !== "") {
			setBeforeTransition(() => true)
		}
	}, [isImageLoading])

	useEffect(() => {
		if (beforeTransition) {
			router.push(navToAtom.url)
		}
	}, [beforeTransition])

	useEffect(() => {
		if (screenshot !== "") {
			setBeforeTransition(() => false)
			setIsTransitioning(() => true)
			setTimeout(() => {
				setIsTransitioning(() => false)
				setNavToAtom(() => {
					return { url: "", transition: "" }
				})
				setScreenshot(() => "")
				setIsImageLoading(() => false)
				setIsNavigatingAtom(() => false)
			}, 300)
		}
	}, [router.pathname])

	return (
		<div css={transitionWrapperCSS}>
			<div
				className={`before-wrapper ${
					navToAtom.url === router.pathname || screenshot || isTransitioning ? "before-transitioning" : ""
				} ${navToAtom.url ? "enable-will-change" : "disable-will-change"}`}
				css={[imgWrapperCSS, beforeTransitionsCSS({ isTransitioning })[navToAtom.transition]]}
			>
				{screenshot && (
					<img
						// className={`${
						// 	navToAtom.url === router.pathname || screenshot || isTransitioning ? "before-transitioning" : ""
						// }`}
						ref={imageRef}
						css={imgCSS({ scrollTop })}
						src={screenshot}
						alt="screenshot"
						onLoad={() => {
							setIsImageLoading(() => true)
						}}
					/>
				)}
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
					ref={contentInnerWrapperRef}
					css={contentInnerWrapperCSS({ isTransitioning, beforeTransition })}
					className={`content-wrapper ${
						navToAtom.url === router.pathname || screenshot || isTransitioning ? "transitioning" : ""
					}  ${navToAtom.url ? "enable-will-change" : "disable-will-change"}`}
				>
					{children}
				</div>
			</div>
		</div>
	)
}

const transitionWrapperCSS = css`
	.enable-will-change {
		will-change: transform, opacity;
	}
	.disable-will-change {
		will-change: auto;
	}
`

const imgWrapperCSS = css`
	width: 100vw;
	height: 100vh;
	position: Fixed;
	z-index: -1;
	overflow: hidden;
`

const imgCSS = ({ scrollTop }: { scrollTop: number }) => {
	return css`
		width: 100vw;
		height: auto;

		transform: translate(0, -${scrollTop}px);
		animation: focus-out 0.3s ease both;
		@keyframes focus-out {
			0% {
				filter: blur(0px);

			}
			100% {
				filter: blur(20px);
			}
		}
	`
}

const contentOuterWrapperCSS = ({ isTransitioning }: { isTransitioning: boolean }) => {
	return css`
		& .enable-will-change {
			will-change: transform, opacity;
		}
		& .disable-will-change {
			will-change: auto;
		}

		/* min-height: calc(100vh - 64px); */
		min-height: 100vh;
		overflow: hidden;
	`
}

const contentInnerWrapperCSS = ({
	isTransitioning,
	beforeTransition,
}: {
	isTransitioning: boolean
	beforeTransition: boolean
}) => {
	return css`
		/* min-height: calc(100vh - 64px); */
		min-height: 100vh;
		/* background-color: var(--student-back-color); */
		background: linear-gradient(to bottom, var(--student-main-color), #ffecc4);
		box-shadow: ${isTransitioning && "0px 0px 50px 1px rgba(0, 0, 0, 0.3)"};
		width: ${isTransitioning && "100vw"};
		/* height: ${isTransitioning && "calc(100vh - 64px)"}; */
		height: ${isTransitioning && "100vh"};
		overflow: ${isTransitioning && "hidden"};
		visibility: ${beforeTransition && "hidden"};
	`
}

const transitionsCSS = ({ isTransitioning }: { isTransitioning: boolean }) => {
	const data: { [prop: string]: any } = {
		none: css``,
		rightToLeft: css`
			& .transitioning {
				animation: rightToLeft 0.3s cubic-bezier(0.5, 0.2, 0.1, 0.8) forwards;
			}
			@keyframes rightToLeft {
				from {
					opacity: 0%;
					transform: translateX(100%);
					visibility: visible;
				}

				to {
					opacity: 100%;
					transform: translateX(0%);
				}
			}
		`,
		leftToRight: css`
			& .transitioning {
				animation: leftToRight 0.3s cubic-bezier(0.5, 0.2, 0.1, 0.8) forwards;
			}
			@keyframes leftToRight {
				from {
					opacity: 0%;
					transform: translateX(-100%);
					visibility: visible;
				}

				to {
					opacity: 100%;
					transform: translateX(0%);
				}
			}
		`,
		bottomToTop: css`
			& .transitioning {
				animation: bottomToTop 0.3s cubic-bezier(0.5, 0.2, 0.1, 0.8) forwards;
			}
			@keyframes bottomToTop {
				from {
					opacity: 0%;
					transform: translateY(100%);
					visibility: visible;
				}

				to {
					opacity: 100%;
					transform: translateY(0%);
				}
			}
		`,
		scale: css`
			& .transitioning {
				animation: scale 0.3s cubic-bezier(0.5, 0.2, 0.1, 0.8) forwards;
			}
			@keyframes scale {
				from {
					opacity: 0%;
					transform: scale(150%);
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
				animation: scaleReverse 0.3s cubic-bezier(0.5, 0.2, 0.1, 0.8) forwards;
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

		beforeScale: css`
			& .transitioning {
				animation: beforeScale1 0.3s cubic-bezier(0.5, 0.2, 0.1, 0.8) forwards;
			}
			@keyframes beforeScale1 {
				from {
					opacity: 0%;
					transform: scale(150%);
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

const beforeTransitionsCSS = ({ isTransitioning }: { isTransitioning: boolean }) => {
	const data: { [prop: string]: any } = {
		none: css``,
		rightToLeft: css``,
		bottomToTop: css``,
		scaleReverse: css``,

		beforeScale: css`
			/* position: fixed; */
			animation: ${isTransitioning && "beforeScale2 0.3s cubic-bezier(0.5, 0.2, 0.1, 0.8) forwards"};
			/* width: 100vw;
				height: 100vh; */

			@keyframes beforeScale2 {
				from {
					z-index: 9999;
					opacity: 100%;
					transform: scale(100%);
					visibility: visible;
				}

				to {
					opacity: 0%;
					transform: scale(50%);
				}
			}
		`,
	}

	return data
}

export default TransitionWrapper
