import { css } from "@emotion/react"
import Image from "next/image"

import React, { useState } from "react"

const images = [
	"https://placeimg.com/640/480/any",
	"https://placeimg.com/640/480/animals",
	"https://placeimg.com/640/480/arch",
	// "https://placeimg.com/640/480/nature",
	// "https://placeimg.com/640/480/people",
]

function ShopCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0)

	const handlePrev = () => {
		if (currentIndex === 0) {
			setCurrentIndex(images.length - 1)
		} else {
			setCurrentIndex(currentIndex - 1)
		}
	}

	const handleNext = () => {
		if (currentIndex === images.length - 1) {
			setCurrentIndex(0)
		} else {
			setCurrentIndex(currentIndex + 1)
		}
	}

	const getSlides = () => {
		const visibleIndexes = [-1, 0, 1]
		const startIndex = (currentIndex - 2 + images.length) % images.length
		return visibleIndexes.map((offset) => {
			const imageIndex = (startIndex + offset + images.length) % images.length
			return (
				<div key={imageIndex}>
					<Image src={images[imageIndex]} alt="carousel image" width={440} height={330} css={ImageWrapperCSS} />
				</div>
			)
		})
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
