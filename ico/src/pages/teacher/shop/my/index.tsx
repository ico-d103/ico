import { css } from "@emotion/react"
import Card from "@/components/common/Card/Card"
import Button from "@/components/common/Button/Button"
import { useRouter } from "next/router"

import { useQuery } from "@tanstack/react-query"
import { getTeacherProductsAPI } from "@/api/common/shop/getTeacherProductsAPI"
import { getTeacherProductsType } from "@/types/teacher/apiReturnTypes"

function teacher() {
	const router = useRouter()

	const {
		data: cardData,
		isError,
		isLoading,
		isFetching,
		error,
		isSuccess,
		refetch,
	} = useQuery<getTeacherProductsType[]>(["teacherProducts"], getTeacherProductsAPI)

	const createProduct = () => {
		router.push("/teacher/shop/create")
	}

	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<div css={titleCSS}>교사 상품</div>
				<Button
					text={"상품 등록"}
					fontSize={`var(--teacher-h4)`}
					width={"120px"}
					theme={"normal"}
					onClick={createProduct}
				/>
			</div>
			<div css={subTitleCSS}>교사가 등록한 상품을 조회하고 등록, 수정 삭제할 수 있습니다.</div>
			<div css={cardWrapperCSS}>
				{cardData?.map((card) => (
					<Card
						key={card.id}
						id={card.id}
						title={card.title}
						amount={card.amount}
						image={card.images[0]}
						count={card.count}
						sold={card.sold}
						name={card?.name}
						date={card.date}
						assigned={card?.assigned}
					/>
				))}
			</div>
		</div>
	)
}

const wrapperCSS = css`
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
