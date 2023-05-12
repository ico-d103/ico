import React, { useEffect, useState } from "react"
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { ChangeEvent } from "react"
import Image from "next/image"

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

	function getImageUrl(file: File): string {
		return URL.createObjectURL(file)
	}

	useEffect(() => {
		sendImageList(imageList)
		console.log(imageList)
	}, [imageList])

	const [currentIdx, setCurrentIdx] = useState(0)
	const pageSize = 3

	const handlePrev = () => {
		if (currentIdx > 0) {
			setCurrentIdx((prev) => prev - 1)
		}
	}

	const handleNext = () => {
		if (currentIdx < imageList.length - pageSize) {
			setCurrentIdx((prev) => prev + 1)
		}
	}

	const displayImages = () => {
		const images = []

		for (let i = currentIdx; i < currentIdx + pageSize && i < imageList.length; i++) {
			images.push(
				<div
					key={i}
					style={{
						flex: `1 1 ${100 / pageSize}%`,
						maxWidth: "33vw",
						maxHeight: "350px",
						overflow: "hidden",
						objectFit: "none",
						display: "flex",
						alignItems: "center",
					}}
				>
					<Image src={getImageUrl(imageList[i])} alt={imageList[i].name} layout="responsive" width={100} height={100} />
				</div>,
			)
		}

		if (currentIdx + pageSize >= imageList.length && imageList.length % 3 === 2) {
			// 마지막 페이지인 경우, 이미지가 2장이면서 마지막 요소가 이미지인 경우
			images.push(
				<div
					key="hello"
					style={{
						flex: `1 1 ${100 / pageSize}%`,
						maxWidth: "33vw",
						maxHeight: "350px",
						overflow: "hidden",
						objectFit: "none",
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
					}}
				>
					<div>hello</div>
				</div>
			)
		}

		return <div style={{ display: "flex", justifyContent: "flex-start" }}>{images}</div>
	}

	return (
		<>
			<div css={imageCSS}>
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
			<div>
				<div>
					<div>{displayImages()}</div>
					<div css={imageCSS} style={{ width: "33vw" }}>
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
				<div>
					<button onClick={handlePrev} disabled={currentIdx === 0}>
						Prev
					</button>
					<button onClick={handleNext} disabled={currentIdx >= imageList.length - pageSize}>
						Next
					</button>
				</div>
			</div>
		</>
	)
}

const imageCSS = css`
	border: none;
	border-radius: 10px;

	background-color: var(--common-back-color);
	width: 100%;
	height: 350px;

	margin-top: 20px;

	display: flex;
	justify-content: center;
	align-items: center;

	& svg {
		cursor: pointer;
	}
`

const fileInputLabelCSS = css`
	display: inline-block;
	margin-bottom: 8px;
	color: var(--text-color);
	font-size: 16px;
	font-weight: 500;
	cursor: pointer;
`

const fileInputCSS = css`
	display: none;
`

export default ShopCreateImage
