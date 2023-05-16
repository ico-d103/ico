import { css } from "@emotion/react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import Card from "@/components/common/Card/Card"
import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { ShopTabMenus } from "@/components/student/Shop/ShopTabMenus"
import { useQuery } from "@tanstack/react-query"
import { getTeacherProductsAPI } from "@/api/common/shop/getTeacherProductsAPI"
import { getTeacherProductsType } from "@/types/teacher/apiReturnTypes"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"

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
		<div css={mainWrapperCSS}>
			<PageHeader title={"상점"} addComp={<TabMenu menus={ShopTabMenus()} selected={0} />} />
			<div css={cardWrapperCSS}>
				{cardData?.length === 0 ? (
					<div css={noneWrapperCSS}>
						<UseAnimations animation={alertCircle} size={200} strokeColor={"rgba(0,0,0,0.4)"} />
						<h3>등록된 상품이 없어요</h3>
					</div>
				) : (
					<>
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
					</>
				)}
			</div>
		</div>
	)
}

const mainWrapperCSS = css`
	padding-bottom: 30px;
`

const cardWrapperCSS = css`
	margin-top: 15px;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(45vw, 1fr));
	place-items: center;
	grid-row-gap: 10px;
`

const noneWrapperCSS = css`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	> h3 {
		font-size: 1.1rem;
	}
`

export default index
