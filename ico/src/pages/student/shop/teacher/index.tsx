import { css } from "@emotion/react"

import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import GovRuleTab from "@/components/student/Gov/Rule/GovRuleTab"
import Button from "@/components/common/Button/Button"
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
			<PageHeader title={"상점"} addComp={<GovRuleTab />} />
			<div css={wrapperCSS}>
				<div css={[contentWrapperCSS, spaceBetweenCSS]}>
					<div>나도 내 상품을 팔고 싶어요!</div>
					<Button
						text={"버튼"}
						fontSize={`var(--teacher-h5)`}
						width={"80px"}
						height={"30px"}
						theme={"mobileNormal"}
						onClick={() => {}}
					/>
				</div>
				<div css={cardWrapperCSS}>
					{cardData.map((card) => (
						<Card
							key={card.id}
							image={card.image}
							name={card.name}
							price={card.price}
							number={card.number}
							writer={card?.writer}
							date={card.date}
							approved={card.approved}
						/>
					))}
				</div>
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
	margin-bottom: 10px;

	width: 95%;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	box-sizing: border-box;
	padding: 30px;
`
const spaceBetweenCSS = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const cardWrapperCSS = css`
	margin-top: 30px;

	display: grid;
	place-items: center;
	grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
	grid-column-gap: 20px;
	grid-row-gap: 30px;
`

export default index
