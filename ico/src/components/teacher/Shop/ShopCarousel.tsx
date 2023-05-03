import { css } from "@emotion/react"
import Image from "next/image"

import React, { useState } from "react"

const images = [
	"https://placeimg.com/640/480/any",
	"https://placeimg.com/640/480/animals",
	"https://placeimg.com/640/480/arch",
	"https://placeimg.com/640/480/nature",
	"https://placeimg.com/640/480/people",
]

function ShopCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0)

	const handlePrev = () => {
		setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
	}

	const handleNext = () => {
		setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
	}

	const getSlides = () => {
		const slides = []

		for (let i = -2; i <= 2; i++) {
			const index = currentIndex + i
			const imageIndex = (index + images.length) % images.length
			slides.push(
				<div key={index}>
					<Image src={images[imageIndex]} alt="carousel image" width={440} height={330} />
				</div>,
			)
		}

		return slides
	}

	return (
		<div css={carouselWrapperCSS}>
			<div css={imageCSS}>{getSlides()}</div>

			<div css={prevButtonCSS} onClick={handlePrev}>
				&lt;
			</div>
			<div css={nextButtonCSS} onClick={handleNext}>
				&gt;
			</div>
		</div>
	)
}

const ImageWrapperCSS = css`
	border-radius: 10px;
`

const carouselWrapperCSS = css`
	position: relative;
`

const imageCSS = css`
	display: flex;
	align-items: center;
`

const prevButtonCSS = css`
	position: absolute;
	top: 50%;
	left: 0;
	transform: translateY(-50%);

	font-size: 5rem;
	color: white;

	cursor: pointer;
`

const nextButtonCSS = css`
	position: absolute;
	top: 50%;
	right: 0;
	transform: translateY(-50%);

	font-size: 5rem;
	color: white;

	cursor: pointer;
`

export default ShopCarousel
