import { useState } from "react"

import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import ContentWrapper from "@/components/student/common/ContentWrapper/ContentWrapper"
import { css } from "@emotion/react"
import { useRouter } from "next/router"

import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { ShopTabMenus } from "@/components/student/Shop/ShopTabMenus"

import ShopCreateImage from "@/components/student/Shop/ShopCreate/ShopCreateImage"
import { postStudentProposalAPI } from "@/api/teacher/shop/postStudentProposalAPI"

function create() {
	const router = useRouter()

	const formData = new FormData()

	const [title, setTitle] = useState("")
	const [amount, setAmount] = useState("")
	const [count, setCount] = useState("")
	const [imageList, setImageList] = useState([])
	const [detail, setDetail] = useState("")

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

	const proposalProduct = () => {
		postStudentProposalAPI({ body: formData })
			.then(() => {
				router.push("/student/shop/student")
			})
			.catch((err) => {
				console.log(err)
			})
	}

	console.log(formData)

	return (
		<div>
			<PageHeader title={"상점"} addComp={<TabMenu menus={ShopTabMenus()} selected={1} />} />
			<div css={contentWrapperCSS}>
				<ContentWrapper>
					<div css={inputWrapperCSS}>
						<input css={inputCSS} placeholder="상품의 이름이 뭔가요?" value={title} onChange={handleTitleChange} />
					</div>

					<div css={inputWrapperCSS}>
						<input
							css={inputCSS}
							placeholder="상품의 가격은 얼마인가요?"
							value={amount}
							onChange={handleAmountChange}
						/>
						<div css={unitCSS}>원</div>
					</div>

					<div css={inputWrapperCSS}>
						<input css={inputCSS} placeholder="상품은 총 몇 개인가요?" value={count} onChange={handleCountChange} />
						<div css={unitCSS}>개</div>
					</div>

					<div css={imageWrapperCSS}>
						<ShopCreateImage sendImageList={receiveImageList} />
					</div>

					<div css={explainWrapperCSS}>
						<textarea
							css={textareaCSS}
							placeholder="선생님에게 상품을 설명해주세요."
							value={detail}
							onChange={handleDetailChange}
						/>
					</div>
				</ContentWrapper>
			</div>
			<button onClick={proposalProduct}>gogo</button>
		</div>
	)
}

const inputWrapperCSS = css`
	height: 40px;
	width: 100%;
	margin-bottom: 10px;

	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: 0px 20px;
	border-radius: 10px;

	background-color: var(--student-main-color-2);
	font-size: var(--student-h4);
`

const unitCSS = css`
	font-size: var(--student-h4);
`

const contentWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const inputCSS = css`
	width: 80%;

	background-color: var(--student-main-color-2);
	outline: none;
	border: none;
`

const imageWrapperCSS = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center; /* 가운데 정렬을 위해 추가 */

	height: 30vh;
	width: 100%;
	margin-bottom: 10px;

	padding: 10px 20px;
	border-radius: 10px;

	background-color: var(--student-main-color-2);
	font-size: var(--student-h4);

	svg {
		margin: auto; /* 수평 중앙 정렬을 위해 추가 */
	}
`

const explainWrapperCSS = css`
	width: 100%;
	margin-bottom: 10px;

	display: flex;
	align-items: center;
	justify-content: space-between;

	border-radius: 10px;

	background-color: var(--student-main-color-2);
	font-size: var(--student-h4);
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

export default create
