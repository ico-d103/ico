import { css } from "@emotion/react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import Card from "@/components/common/Card/Card"
import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { ShopTabMenus } from "@/components/student/Shop/ShopTabMenus"
import { UseQueryResult, useQuery } from "@tanstack/react-query"
import { getTeacherProductsAPI } from "@/api/common/shop/getTeacherProductsAPI"
import { getStudentProductsType, getTeacherProductsType } from "@/types/teacher/apiReturnTypes"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"
import useMediaQuery from "@/hooks/useMediaQuery"
import { useRouter } from "next/router"
import React, {useState} from "react"
import Button from "@/components/common/Button/Button"
import useNavigate from "@/hooks/useNavigate"
import QueryAdapter from "@/components/common/Adapter/QueryAdapter"
import ShowQR from "@/components/common/ShowQR/ShowQR"
import useModal from "@/components/common/Modal/useModal"

type ShopPropsType = {
	uploadPageUrl?: string
	query: UseQueryResult<getTeacherProductsType[], unknown>
	seller?: string
}

const shoppingBasketWrapperCSS = css`
	cursor: pointer;
`

export const SHOPPING_BASKET = (
	<div css={shoppingBasketWrapperCSS}>
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M5.00014 14H18.1359C19.1487 14 19.6551 14 20.0582 13.8112C20.4134 13.6448 20.7118 13.3777 20.9163 13.0432C21.1485 12.6633 21.2044 12.16 21.3163 11.1534L21.9013 5.88835C21.9355 5.58088 21.9525 5.42715 21.9031 5.30816C21.8597 5.20366 21.7821 5.11697 21.683 5.06228C21.5702 5 21.4155 5 21.1062 5H4.50014M2 2H3.24844C3.51306 2 3.64537 2 3.74889 2.05032C3.84002 2.09463 3.91554 2.16557 3.96544 2.25376C4.02212 2.35394 4.03037 2.48599 4.04688 2.7501L4.95312 17.2499C4.96963 17.514 4.97788 17.6461 5.03456 17.7462C5.08446 17.8344 5.15998 17.9054 5.25111 17.9497C5.35463 18 5.48694 18 5.75156 18H19M7.5 21.5H7.51M16.5 21.5H16.51M8 21.5C8 21.7761 7.77614 22 7.5 22C7.22386 22 7 21.7761 7 21.5C7 21.2239 7.22386 21 7.5 21C7.77614 21 8 21.2239 8 21.5ZM17 21.5C17 21.7761 16.7761 22 16.5 22C16.2239 22 16 21.7761 16 21.5C16 21.2239 16.2239 21 16.5 21C16.7761 21 17 21.2239 17 21.5Z"
				stroke="black"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	</div>
)

function Shop({ uploadPageUrl, query, seller }: ShopPropsType) {
	const isMobile = useMediaQuery("(max-width: 768px")
	const router = useRouter()
	const navigate = useNavigate()
	const showQRModal = useModal()
	const [time, setTime] = useState<number>(0)
	const generateTime = () => {
		setTime(() => new Date().getTime())
	}

	const renderUpload = uploadPageUrl && seller && (
		<div css={wrapperCSS}>
			<div css={contentWrapperCSS}>
			<Button
					text={"QR 코드 생성"}
					fontSize={`var(--teacher-h5)`}
					width={"120px"}
					height={"36px"}
					theme={"mobileSoft"}
					onClick={() => {
						generateTime()
						showQRModal.open()
					}}
				/>
				<Button
					text={"판매글 작성"}
					fontSize={`var(--teacher-h5)`}
					width={"120px"}
					height={"36px"}
					theme={"mobileSoft"}
					onClick={() => {
						navigate(uploadPageUrl)
					}}
				/>
			</div>
		</div>
	)

	return (
		<React.Fragment>
			{renderUpload}
			{seller && showQRModal(
						<ShowQR seller={seller} time={time} />
			)}
			<QueryAdapter query={query} isEmpty={!!(query.data && query.data.length === 0)}>
				<div css={cardWrapperCSS({ isMobile })}>
					{query.data?.length !== 0 && (
						<>
							{query.data?.map((card) => (
								<Card
									baseUrl={router.asPath}
									key={card.id}
									id={card.id}
									title={card.title}
									amount={card.amount}
									image={card.images[0]}
									count={card.count}
									sold={card.sold}
									name={card.seller}
									date={card.date}
									assigned={true}
								/>
							))}
						</>
					)}
				</div>
			</QueryAdapter>
		</React.Fragment>
	)
}

const mainWrapperCSS = css`
	padding-bottom: 16px;
	flex: 1;
	display: flex;
	flex-direction: column;
`

const cardWrapperCSS = ({ isMobile }: { isMobile: boolean | null }) => {
	return css`
		/* margin-top: 15px; */
		/* display: grid;
	grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
	place-items: center;
	grid-row-gap: 10px; */

		margin-top: 16px;
		display: grid;
		grid-template-columns: ${isMobile
			? "repeat(auto-fill, minmax(45vw, 1fr))"
			: "repeat(auto-fill, minmax(260px, 1fr))"};
		place-items: center;
		grid-row-gap: ${isMobile ? "16px" : "32px"};
	`
}

const noneWrapperCSS = css`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 1;

	> h3 {
		font-size: 1.1rem;
	}
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



export default Shop
