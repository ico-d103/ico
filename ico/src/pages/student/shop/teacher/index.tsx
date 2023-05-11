import { css } from "@emotion/react"

import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import Card from "@/components/common/Card/Card"

import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { ShopTabMenus } from "@/components/student/Shop/ShopTabMenus"

import { useQuery } from "@tanstack/react-query"
import { getTeacherProductsAPI } from "@/api/common/shop/getTeacherProductsAPI"
import { getTeacherProductsType } from "@/types/teacher/apiReturnTypes"

function index() {
	const {
		data: cardData,
		isError,
		isLoading,
		isFetching,
		error,
		isSuccess,
		refetch,
	} = useQuery<getTeacherProductsType[]>(["teacherProducts"], getTeacherProductsAPI)

	return (
		<>
			<PageHeader title={"상점"} addComp={<TabMenu menus={ShopTabMenus()} selected={0} />} />
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

const cardWrapperCSS = css`
	margin-top: 15px;

	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(45vw, 1fr));

	place-items: center;

	grid-row-gap: 10px;
`

export default index
