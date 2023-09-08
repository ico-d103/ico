import React, { useState } from "react"

import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import ContentWrapper from "@/components/student/common/ContentWrapper/ContentWrapper"
import { css } from "@emotion/react"
import { useRouter } from "next/router"

import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { ShopTabMenus } from "@/components/student/Shop/ShopTabMenus"

import ShopCreateImage from "@/components/student/Shop/ShopCreate/ShopCreateImage"
import { postStudentProductsAPI } from "@/api/student/shop/postStudentProductsAPI"
import Input from "@/components/common/Input/Input"
import Button from "@/components/common/Button/Button"
import useGetNation from "@/hooks/useGetNation"

// 도매 상인과 기업 상점 등, 레이아웃을 공유하기 위해 컴포넌트로 Migrate

type ShopCreatePropsType = {
  submitHandler: (body: FormData) => void
}

function ShopCreate({submitHandler}: ShopCreatePropsType) {
	const router = useRouter()

	const formData = new FormData()

	const [title, setTitle] = useState("")
	const [amount, setAmount] = useState("")
	const [count, setCount] = useState("")
	const [imageList, setImageList] = useState([])
	const [detail, setDetail] = useState("")
	const [nation] = useGetNation()

	const handleTitleChange = (event: any) => {
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
		"proposal",
		new Blob(
			[
				JSON.stringify({
					title: title,
					amount: amount,
					count: count,
					detail: detail,
				}),
			],
			{ type: "application/json" },
		),
	)

	function receiveImageList(imageList: any) {
		setImageList(imageList)
	}

	

	// console.log(formData)

	return (
		<React.Fragment>
			<PageHeader title={"판매글 작성"} />
			<div
				css={css`
					display: flex;
					flex-direction: column;
					align-items: center;
					flex: 1;
					margin-top: 16px;
				`}
			>
				<div css={contentWrapperCSS}>
					<div css={inputWrapperCSS}>
						<Input
							customCss={inputCSS}
							theme={"mobileSoft"}
							placeholder="상품의 이름이 뭔가요?"
							value={title}
							onChange={handleTitleChange}
						/>
					</div>

					<div css={inputWrapperCSS}>
						<Input
							customCss={inputCSS}
							theme={"mobileSoft"}
							placeholder="상품의 가격은 얼마인가요?"
							value={amount}
							onChange={handleAmountChange}
							rightContent={<div css={unitCSS}>{nation.currency}</div>}
						/>
					</div>

					<div css={inputWrapperCSS}>
						<Input
							customCss={inputCSS}
							theme={"mobileSoft"}
							placeholder="상품은 총 몇 개인가요?"
							value={count}
							onChange={handleCountChange}
							rightContent={<div css={unitCSS}>개</div>}
						/>
					</div>

					<div css={imageWrapperCSS}>
						<ShopCreateImage sendImageList={receiveImageList} />
					</div>

					<div css={explainWrapperCSS}>
					<Input
							customCss={inputCSS}
							theme={"mobileSoft"}
							placeholder="상품에 대한 설명을 입력해 주세요."
							value={detail}
							onChange={handleDetailChange}
							isTextarea={true}
						/>
						{/* <textarea
							css={textareaCSS}
							placeholder="선생님에게 상품을 설명해주세요."
							value={detail}
							onChange={handleDetailChange}
						/> */}
					</div>
				</div>
				<Button
					text={"제출하기!"}
					fontSize={`var(--student-h3)`}
					width={"48%"}
					theme={"mobileSoft3"}
					onClick={submitHandler}
					cssProps={css`box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);`}
				/>
				{/* <button onClick={proposalProduct}>gogo</button> */}
			</div>
		</React.Fragment>
	)
}

const inputWrapperCSS = css`
	/* height: 40px; */
	width: 100%;
	margin-bottom: 16px;

	/* display: flex;
	align-items: center;
	justify-content: space-between; */

	/* border-radius: 10px; */
`

const unitCSS = css`
	font-size: var(--student-h3);
	margin-right: 16px;
	color: var(--student-main-color-6);
`

const contentWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 95%;
	
`

const inputCSS = css`
	width: 100%;
`

const imageWrapperCSS = css`
	display: flex;
	flex-direction: column;
	justify-content: center;

	height: 30vh;
	width: 100%;
	margin-bottom: 16px;
	overflow: hidden;
	/* padding: 10px 20px; */
	border-radius: 10px;
	outline: 2px solid rgba(0, 0, 0, 0.1);
	background-color: var(--student-main-color-soft);
	font-size: var(--student-h4);

	svg {
		margin: auto; /* 수평 중앙 정렬을 위해 추가 */
	}
`

const explainWrapperCSS = css`
	width: 100%;
	margin-bottom: 24px;

	/* display: flex;
	align-items: center;
	justify-content: space-between;

	border-radius: 10px; */

	/* background-color: var(--student-main-color-2);
	font-size: var(--student-h4); */
`

const textareaCSS = css`
	width: 100%;
	min-height: 20vh;

	padding: 10px 20px;

	background-color: var(--student-main-color-2);

	border-radius: 10px;

	outline: none;
	border: none;
`

export default ShopCreate
