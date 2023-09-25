/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react"
import React, { useState, useRef, useEffect, useCallback } from "react"
import Swipe from "react-easy-swipe"
import styles from "./SwipeableGallery.module.css"
// import { useIsResponsive } from "@/components/Responsive/useIsResponsive";

const SwipeableGallery = ({ parentRef, content }: any) => {
	const movingDiv = useRef<HTMLInputElement>(null)
	const [positionx, setPositionx] = useState<number>(0)
	const [contentCount, setContentCount] = useState(1)
	const [endSwipe, setEndSwipe] = useState(false)
	const postData = content
	// const [isDeskTop, isTablet, isMobile] = useIsResponsive();

	const [width, setWidth] = useState(null)
	const [height, setHeight] = useState(null)

	useEffect(() => {
		setWidth(() => parentRef.current.clientWidth)
		setHeight(() => parentRef.current.clientHeight)

		const resize = () => {
			setWidth(() => parentRef.current.clientWidth)
			setHeight(() => parentRef.current.clientHeight)
			if (movingDiv.current !== null && parentRef.current.clientWidth) {
				movingDiv.current.style.transitionDuration = "0s"
				movingDiv.current.style.transform = `translateX(${-parentRef.current.clientWidth * (contentCount - 1)}px)`
			}
		}
		window.addEventListener(`resize`, resize)

		return () => {
			window.removeEventListener(`resize`, resize)
		}
	}, [contentCount])

	const onSwipeMove = (position = { x: 0 }) => {
		setEndSwipe(false)
		if (content.length === 1) {
			return
		}

		if (
			(contentCount >= content.length && positionx < 0) ||
			(contentCount === 1 && positionx > 0) ||
			(width !== null && Math.abs(positionx) > width)
		) {
			return
		}

		if (movingDiv.current !== null && width !== null && position.x !== null) {
			movingDiv.current.style.transitionDuration = "0s"
			movingDiv.current.style.transform = `translateX(${positionx + -width * (contentCount - 1)}px)`
			const x = position.x
			setPositionx(() => x)
		}
	}

	const onSwipeEnd = () => {
		if (movingDiv.current !== null && width !== null) {
			movingDiv.current.style.transitionDuration = "0.3s"

			if (positionx < -50 && contentCount < content.length) {
				setContentCount((prev) => prev + 1)
				movingDiv.current.style.transform = `translateX(${-width * contentCount}px)`
			}
			if (positionx > 50 && contentCount > -1) {
				setContentCount((prev) => prev - 1)
				movingDiv.current.style.transform = `translateX(${-width * (contentCount - 2)}px)`
			}
			if (Math.abs(positionx) <= 50) {
				movingDiv.current.style.transform = `translateX(${-width * (contentCount - 1)}px)`
			}
		}

		setPositionx(() => 0)
		setEndSwipe(true)
	}

	const onClickNextBtn = useCallback(() => {
		if (movingDiv.current !== null && width !== null) {
			if (contentCount < content.length) {
				movingDiv.current.style.transitionProperty = "transform"
				movingDiv.current.style.transitionDuration = "0.5s"
				setContentCount((prev) => prev + 1)
				movingDiv.current.style.transform = `translateX(${-width * contentCount}px)`
			} else {
				movingDiv.current.style.transitionProperty = "transform"
				movingDiv.current.style.transitionDuration = "0.5s"
				setContentCount(() => 1)
				movingDiv.current.style.transform = `translateX(0px)`
			}
		}
	}, [contentCount, width])

	const onClickPrevBtn = useCallback(() => {
		if (movingDiv.current !== null && width !== null) {
			if (contentCount > 1) {
				movingDiv.current.style.transitionProperty = "transform"
				movingDiv.current.style.transitionDuration = "0.5s"
				setContentCount((prev) => prev - 1)
				movingDiv.current.style.transform = `translateX(${-width * (contentCount - 2)}px)`
			} else {
				movingDiv.current.style.transitionProperty = "transform"
				movingDiv.current.style.transitionDuration = "0.5s"
				setContentCount(() => content.length)
				movingDiv.current.style.transform = `translateX(${-width * (content.length - 1)}px)`
			}
		}
	}, [contentCount, width])

	useEffect(() => {
		const autoSlide = setInterval(function () {
			onClickNextBtn()
		}, 10000)

		return () => {
			clearInterval(autoSlide)
		}
	}, [width, contentCount])
	//

	const indicator = content.map((el: any, idx: number) => {
		return <div key={`indicator-${idx}`} css={indicatorCSS({ idx, contentCount })}></div>
	})

	const indicatorBtn = (
		<>
			<div css={prevBtnCSS} onClick={onClickPrevBtn}>
				〈
			</div>
			<div css={nextBtnCSS} onClick={onClickNextBtn}>
				〉
			</div>
		</>
	)

	return (
		<div css={outerWrapperCSS}>
			{/* {isMobile === false && indicatorBtn} */}
			<div css={indicatorWrapperCSS()}>{indicator}</div>
			{indicatorBtn}
			<Swipe
				onSwipeStart={(event: any) => {
					event.stopPropagation()
				}}
				onSwipeEnd={onSwipeEnd}
				onSwipeMove={onSwipeMove}
				css={css`width: 100%; height: 100%;`}
			>
				<div css={wrapperCSS}>
					<div css={moveableCSS({length: content.length})} ref={movingDiv}>
						{content.map((el: any, idx: number) => {
							return (
								<div
									key={`banner-${idx}`}
									css={contentCSS}
								>
									{el}
								</div>
							) //, height: height + 'px'
						})}
					</div>
				</div>
			</Swipe>

			{/* {positionx}
      {contentCount}
      {endSwipe.toString()} */}
		</div>
	)
}

export default SwipeableGallery

const outerWrapperCSS = css`
	position: relative;
	width: 100%;
	height: 100%;
`

const wrapperCSS = css`

  /* width: 300px;
    height: 300px; */
  width: 100%;
  height: 100%;
  display: flex;

  overflow: hidden;


`

const contentCSS = css`
	display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(250, 250, 250);
  box-sizing: border-box;
	width: 100%;
	height: 100%;
`
const moveableCSS = ({length}: {length: number}) => css`
	display: grid;
	grid-template-columns: ${'100% '.repeat(length)};
  transition-property: transform;
	width: 100%;
	height: 100%;
`

const prevBtnCSS = css`
	z-index: 9;
	position: absolute;
	left: 0;
	height: 100%;
	display: flex;
	align-items: center;
	font-size: 48px;
	font-weight: 700;
	padding-left: 8px;
	padding-right: 8px;
	color: white;
	transition-property: font-size;
	transition-duration: 0.2s;
	cursor: pointer;
	user-select: none;
	text-shadow: 2px 2px 2px gray;

	&:hover {
		font-size: 54px;
	}
`

const nextBtnCSS = css`
	z-index: 9;
	position: absolute;
	right: 0;
	height: 100%;
	display: flex;
	align-items: center;
	font-size: 48px;
	font-weight: 700;
	padding-left: 8px;
	padding-right: 8px;
	color: white;
	transition-property: font-size;
	transition-duration: 0.2s;
	cursor: pointer;
	user-select: none;
	text-shadow: 2px 2px 2px gray;
	
	&:hover {
		font-size: 54px;
	}
`

const indicatorWrapperCSS = () => {
	return css`
		z-index: 9;
		position: absolute;
		color: white;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: end;
		pointer-events: none;
		padding-bottom: 0.5vw;
	`
}

interface indicatorCSSProps {
	idx: number
	contentCount: number
}
const indicatorCSS = ({ idx, contentCount }: indicatorCSSProps) => {
	return css`
		width: 30px;
		height: 2px;
		background-color: ${contentCount - 1 === idx ? "white" : "gray"};
		margin: 2px;
	`
}
