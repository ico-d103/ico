import { css } from "@emotion/react"
import Image from "next/image"
import { useRouter } from "next/router";


import ShopCarousel from "@/components/teacher/Shop/ShopCarousel"
import Button from "@/components/common/Button/Button"

function product() {
	const router = useRouter()
	const { pid } = router.query

	const product = {
		id: 1,
		image: "https://placehold.it/250x250",
		name: "헤드셋",
		number: 1,
		price: 4000,
		writer: "서재건",
		date: "2023년 4월 27일",
		approved: false,
		explanation: "상품에 대한 자세한 설명입니다.",
	}

	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<div css={productCSS}>
					<div>{product.name}</div>
					<div>{product.writer}</div>
					<hr />
					<div>
						<div>{product.price}미소</div>
						<div>현재 상품이 {product.number}개 남았습니다.</div>
					</div>
				</div>
				<div css={QRcss}>
					<Image src={"https://placehold.it/150x150"} alt={"QR"} width={150} height={150} />
				</div>
			</div>

			<div css={parentCSS}>
				<ShopCarousel />
			</div>

			<div css={footerCSS}>
				<div>
					<div>상품 상세 설명</div>
					<div>{product.explanation}</div>
				</div>
				<div>
					<Button
						text={"상품 승인하기"}
						fontSize={`var(--teacher-h5)`}
						width={"190px"}
						height={"30px"}
						theme={"positive"}
						onClick={() => {}}
					/>
					<Button
						text={"상품 반려하기"}
						fontSize={`var(--teacher-h5)`}
						width={"190px"}
						height={"30px"}
						theme={"warning"}
						onClick={() => {}}
					/>
				</div>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	flex: 1;
	display: grid;
	grid-column: 100%;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;

	grid-gap: 0;
`

const headerCSS = css`
	display: flex;
	margin-bottom: 10px;
`

const productCSS = css`
	width: 100%;
	height: 100%;

	> div {
	}

	> hr {
		border: 1.5px solid rgba(0, 0, 0, 0.5);
		margin-bottom: 5px;
	}

	> div:nth-of-type(1) {
		font-size: 3rem;
		font-weight: bold;

		margin-bottom: 5px;
	}

	> div:nth-of-type(2) {
		font-size: 1.1rem;
		color: rgba(0, 0, 0, 0.8);

		margin-bottom: 30px;
	}

	> div:nth-of-type(3) {
		display: flex;
		justify-content: space-between;
		align-items: center;

		> div:nth-of-type(1) {
			font-size: 1.5rem;
			font-weight: bold;
		}

		> div:nth-of-type(2) {
			font-size: 1.1rem;
		}
	}
`

const QRcss = css`
	margin-left: 20px;
`

const parentCSS = css`
	overflow: scroll;

	::-webkit-scrollbar {
		width: 0px;
		height: 0px;
		background-color: transparent;
	}
`

const footerCSS = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	overflow: hidden;

	> div:nth-of-type(1) {
		> div:nth-of-type(1) {
			font-size: 1.6rem;
		}
		> div:nth-of-type(2) {
			font-size: 0.95rem;
			word-wrap: break-word;
			/* max-height: 100px;
			overflow-y: auto; */
		}
		width: 70%; /* 좌측 div에 고정된 크기 지정 */
	}

	> div:nth-of-type(2) {
		display: flex;
		width: 30%; /* 우측 div에 고정된 크기 지정 */
	}
`

export default product
