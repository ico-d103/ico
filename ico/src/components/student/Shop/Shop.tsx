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
import React, { useState } from "react"
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
		<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M7.50021 21H27.2038C28.723 21 29.4826 21 30.0874 20.7168C30.6201 20.4672 31.0677 20.0666 31.3745 19.5647C31.7228 18.995 31.8067 18.24 31.9744 16.7301L32.8519 8.83252C32.9032 8.37132 32.9288 8.14073 32.8547 7.96224C32.7895 7.80548 32.6731 7.67546 32.5245 7.59341C32.3553 7.5 32.1233 7.5 31.6593 7.5H6.75021M3 3H4.87266C5.26959 3 5.46806 3 5.62333 3.07549C5.76003 3.14194 5.8733 3.24836 5.94816 3.38064C6.03318 3.5309 6.04556 3.72899 6.07032 4.12515L7.42968 25.8749C7.45444 26.271 7.46682 26.4691 7.55184 26.6194C7.6267 26.7516 7.73997 26.8581 7.87667 26.9245C8.03194 27 8.23041 27 8.62734 27H28.5M11.25 32.25H11.265M24.75 32.25H24.765M12 32.25C12 32.6642 11.6642 33 11.25 33C10.8358 33 10.5 32.6642 10.5 32.25C10.5 31.8358 10.8358 31.5 11.25 31.5C11.6642 31.5 12 31.8358 12 32.25ZM25.5 32.25C25.5 32.6642 25.1642 33 24.75 33C24.3358 33 24 32.6642 24 32.25C24 31.8358 24.3358 31.5 24.75 31.5C25.1642 31.5 25.5 31.8358 25.5 32.25Z"
				stroke="black"
				strokeWidth="3"
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
			{seller && showQRModal(<ShowQR seller={seller} time={time} />)}
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
