import { css } from "@emotion/react"
import { useRouter } from "next/router"

import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import Card from "@/components/common/Card/Card"
import Button from "@/components/common/Button/Button"

import { useQuery } from "@tanstack/react-query"
import { getStudentProductsAPI } from "@/api/common/shop/getStudentProductsAPI"
import { getStudentProductsType } from "@/types/teacher/apiReturnTypes"

import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { ShopTabMenus } from "@/components/student/Shop/ShopTabMenus"

function index() {
	const router = useRouter()

	const {
		data: cardData,
		isError,
		isLoading,
		isFetching,
		error,
		isSuccess,
		refetch,
	} = useQuery<getStudentProductsType[]>(["studentProducts"], getStudentProductsAPI)

	const createProduct = () => {
		router.push("/student/shop/create")
	}

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
				{cardData?.map((card) => (
					<Card
						key={card.id}
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
