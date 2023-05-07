import { css } from "@emotion/react"

import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import ShopTab from "@/components/student/Shop/ShopTab"
import Card from "@/components/common/Card/Card"

function index() {
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
			<PageHeader title={"상점"} addComp={<ShopTab />} />
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

const cardWrapperCSS = css`
	margin-top: 15px;

	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(45vw, 1fr));

	place-items: center;

	grid-row-gap: 10px;
`

export default index
