import React, { useEffect, useState, useRef } from "react"
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { ChangeEvent } from "react"
import Carousel from "@/components/common/Carousel/Carousel"
import SwipeableGallery from "@/components/common/SwipeableGallery/SwipeableGallery"
import imageCompression from "browser-image-compression"
interface ShopCreateImageProps {
	imageList: File[]
	existingImages: string[]
	setImageList: React.Dispatch<React.SetStateAction<File[]>>
	setExistingImages: React.Dispatch<React.SetStateAction<string[]>>
}

const ShopCreateImage = ({ imageList, existingImages, setImageList, setExistingImages }: ShopCreateImageProps) => {
	// const [imageList, setImageList] = useState<File[]>([])
	const galleryWrapperRef = useRef<HTMLDivElement>(null)
	const [contentCount, setContentCount] = useState(0)
	function onClickFileUpload() {
		const fileInput = document.getElementById("file-input") as HTMLInputElement
		fileInput.click()
	}

	const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			e.preventDefault()
			return
		}

		await Array.from(e.target.files).map(async (image) => {
			const file = image
			const options = {
				maxSizeMB: 1, // 이미지 최대 용량
				maxWidthOrHeight: 1280, // 최대 넓이(혹은 높이)
				useWebWorker: true,
				// fileType: 'image/png',
			}
			try {
				const compressedFile = await imageCompression(file, options)
				const modifiedFile = new File([compressedFile], file.name, {
					type: file.type,
				})
				const url = URL.createObjectURL(modifiedFile)
				// 압축된 이미지는 modifiedFile, 이거를 formData에 담으면 됨!
				setImageList([...imageList, modifiedFile])
			} catch (error) {}
		})

		

	}

	function getImageUrl(file: File): string {
		return URL.createObjectURL(file)
	}

	const deleteNewImageHandler = (idx: number) => {
		setImageList((prev) => {
			const deleted = prev.filter((el, eidx) => eidx !== idx)
			return deleted
		})
	}

	const deleteExistingImageHandler = (idx: number) => {
		setExistingImages((prev) => {
			const deleted = prev.filter((el, eidx) => eidx !== idx)
			return deleted
		})
	}

	const imageElements = imageList.map((file: File, idx: number) => (
		<div
			css={css`
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: white;
				position: relative;
			`}
		>
			<div css={deleteButtonCSS} onClick={deleteNewImageHandler.bind(null, idx)}>
				X
			</div>
			<img
				key={file.name}
				src={getImageUrl(file)}
				alt={file.name}
				css={css`
					width: auto;
					height: 100%;
				`}
			/>
		</div>
	))

	const existingImagesElements = existingImages.map((el, idx) => (
		<div
			css={css`
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: white;
				position: relative;
			`}
		>
			<div css={deleteButtonCSS} onClick={deleteExistingImageHandler.bind(null, idx)}>
				X
			</div>
			<img
				key={el}
				src={el}
				alt={el}
				css={css`
					width: auto;
					height: 100%;
				`}
			/>
		</div>
	))

	const post = (
		<div
			css={css`
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: white;
			`}
		>
			<div style={{ width: "100px", height: "100px" }}>
				<label css={fileInputLabelCSS} htmlFor="file-input"></label>
				<input css={fileInputCSS} type="file" id="file-input" accept=".jpg,.jpeg,.png" onChange={onChangeImage} />
				<svg
					width="112"
					height="107"
					viewBox="0 0 112 107"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					onClick={onClickFileUpload}
				>
					<path
						d="M106 53.5V69C106 80.201 106 85.8016 103.82 90.0798C101.903 93.8431 98.8431 96.9027 95.0798 98.8201C90.8016 101 85.201 101 74 101H38C26.799 101 21.1984 101 16.9202 98.8201C13.1569 96.9027 10.0973 93.8431 8.17987 90.0798C6 85.8016 6 80.201 6 69V43C6 31.799 6 26.1984 8.17987 21.9202C10.0973 18.1569 13.1569 15.0973 16.9202 13.1799C21.1984 11 26.799 11 38 11H58.5M91 36V6M76 21H106M76 56C76 67.0457 67.0457 76 56 76C44.9543 76 36 67.0457 36 56C36 44.9543 44.9543 36 56 36C67.0457 36 76 44.9543 76 56Z"
						stroke="#4D4D4D"
						strokeWidth="12"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
		</div>
	)

	// console.log(imageList)

	return (
		<div>
			{/* {imageList.length == 0 && (
				<div css={css`width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;`}>
					{post}
					</div>
				
				// <div css={imageCSS}>
				// 	<label css={fileInputLabelCSS} htmlFor="file-input"></label>
				// 	<input css={fileInputCSS} type="file" id="file-input" accept=".jpg,.jpeg,.png" onChange={onChangeImage} />
				// 	<svg
				// 		width="50"
				// 		height="42"
				// 		viewBox="0 0 112 107"
				// 		fill="none"
				// 		xmlns="http://www.w3.org/2000/svg"
				// 		onClick={onClickFileUpload}
				// 	>
				// 		<path
				// 			d="M106 53.5V69C106 80.201 106 85.8016 103.82 90.0798C101.903 93.8431 98.8431 96.9027 95.0798 98.8201C90.8016 101 85.201 101 74 101H38C26.799 101 21.1984 101 16.9202 98.8201C13.1569 96.9027 10.0973 93.8431 8.17987 90.0798C6 85.8016 6 80.201 6 69V43C6 31.799 6 26.1984 8.17987 21.9202C10.0973 18.1569 13.1569 15.0973 16.9202 13.1799C21.1984 11 26.799 11 38 11H58.5M91 36V6M76 21H106M76 56C76 67.0457 67.0457 76 56 76C44.9543 76 36 67.0457 36 56C36 44.9543 44.9543 36 56 36C67.0457 36 76 44.9543 76 56Z"
				// 			stroke="#4D4D4D"
				// 			strokeWidth="8"
				// 			strokeLinecap="round"
				// 			strokeLinejoin="round"
				// 		/>
				// 	</svg>
				// </div>
			)} */}


				<div ref={galleryWrapperRef} css={parentCSS}>
					
					<SwipeableGallery
						contentCount={contentCount}
						setContentCount={setContentCount}
						content={[...existingImagesElements, ...imageElements, post]}
						autoLast={true}
					/>
				</div>
		
		</div>
	)
}

const imageCSS = css`
	border: none;
	border-radius: 10px;

	width: 100%;
	height: 350px;

	display: flex;
	justify-content: center;
	align-items: center;
`

const fileInputLabelCSS = css`
	margin-bottom: 8px;
	color: var(--text-color);
	font-size: 16px;
	font-weight: 500;
	cursor: pointer;
`

const parentCSS = css`
	/* display: grid;
	grid-template-columns: 1; */
	width: 100%;
	height: 30vh;

	::-webkit-scrollbar {
		width: 0px;
		height: 0px;
		background-color: transparent;
	}
`

const fileInputCSS = css`
	display: none;
`

const deleteButtonCSS = css`
	position: absolute;
	/* height: 100%; */
	display: flex;
	align-items: center;
	justify-content: center;
	/* position: absolute; */
	top: 32px;
	right: 64px;
	width: 32px;
	height: 32px;
	background-color: rgba(255, 255, 255, 1);
	opacity: 80%;
	border-radius: 100%;
	box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	z-index: 999;
	/* top: -420%; */
	transition-property: background-color transform box-shadow opacity;
	transition-duration: 0.2s;
	& path {
		stroke: rgba(0, 0, 0, 0.7);
	}

	&:hover {
		/* background-color: rgba(255, 255, 255, 1); */
		transform: scale(110%);
		box-shadow: 0px 5px 10px 1px rgba(0, 0, 0, 0.3);
		opacity: 100%;
	}
`

export default ShopCreateImage
