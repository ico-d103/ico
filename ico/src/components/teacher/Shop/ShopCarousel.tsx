import { useState } from "react"
import Image from "next/image"
interface ShopCarouselProps {
	imageList: File[]
}

function ShopCarousel({ imageList }: ShopCarouselProps) {
	function getImageUrl(file: File): string {
		return URL.createObjectURL(file)
	}

	return (
		<div>
			{imageList.map((file, index) => (
				<div key={index}>
					<Image src={getImageUrl(file)} alt={file.name} width={200} height={200} />
				</div>
			))}
		</div>
	)
}

export default ShopCarousel
