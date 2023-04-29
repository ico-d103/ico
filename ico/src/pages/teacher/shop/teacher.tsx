import { css } from "@emotion/react"
import Card from "@/components/common/Card/Card"
import Button from "@/components/common/Button/Button"
import { useRouter } from "next/router"

function teacher() {
	const router = useRouter()

	const registProduct = () => {
		router.push("/teacher/shop/create")
	}

	const cardData = [
		{
			id: 1,
			image: "https://placehold.it/250x250",
			name: "헤드셋",
			number: 1,
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
			approved: false,
		},
		{
			id: 5,
			image: "https://placehold.it/250x250",
			name: "헤드셋",
			number: 1,
			price: 4000,
			writer: "서재건",
			date: "2023년 4월 27일",
			approved: true,
		},
		{
			id: 6,
			image: "https://placehold.it/250x250",
			name: "헤드셋",
			number: 1,
			price: 4000,
			writer: "서재건",
			date: "2023년 4월 27일",
			approved: true,
		},
	]

	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<div css={titleCSS}>교사 상품</div>
				<Button
					text={"상품 등록"}
					fontSize={`var(--teacher-h4)`}
					width={"120px"}
					theme={"normal"}
					onClick={registProduct}
				/>
			</div>
			<div css={subTitleCSS}>교사가 등록한 상품을 조회하고 등록, 수정 삭제할 수 있습니다.</div>
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
const subTitleCSS = css`
	font-size: 0.95rem;
	margin-top: 12px;
`

const cardWrapperCSS = css`
	margin-top: 30px;

	display: grid;
	place-items: center;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	grid-column-gap: 20px;
	grid-row-gap: 30px;
`

export default teacher
