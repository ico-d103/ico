import { css } from "@emotion/react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import { useRouter } from "next/router"
import React, { useState, useEffect, useRef } from "react"
import { getTeacherProductDetailAPI } from "@/api/common/shop/getTeacherProductDetailAPI"
import { getTeacherProductDetailType } from "@/types/teacher/apiReturnTypes"
import useCompHandler from "@/hooks/useCompHandler"
import Modal from "@/components/common/Modal/Modal"
import QRScannerModal from "@/components/student/Shop/QRScanner/QRScannerModal"
import { useQuery } from "@tanstack/react-query"
import ContentWrapper from "@/components/student/common/ContentWrapper/ContentWrapper"
import SwipeableGallery from "@/components/common/SwipeableGallery/SwipeableGallery"
import useGetNation from "@/hooks/useGetNation"
import Button from "@/components/common/Button/Button"
import { useAtom } from "jotai"
import { isNavigating } from "@/store/store"

function product() {
	const router = useRouter()
	const { pid } = router.query
	const [openComp, closeComp, compState] = useCompHandler()
	const [isNavigatingAtom, setIsNavigatingAtom] = useAtom(isNavigating)
	const [term, setTerm] = useState<0 | 1>(0)

	const productId = typeof pid === "string" ? pid : ""

	const [nation] = useGetNation()

	const galleryWrapperRef = useRef<HTMLDivElement>(null)

	const { data } = useQuery<getTeacherProductDetailType>(["product", productId], () =>
		getTeacherProductDetailAPI({ pid: productId }),
	)

	const imageElements = data?.images.map((img) => (
		<img
			key={img}
			alt="Image"
			src={img}
			css={css`
				width: 100%;
				height: auto;
			`}
		/>
	))

	return (
		<div>
			<PageHeader title={"상점"} />

			<div ref={galleryWrapperRef} css={parentCSS}>
				{imageElements && 
				<SwipeableGallery parentRef={galleryWrapperRef} content={[...imageElements]} />
			}
			</div>

			<div css={shopWrapperCSS}>
				<ContentWrapper
					cssProps={css`
						min-height: 48vh;
					`}
				>
					<div css={shopUpperCSS}>
						{data?.title}
						{data && (
							<div>
								상품이&nbsp;<div style={{ fontWeight: "700" }}>{data?.count - data?.sold}개</div>&nbsp;남았어요!
							</div>
						)}
					</div>

					<div css={priceTagCSS}>
						{data?.amount}
						{nation.currency}
					</div>

					<hr />
					<div css={dateCSS}>{data?.date}</div>
					<div css={detailCSS}>{data?.detail}</div>
				</ContentWrapper>
			</div>

			{/* <button onClick={openComp}>qr 카메라</button> */}

			{isNavigatingAtom === false && (
				<div css={navBarOverlayCSS}>
					<Button
						text={"이 상품 구매할래요!"}
						fontSize={`var(--student-h3)`}
						width={"100%"}
						theme={"mobileSoft"}
						onClick={() => {
							setTerm(() => 0)
							openComp()
						}}
					/>
				</div>
			)}

			{data && (
				<Modal
					compState={compState}
					closeComp={closeComp}
					transition={"scale"}
					content={
						<QRScannerModal compState={compState} type={data.rental ? "ico_rental" : "ico_purchase"} id={data.id} />
					}
				/>
			)}
		</div>
	)
}

const shopWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;
`

const parentCSS = css`
	/* display: grid;
	grid-template-columns: 1; */
	width: 100%;
	height: 30vh;

	::-webkit-scrollbar {
		width: 0px;
		height: 0px;
		background-color: transparent;
	}
`

const shopUpperCSS = css`
	display: flex;
	justify-content: space-between;

	font-size: var(--student-h1);
	font-weight: 700;

	div:nth-child(1) {
		display: flex;
		color: var(--teacher-gray-color);

		font-size: var(--student-h4);
	}
`

const priceTagCSS = css`
	color: red;

	margin-top: 5px;
	font-weight: 700;
	font-size: var(--student-h2);
`

const dateCSS = css``

const detailCSS = css`
	margin-top: 5px;
`

const navBarOverlayCSS = css`
	width: 100%;
	height: 64px;
	background-color: var(--student-main-color);
	position: fixed;
	bottom: 0;
	z-index: 99999999;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0px 16px;

	opacity: 0%;
	animation: fadein 0.2s ease-in forwards;

	@keyframes fadein {
		from {
			opacity: 0%;
		}

		to {
			opacity: 100%;
		}
	}
`
export default product
