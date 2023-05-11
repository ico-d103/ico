import React, { useState } from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import ShopCreateToggleButton from "@/components/teacher/Shop/Create/ShopCreateToggleButton"
import { postTeacherProductsAPI } from "@/api/teacher/shop/postTeacherProductsAPI"
import ShopCreateImage from "@/components/teacher/Shop/Create/ShopCreateImage"
import { useRouter } from "next/router"

function create() {
	const router = useRouter()

	const formData = new FormData()

	const [title, setTitle] = useState("")
	const [amount, setAmount] = useState("")
	const [imageList, setImageList] = useState([])
	const [count, setCount] = useState("")
	const [rental, setRental] = useState(false)
	const [detail, setDetail] = useState("")

	const handleInputChange = (event: any) => {
		setTitle(event.target.value)
	}

	const handleAmountChange = (event: any) => {
		setAmount(event.target.value)
	}

	const handleCountChange = (event: any) => {
		setCount(event.target.value)
	}

	const handleDetailChange = (event: any) => {
		setDetail(event.target.value)
	}

	imageList.forEach((image) => {
		formData.append("files", image)
	})

	formData.append(
		"product",
		new Blob(
			[
				JSON.stringify({
					title: title,
					amount: amount,
					count: count,
					detail: detail,
					rental: rental,
				}),
			],
			{ type: "application/json" },
		),
	)

	const rentalToggle = () => {
		setRental(!rental)
	}

	function receiveImageList(imageList: any) {
		setImageList(imageList)
	}

	const createProduct = () => {
		postTeacherProductsAPI({ body: formData })
			.then(() => {
				router.push("/teacher/shop/my")
			})
			.catch((err) => {
				console.log(err)
			})
	}

	// console.log(imageList)

	return (
		<div css={shopCreateWrapperCSS}>
			<div css={headerCSS}>
				<div css={titleCSS}>상품 등록하기</div>
			</div>

			<div css={contentCSS}>상품 이름</div>
			<input css={inputCSS} value={title} onChange={handleInputChange} />

			<div css={productCSS}>
				<div>
					<div css={contentCSS}>상품 가격</div>
					<input css={inputCSS} value={amount} onChange={handleAmountChange} />
				</div>
				<div>
					<div css={contentCSS}>상품 수량</div>
					<input css={inputCSS} value={count} onChange={handleCountChange} />
				</div>
				<div>
					<div css={contentCSS}>상품 유형</div>
					<ShopCreateToggleButton rental={rental} leftLabel="판매" rightLabel="대여" onClick={rentalToggle} />
				</div>
			</div>

			<div>
				<ShopCreateImage sendImageList={receiveImageList} />
			</div>

			<div css={contentCSS}>상품 상세 설명</div>
			<input css={inputCSS} value={detail} onChange={handleDetailChange} />

			<div css={buttonCSS}>
				<Button
					text={"등록하기"}
					fontSize={`var(--teacher-h4)`}
					width={"190px"}
					theme={"normal"}
					onClick={createProduct}
				/>
			</div>
		</div>
	)
}

const shopCreateWrapperCSS = css`
	flex: 1;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`
const headerCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`
const titleCSS = css`
	font-size: var(--teacher-h1);
	font-weight: bold;
`

const contentCSS = css`
	margin-top: 15px;
	margin-bottom: 5px;

	font-size: var(--teacher-h5);
	color: var(--teacher-gray-color);
`

const inputCSS = css`
	width: 100%;
	border: none;
	background-color: var(--common-back-color);
	height: 45px;
	border-radius: 10px;
`
const productCSS = css`
	display: grid;
	grid-template-columns: 1fr 1fr 2fr;
	gap: 20px;
	align-items: center;
	margin-top: 20px;
`

const buttonCSS = css`
	display: flex;
	justify-content: end;

	margin-top: 20px;
`

export default create
