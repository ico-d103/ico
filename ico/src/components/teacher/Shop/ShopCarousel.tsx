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
	const [currentImage, setCurrentImage] = useState(0)

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
					<img src={images[imageIndex]} alt="carousel image" />
				</div>,
			)
		}

		return slides
	}

	return (
		<React.Fragment>
			<div css={imageCSS}>{getSlides()}</div>

			<button onClick={handlePrev}>Prev</button>
			<button onClick={handleNext}>Next</button>
		</React.Fragment>
	)
}

const imageCSS = css`
	display: flex;
	align-items: center;
`

export default ShopCarousel
