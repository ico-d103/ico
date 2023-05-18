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
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"
import useNavigate from "@/hooks/useNavigate"
import useMediaQuery from "@/hooks/useMediaQuery"

function index() {
	const router = useRouter()
	const navigate = useNavigate()
	const isMobile = useMediaQuery("(max-width: 768px")

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
		navigate("/student/shop/create", "bottomToTop")
	}

	return (
		<div css={mainWrapperCSS}>
			<PageHeader title={"상점"} addComp={<TabMenu menus={ShopTabMenus()} selected={1} />} />
			<div css={wrapperCSS}>
				<div css={contentWrapperCSS}>
					<div style={{ fontSize: "0.95rem", fontWeight: "500" }}>내 물건을 팔고 싶다면?</div>
					<Button
						text={"판매 신청서 작성하기"}
						fontSize={`var(--teacher-h5)`}
						width={"150px"}
						height={"30px"}
						theme={"mobileSoft"}
						onClick={createProduct}
					/>
				</div>
			</div>
			{/* 화면 넓을때 상품 없음 알림 중앙 정렬 안되서 빼놨음 */}
			{cardData?.length === 0 && (
				<div css={noneWrapperCSS}>
					<UseAnimations animation={alertCircle} size={200} strokeColor={"rgba(0,0,0,0.4)"} />
					<h3>등록된 상품이 없어요</h3>
				</div>
			)}
			<div css={cardWrapperCSS({ isMobile })}>
				{cardData?.length !== 0 && (
					<>
						{cardData?.map((card) => (
							<Card
								id={card.id}
								key={`shop-student-${card.id}`}
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
	padding-bottom: 16px;
	flex: 1;
	display: flex;
	flex-direction: column;
`

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
	padding: 20px;
	flex: 1;
	justify-content: space-between;
	align-items: center;
	display: flex;

	> div {
		font-size: 0.95rem;
	}
`
const cardWrapperCSS = ({ isMobile }: { isMobile: boolean | null }) => {
	return css`
		/* margin-top: 15px;

	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(45vw, 1fr));

	place-items: center;

	grid-row-gap: 10px; */

	margin-top: ${isMobile ? "16px" : "32px"};
		display: grid;
		grid-template-columns: ${isMobile
			? "repeat(auto-fill, minmax(45vw, 1fr))"
			: "repeat(auto-fill, minmax(260px, 1fr))"};
		place-items: center;
		grid-row-gap: ${isMobile ? "16px" : "32px"};
	`
}

const noneWrapperCSS = css`
	width: 100%;
	/* height: 100%; */
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 1;
	> h3 {
		font-size: 1.1rem;
	}
`

export default index
