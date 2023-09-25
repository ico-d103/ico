import { css } from "@emotion/react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"

import Image from "next/image"
import useCompHandler from "@/hooks/useCompHandler"
import QRScannerModal from "@/components/student/Shop/QRScanner/QRScannerModal"
import Modal from "@/components/common/Modal/Modal"
import { getStudentProductDetailAPI } from "@/api/common/shop/getStudentProductDetailAPI"
import { getStudentProductDetailType } from "@/types/teacher/apiReturnTypes"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import React, { useState, useRef } from "react"
import ShowQR from "@/components/common/ShowQR/ShowQR"
import useGetNation from "@/hooks/useGetNation"
import ContentWrapper from "@/components/student/common/ContentWrapper/ContentWrapper"
import SwipeableGallery from "@/components/common/SwipeableGalleryLegacy/SwipeableGallery"
import Button from "@/components/common/Button/Button"
import { useAtom } from "jotai"
import { isNavigating } from "@/store/store"
import useModal from "@/components/common/Modal/useModal"

function product() {
	const router = useRouter()
	const { pid } = router.query
	// const [openShowQR, closeShowQR, showQRState] = useCompHandler()
	// const [openScanQR, closeScanQR, scanQRState] = useCompHandler()
	const showQRModal = useModal()
	const scanQRModal = useModal()
	const [time, setTime] = useState<number>(0)
	const [isNavigatingAtom, setIsNavigatingAtom] = useAtom(isNavigating)
	const [term, setTerm] = useState<0 | 1>(0)
	const [openComp, closeComp, compState] = useCompHandler()

	const productId = typeof pid === "string" ? pid : ""

	const [nation] = useGetNation()

	const galleryWrapperRef = useRef<HTMLDivElement>(null)

	const { data } = useQuery<getStudentProductDetailType>(["product", productId], () =>
		getStudentProductDetailAPI({ pid: productId }),
	)

	console.log(data)

	console.log(data)
	const generateTime = () => {
		setTime(() => new Date().getTime())
	}

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
		<div css={wrapperCSS}>
			{data && (
				<React.Fragment>
					{/* <Modal
						compState={showQRState}
						closeComp={closeShowQR}
						transition={"scale"}
						content={
							<ShowQR type={"ico_purchase"} id={data.id} time={time} />
							// <QRScannerModal compState={compState} type={data.rental ? "ico_rental" : "ico_purchase"} id={data.id} />
						}
					/> */}
					{/* {showQRModal(
						<ShowQR type={"ico_purchase"} id={data.id} time={time} />
					)} */}

					{/* <Modal
						compState={scanQRState}
						closeComp={closeScanQR}
						transition={"scale"}
						content={<QRScannerModal compState={scanQRState} type={"ico_purchase"} id={data.id} />}
					/> */}
					{/* {scanQRModal(
						<QRScannerModal compState={scanQRModal.state} type={"ico_purchase"} id={data.id} />
					)} */}
				</React.Fragment>
			)}
			<PageHeader title={"상점"} />

			<div ref={galleryWrapperRef} css={parentCSS}>
				{imageElements && <SwipeableGallery parentRef={galleryWrapperRef} content={[...imageElements]} />}
			</div>

			<div css={shopWrapperCSS}>
				<div css={shopUpperCSS}>
					{data?.title}
					{data && (
						<div
							css={css`
								font-weight: 500;
							`}
						>
							상품이&nbsp;<div style={{ fontWeight: "700" }}>{data?.count - data?.sold}개</div>&nbsp;남았어요!
						</div>
					)}
				</div>

				<div css={priceTagCSS}>
					{data?.amount}&nbsp;
					{nation.currency}
				</div>

				<div
					css={css`
						width: 100%;
						height: 1px;
						border-bottom: 1px solid rgba(0, 0, 0, 0.1);
						margin: 8px 0px;
					`}
				/>
				<div css={dateCSS}>{data?.date}</div>
				<div css={detailCSS}>{data?.detail}</div>
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

			{/* 구매자라는 로직 추가 해야 함*/}
			{isNavigatingAtom === false && data?.assigned === true && data.seller === false && (
				<div css={navBarOverlayCSS}>
					<Button
						text={"이 상품 구매할래요!"}
						fontSize={`var(--student-h3)`}
						width={"100%"}
						theme={"mobileSoft"}
						onClick={scanQRModal.open}
					/>
				</div>
			)}

			{isNavigatingAtom === false && data?.assigned === true && data.seller === true && (
				<div css={navBarOverlayCSS}>
					<Button
						text={"내 상품을 팔거에요!"}
						fontSize={`var(--student-h3)`}
						width={"100%"}
						theme={"mobileSoft"}
						onClick={() => {
							generateTime()
							showQRModal.open()
						}}
					/>
				</div>
			)}
		</div>
	)
}

const wrapperCSS = css`
	/* margin-bottom: 60px; */
	flex: 1;
	display: flex;
	flex-direction: column;
`

const shopWrapperCSS = css`
	/* display: flex;
	flex-direction: column;
	align-items: center; */
	margin-top: 14px;
	flex: 1;
	background-color: white;
	padding: 16px;
`

const parentCSS = css`
	/* display: grid;
	grid-template-columns: 1; */
	width: 100%;
	height: 40vh;

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

	div:nth-of-type(1) {
		display: flex;
		color: var(--teacher-gray-color);

		font-size: var(--student-h4);
	}
`

const priceTagCSS = css`
	color: #cb1400;

	margin-top: 10px;
	font-weight: 500;
	font-size: var(--student-h2);
`

const dateCSS = css`
	font-size: var(--student-h4);
	color: rgba(0, 0, 0, 0.6);

	margin-bottom: 16px;
`

const detailCSS = css`
	margin-top: 5px;
`

const navBarOverlayCSS = css`
	/* width: 100%; */
	width: var(--student-full-width);
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
