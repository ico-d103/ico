import { css } from "@emotion/react"
import Card from "@/components/common/Card/Card"

function teacher() {
	const cardData = [
		{
			id: 1,
			image: "https://placehold.it/250x250",
			name: "헤드셋",
			number: 1,
			price: 4000,
			writer: "서재건",
			date: "2023년 4월 27일",
		},
		{
			id: 2,
			image: "https://placehold.it/250x250",
			name: "물통",
			number: 1,
			price: 2000,
			writer: "서재건",
			date: "2023년 4월 27일",
		},
		{
			id: 3,
			image: "https://placehold.it/250x250",
			name: "마우스패드",
			number: 1,
			price: 1000,
			writer: "서재건",
			date: "2023년 4월 27일",
		},
		{
			id: 4,
			image: "https://placehold.it/250x250",
			name: "키보드",
			number: 3,
			price: 4000,
			writer: "서재건",
			date: "2023년 4월 27일",
		},
		{
			id: 5,
			image: "https://placehold.it/250x250",
			name: "헤드셋",
			number: 1,
			price: 4000,
			writer: "서재건",
			date: "2023년 4월 27일",
		},
		{
			id: 6,
			image: "https://placehold.it/250x250",
			name: "헤드셋",
			number: 1,
			price: 4000,
			writer: "서재건",
			date: "2023년 4월 27일",
		},
	]

	return (
		<div css={wrapperCSS}>
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
					/>
				))}
			</div>
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex: 1;
	flex-direction: column;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`

const cardWrapperCSS = css`
	display: flex;
	flex-wrap: wrap;
	gap: 30px;
	justify-content: center;
`

export default teacher
