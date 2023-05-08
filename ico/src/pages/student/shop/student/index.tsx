import { css } from "@emotion/react"
import { useRouter } from "next/router"

import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import Card from "@/components/common/Card/Card"
import Button from "@/components/common/Button/Button"

import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { ShopTabMenus } from "@/components/student/Shop/ShopTabMenus"

function index() {
	const router = useRouter()

	const createProduct = () => {
		router.push("/student/shop/create")
	}

	const cardData = [
		{
			id: 1,
			image: "https://placehold.it/250x250",
			name: "헤드셋",
			number: 0,
			price: 4000,
			writer: "서재건",
			date: "2023년 4월 27일",
			approved: false,
		},
		{
			id: 2,
			image: "https://placehold.it/250x250",
			name: "물통",
			number: 1,
			price: 2000,
			writer: "서재건",
			date: "2023년 4월 27일",
			approved: false,
		},
		{
			id: 3,
			image: "https://placehold.it/250x250",
			name: "마우스패드",
			number: 1,
			price: 1000,
			writer: "서재건",
			date: "2023년 4월 27일",
			approved: false,
		},
		{
			id: 4,
			image: "https://placehold.it/250x250",
			name: "키보드",
			number: 3,
			price: 4000,
			writer: "서재건",
			date: "2023년 4월 27일",
			approved: true,
		},
	]

	return (
		<>
			<PageHeader title={"상점"} addComp={<TabMenu menus={ShopTabMenus()} selected={1} />} />
			<div css={wrapperCSS}>
				<div css={contentWrapperCSS}>
					<div>나도 내 상품을 팔고 싶어요!</div>
					<Button
						text={"판매 신청서 작성"}
						fontSize={`var(--teacher-h5)`}
						width={"125px"}
						height={"30px"}
						theme={"mobileNormal"}
						onClick={createProduct}
					/>
				</div>
			</div>

			<div css={cardWrapperCSS}>
				{cardData.map((card) => (
					<Card
						key={card.id}
						image={card.image}
						name={card.name}
						price={card.price}
						number={card.number}
						writer={card.writer}
						date={card.date}
						approved={card.approved}
					/>
				))}
			</div>
		</>
	)
}

const wrapperCSS = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const contentWrapperCSS = css`
	width: 95%;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	box-sizing: border-box;
	padding: 25px 20px;

	justify-content: space-between;
	align-items: center;
	display: flex;

	> div {
		font-size: 0.95rem;
	}
`

const cardWrapperCSS = css`
	margin-top: 15px;

	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(45vw, 1fr));

	place-items: center;

	grid-row-gap: 10px;
`

export default index
