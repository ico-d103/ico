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
import React from 'react'
import Button from "@/components/common/Button/Button"
import useNavigate from "@/hooks/useNavigate"

type ShopPropsType = {
  uploadPageUrl?: string
  queries: UseQueryResult<getTeacherProductsType[], unknown> | UseQueryResult<getStudentProductsType[], unknown>
}
function Shop({uploadPageUrl, queries}: ShopPropsType) {
	const {
		data: cardData,
		isError,
		isLoading,
		isFetching,
		error,
		isSuccess,
		refetch,
	} = useQuery<getTeacherProductsType[]>(["teacherProducts"], getTeacherProductsAPI)

	const isMobile = useMediaQuery("(max-width: 768px")
  const router = useRouter()
  const navigate = useNavigate()

  const renderUpload = uploadPageUrl && (
    <div css={wrapperCSS}>
				<div css={contentWrapperCSS}>
					<div style={{ fontSize: "0.95rem", fontWeight: "500" }}>판매할 물건을 등록해 보아요.</div>
					<Button
						text={"판매글 작성하기"}
						fontSize={`var(--teacher-h5)`}
						width={"150px"}
						height={"30px"}
						theme={"mobileSoft"}
						onClick={() => {navigate(uploadPageUrl)}}
					/>
				</div>
			</div>
  )

	return (
		<React.Fragment>
			{renderUpload}
			{queries.data?.length === 0 && (
				<div css={noneWrapperCSS}>
					<UseAnimations animation={alertCircle} size={200} strokeColor={"rgba(0,0,0,0.4)"} />
					<h3>등록된 상품이 없어요</h3>
				</div>
			)}
			<div css={cardWrapperCSS({isMobile})}>
				{queries.data?.length !== 0 && (
					<>
						{queries.data?.map((card) => (
							<Card
                baseUrl={router.asPath}
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
		</React.Fragment>
	)
}

const mainWrapperCSS = css`
	padding-bottom: 16px;
	flex: 1;
	display: flex;
	flex-direction: column;
`

const cardWrapperCSS = ({isMobile}: {isMobile: boolean | null}) => {

	return css`
	/* margin-top: 15px; */
	/* display: grid;
	grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
	place-items: center;
	grid-row-gap: 10px; */

	margin-top: ${isMobile ? "0px" : "16px"};
	display: grid;
	grid-template-columns: ${isMobile ? 'repeat(auto-fill, minmax(45vw, 1fr))' : 'repeat(auto-fill, minmax(260px, 1fr))'};
	place-items: center;
	grid-row-gap: ${isMobile ? '16px' : '32px'};
	
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
