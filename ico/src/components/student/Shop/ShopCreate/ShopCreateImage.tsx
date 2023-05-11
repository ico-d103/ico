import React, { useEffect, useState } from "react"
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { ChangeEvent } from "react"

interface ShopCreateImageProps {
	sendImageList: (imageList: File[]) => void
}

const ShopCreateImage = ({ sendImageList }: ShopCreateImageProps) => {
	const [imageList, setImageList] = useState<File[]>([])

	function onClickFileUpload() {
		const fileInput = document.getElementById("file-input") as HTMLInputElement
		fileInput.click()
	}

	function onChangeImage(e: ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) {
			e.preventDefault()
			return
		}
		setImageList([...imageList, ...e.target.files])
	}

	useEffect(() => {
		sendImageList(imageList)
	}, [imageList])

	return (
		<div>
			<input type="file" id="file-input" accept=".jpg,.jpeg,.png" onChange={onChangeImage} />
			<div>
				<button onClick={onClickFileUpload}>버튼</button>
			</div>
			<div>
				{imageList.map((image, index) => (
					<small key={index}></small>
				))}
			</div>
		</div>
	)
}

export default ShopCreateImage
