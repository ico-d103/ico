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
import { postPurchaseTeacherProductsAPI } from "@/api/student/shop/postPurchaseTeacherProductsAPI"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import ModalContent from "@/components/common/Modal/ModalContent"
import ConfirmModal from "@/components/student/Shop/Modal/ConfirmModal"
import useNavigate from "@/hooks/useNavigate"
import useModal from "@/components/common/Modal/useModal"

const APPLY_ICON = (
	<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M24.9993 29V17M18.9992 23H30.9993M24.9993 40C34.3881 40 41.9992 32.3888 41.9992 23C41.9992 13.6112 34.3881 6 24.9993 6C15.6104 6 7.99925 13.6112 7.99925 23C7.99925 24.9 8.31094 26.7272 8.88599 28.4332C9.10239 29.0752 9.21059 29.3962 9.2301 29.6429C9.24938 29.8864 9.23481 30.0571 9.17456 30.2939C9.11354 30.5336 8.97884 30.783 8.70944 31.2816L5.43812 37.3367C4.9715 38.2004 4.73819 38.6323 4.79041 38.9655C4.83589 39.2558 5.00674 39.5115 5.2576 39.6645C5.5456 39.8402 6.03385 39.7897 7.01033 39.6887L17.2524 38.63C17.5625 38.598 17.7176 38.5819 17.859 38.5873C17.998 38.5927 18.0961 38.6057 18.2317 38.637C18.3696 38.6687 18.5429 38.7355 18.8896 38.8691C20.7857 39.5996 22.8457 40 24.9993 40Z"
			stroke="black"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

function product() {
	const router = useRouter()
	const { pid } = router.query
	// const [openComp, closeComp, compState] = useCompHandler()
	// const [openConfirm, closeConfirm, confirmState] = useCompHandler()
	const confirmModal = useModal()
	const qrScannerModal = useModal()
	const [isNavigatingAtom, setIsNavigatingAtom] = useAtom(isNavigating)
	const [term, setTerm] = useState<0 | 1>(0)
	const noti = useNotification()
	const navigate = useNavigate()

	const productId = typeof pid === "string" ? pid : ""

	const [nation] = useGetNation()

	const galleryWrapperRef = useRef<HTMLDivElement>(null)

	const { data } = useQuery<getTeacherProductDetailType>(["product", productId], () =>
		getTeacherProductDetailAPI({ pid: productId }),
	)

	// const deniedProposal = () => {
	// 	deleteDeniedStudentProposalAPI({ pid: productId }).then((res) => {
	// 		router.push("/teacher/shop/student")
	// 	})
	// }

	const purchaseProduct = () => {
		postPurchaseTeacherProductsAPI({ pid: productId })
			.then((res) => {
				noti({
					content: <NotiTemplate type={"ok"} content="물건을 구매했어요!" />,
					width: "300px",
					height: "120px",
					duration: 3000,
				})
				navigate(`/student/shop/teacher/purchased/${productId}`, "bottomToTop")
				// closeConfirm()
				confirmModal.close()
			})
			.catch((err) => {
				noti({
					content: <NotiTemplate type={"alert"} content="물건을 구매하지 못했어요!" />,
					width: "300px",
					height: "120px",
					duration: 3000,
				})
				// closeConfirm()
				confirmModal.close()
			})
	}

	console.log(data)

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
		<React.Fragment>
			{/* <Modal
				content={
					<ModalContent
						width={"300px"}
						title={"상품 구매"}
						titleSize={"var(--student-h1)"}
						icon={APPLY_ICON}
						content={<ConfirmModal closeComp={closeConfirm} fetchFunction={purchaseProduct} />}
						forChild={true}
					/>
				}
				compState={confirmState}
				closeComp={closeConfirm}
				transition={"scale"}
			/> */}
			{confirmModal(
				<ModalContent
						width={"300px"}
						title={"상품 구매"}
						titleSize={"var(--student-h1)"}
						icon={APPLY_ICON}
						content={<ConfirmModal closeComp={confirmModal.close} fetchFunction={purchaseProduct} />}
						forChild={true}
					/>
		
			
				
			)}

			<div css={wrapperCSS}>
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

				{/* rental이 false : 구매 상품이므로 QR 스캔할 카메라가 필요하지 않다.. */}

				{isNavigatingAtom === false && data?.rental === false && (
					<div css={navBarOverlayCSS}>
						<Button
							text={"이 상품 구매할래요!"}
							fontSize={`var(--student-h3)`}
							width={"100%"}
							theme={"mobileSoft"}
							onClick={confirmModal.open}
						/>
					</div>
				)}

				{/* rental이 true : 대여 상품이므로 QR 스캔할 카메라가 반드시 필요하다. */}

				{isNavigatingAtom === false && data?.rental === true && (
					<div css={navBarOverlayCSS}>
						<Button
							text={"이 상품 구매할래요!"}
							fontSize={`var(--student-h3)`}
							width={"100%"}
							theme={"mobileSoft"}
							onClick={() => {
								setTerm(() => 0)
								// openComp()
								qrScannerModal.open()
							}}
						/>
					</div>
				)}

				{/* {data && (
					<Modal
						compState={compState}
						closeComp={closeComp}
						transition={"scale"}
						content={
							<QRScannerModal compState={compState} type={data.rental ? "ico_rental" : "ico_purchase"} id={data.id} />
						}
					/>
				)} */}
				{data && qrScannerModal(
					<QRScannerModal compState={qrScannerModal.state} type={data.rental ? "ico_rental" : "ico_purchase"} id={data.id} />
				)}
			</div>
		</React.Fragment>
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
