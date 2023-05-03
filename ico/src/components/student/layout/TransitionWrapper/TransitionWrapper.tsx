import React, { useState, useEffect, useRef } from "react"
import html2canvas from "html2canvas"
import { navTo } from "@/store/store"
import { useAtom } from "jotai"
import { css } from "@emotion/react"
import { useRouter } from "next/router"
import Image from "next/image"
import DomToImage from "dom-to-image"



type TransitionWrapperProps = {
	children: any
}

function TransitionWrapper({ children }: TransitionWrapperProps) {
	const [screenshot, setScreenshot] = useState("")
	const [navToAtom, setNavToAtom] = useAtom(navTo)
	const [beforeTransition, setBeforeTransition] = useState<boolean>(false)
	const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
	const [isImageLoading, setIsImageLoading] = useState<boolean>(false)
	const [scrollTop, setScrollTop] = useState<number>(0)
	const imageRef = useRef<HTMLImageElement>(null)
	const contentWrapperRef = useRef<HTMLDivElement>(null)
	const contentInnerWrapperRef = useRef<HTMLDivElement>(null)
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
		return isIos
	}

	useEffect(() => {
		// window.history.scrollRestoration = "auto";
		window.history.scrollRestoration = 'auto'
		
		router.events.on('routeChangeStart', () => {
			// alert(`111-${window.scrollY}`)
			// alert(`222-${scrollTop}`)
			window.scrollTo(0, scrollTop)
		  })


		router.beforePopState(({ url, as, options })  =>  {
			setScrollTop(() => window.scrollY)
			// alert(options.scroll)
			// if (as !== router.asPath) {
				
			// 	router.push(router.asPath)
			// 	setNavToAtom(() => url)
			// 	return false
			// }
			// return true
			
			if (isIos() === true) {
				
				setNavToAtom(() => {
					return { url: "", transition: "", isGoBack: true }
				})
				
				return true
			} else {
				setNavToAtom(() => {
					return { url: url, transition: "beforeScale", isGoBack: true }
				})
				
				
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
			
				// {
				// 	scrollX: -window.scrollX,
				// 	scrollY: -window.scrollY,
				// 	windowWidth: document.documentElement.clientWidth,
  				// 	windowHeight: document.documentElement.clientHeight
				// 	// width: 100,
  				// 	// height: 100
				// }
				
			).then((canvas) => {
				
				if (navToAtom.isGoBack === true) {
					window.scrollTo(0, scrollTop)
				}

				
				const screenshot = canvas.toDataURL()
				setScreenshot(screenshot)
				
			})

		}
	}

	useEffect(() => {
		if (navToAtom.url !== "") {
			if (navToAtom.isGoBack !== true) {
				setScrollTop(() => window.scrollY)
				
			}
			handleScreenshot()
			// setScrollTop(() => window.scrollY)
			
			
			
		}
		
	}, [navToAtom.url])

	useEffect(() => {
		if (screenshot !== "") {
			// 여기에 클래스 이름 바꾸는 메서드 드가야됨
			setBeforeTransition(() => true)
			
		}
	}, [isImageLoading])

	useEffect(() => {
		if (beforeTransition) {

			router.push(navToAtom.url)
			// router.push({
			// 	pathname: navToAtom.url,
			// 	query: {},
			//   }, undefined, { scroll: false })
			
		}
	}, [beforeTransition])

	useEffect(() => {
		
		if (screenshot !== "") {
			// alert(scrollTop)
			setBeforeTransition(() => false)
			setIsTransitioning(() => true)
			setTimeout(() => {
				setIsTransitioning(() => false)
				setNavToAtom(() => {
					return { url: "", transition: "", isGoBack: false }
				})
				setScreenshot(() => "")
				setIsImageLoading(() => false)
			}, 300)
		}
	}, [router.pathname])

	return (
		<div>
			<div className={`before-wrapper`} css={[imgWrapperCSS, beforeTransitionsCSS({ isTransitioning })[navToAtom.transition]]}>
				{screenshot && (
					<img
						className={`${navToAtom.url === router.pathname || screenshot || isTransitioning ? "before-transitioning" : ""}`}
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
					className={`content-wrapper ${navToAtom.url === router.pathname || screenshot || isTransitioning ? "transitioning" : ""}`}
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
	position: Fixed;
	z-index: -1;
	overflow: hidden;
`

const imgCSS = ({ scrollTop }: { scrollTop: number }) => {
	return css`
		/* width: 100vw;
        height: 100vh; */
		width: 100vw;
		height: auto;



		transform: translate(0, -${scrollTop}px);
	`
}

const contentOuterWrapperCSS = ({ isTransitioning }: { isTransitioning: boolean }) => {
	return css`
		/* position: ${isTransitioning && "absolute"}; */
		min-height: calc(100vh - 64px);
		/* overflow: ${isTransitioning ? "hidden" : "scroll"}; */
		overflow: hidden;
		/* z-index: 9999; */
		
	`
}

const contentInnerWrapperCSS = ({ isTransitioning, beforeTransition }: { isTransitioning: boolean, beforeTransition: boolean }) => {
	return css`
		min-height: calc(100vh - 64px);
		background-color: var(--common-back-color);
		box-shadow: ${isTransitioning && "0px 0px 50px 1px rgba(0, 0, 0, 0.3)"};
		width: ${isTransitioning && "100vw"};
		height: ${isTransitioning && "calc(100vh - 64px)"};
		overflow: ${isTransitioning && "hidden"};
		visibility: ${beforeTransition && 'hidden'};
		will-change: ${beforeTransition && 'transform, opacity'};

	`
}

const transitionsCSS = ({ isTransitioning }: { isTransitioning: boolean }) => {
	const data: { [prop: string]: any } = {
		none: css``,
		rightToLeft: css`
			& .transitioning {
				animation: rightToLeft 0.3s ease forwards;
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
				animation: leftToRight 0.3s ease forwards;
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
				animation: bottomToTop 0.3s ease forwards;
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


		beforeScale: css`
			& .transitioning {
				
				animation: beforeScale1 0.3s ease forwards;
			}
			@keyframes beforeScale1 {
				from {
					opacity: 0%;
					transform: scale(50%);
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
		rightToLeft: css`
			
		`,
		bottomToTop: css`
			
		`,
		scaleReverse: css`
			
		`,


		beforeScale: css`
			& .before-transitioning {
				position:fixed;
				animation: beforeScale2 0.3s ease forwards;
				width: 100vw;
				height: 100vh;
			}
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
