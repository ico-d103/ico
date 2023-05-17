import React, { useEffect, useRef, useState } from "react"
import { BrowserQRCodeReader, Result } from "@zxing/library"
import { NotFoundException } from "@zxing/library"
import { css } from "@emotion/react"
import UseAnimations from "react-useanimations"
import loading from "react-useanimations/lib/loading"
import alertTriangle from "react-useanimations/lib/alertTriangle"
import useNavigate from "@/hooks/useNavigate"
import { postRentalTeacherProductsAPI } from "@/api/student/shop/postRentalTeacherProductsAPI"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import { postPurchaseStudentProductsAPI } from "@/api/student/shop/postPurchaseStudentProductsAPI"
import { useRouter } from "next/router"

type QRScannerProps = {
	closeComp: any
	type: "ico_rental" | "ico_purchase"
	id: number
}
const QRScanner = ({ closeComp, type, id }: QRScannerProps) => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isError, setIsError] = useState<boolean>(false)
	const noti = useNotification()
	const router = useRouter()

	useEffect(() => {
		console.log(router)
	}, [])

	useEffect(() => {
		const codeReader = new BrowserQRCodeReader()

		const showCamera = async () => {
			if (videoRef.current) {
				try {
					const videoElement = videoRef.current

					const constraints: MediaStreamConstraints = {
						video: { facingMode: "environment" },
					}
					const stream = await navigator.mediaDevices.getUserMedia(constraints)

					videoElement.srcObject = stream
					videoElement.play()

					codeReader
						.decodeOnceFromVideoDevice(undefined, videoElement)
						.then((res) => handleQrCodeScan(res))
						.catch(console.error)
				} catch (error) {
					setIsError(() => true)
				}
			}
		}

		const handleQrCodeScan = (result: Result | null, error?: any) => {
			if (result) {
				const bodyData = result.getText().split(",")
				if (bodyData[0] !== type || Number(bodyData[1]) !== id) {
					noti({ content: <NotiTemplate type={"alert"} content={"다른 상품의 QR코드예요!"} />, duration: 5000 })
					closeComp && closeComp()
					return
				}
				if (bodyData[0] === "ico_rental") {
					postRentalTeacherProductsAPI({ body: { id: Number(bodyData[1]), unixTime: Number(bodyData[2]) } })
						.then((res) => {
							noti({ content: <NotiTemplate type={"ok"} content={"물건을 빌렸어요!"} />, duration: 5000 })
							closeComp && closeComp()
						})
						.catch((error) => {
							if (error.response.data.code === "621") {
								noti({
									content: <NotiTemplate type={"alert"} content={"QR 코드의 유효기간이 지났어요!"} />,
									duration: 5000,
								})
								closeComp && closeComp()
							}
							if (error.response.data.code === "616") {
								noti({
									content: <NotiTemplate type={"alert"} content={"남은 물건이 없어요!"} />,
									duration: 5000,
								})
								closeComp && closeComp()
							}
						})
				}


				if (bodyData[0] === "ico_purchase") {
					postPurchaseStudentProductsAPI({ body: { id: Number(bodyData[1]), unixTime: Number(bodyData[2]) } })
						.then((res) => {
							noti({ content: <NotiTemplate type={"ok"} content={"물건을 빌렸어요!"} />, duration: 5000 })
							closeComp && closeComp()
						})
						.catch((error) => {
							if (error.response.data.code === "621") {
								noti({
									content: <NotiTemplate type={"alert"} content={"QR 코드의 유효기간이 지났어요!"} />,
									duration: 5000,
								})
								closeComp && closeComp()
							}
							if (error.response.data.code === "616") {
								noti({
									content: <NotiTemplate type={"alert"} content={"남은 물건이 없어요!"} />,
									duration: 5000,
								})
								closeComp && closeComp()
							}
						})
				}

				console.log("QR code detected:", result.getText())
			}
			if (error && !(error instanceof NotFoundException)) {
				console.error(error)
				noti({ content: <NotiTemplate type={"alert"} content={"오류가 발생했습니다!"} />, duration: 5000 })
				closeComp && closeComp()
			}
		}

		showCamera().then(() => {
			setIsLoading(() => false)
		})

		return () => {
			codeReader.reset()
		}
	}, [])

	return (
		<div css={cameraWrapperCSS}>
			{isLoading && (
				<div css={loadingWrapperCSS}>
					<UseAnimations animation={loading} size={96} />
					<div
						css={css`
							margin-top: 16px;
							font-size: var(--student-h1);
							font-weight: 700;
						`}
					>
						카메라 준비중...
					</div>
				</div>
			)}

			{isError && (
				<div css={loadingWrapperCSS}>
					<UseAnimations animation={alertTriangle} size={96} />
					<div
						css={css`
							margin-top: 16px;
							font-size: var(--student-h1);
							font-weight: 700;
						`}
					>
						오류가 발생하였습니다.
					</div>
				</div>
			)}
			{!isLoading && <div css={gradientCSS} />}
			<video ref={videoRef} css={videoCSS} />
		</div>
	)
}

const cameraWrapperCSS = css`
	position: relative;
`

const loadingWrapperCSS = css`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
`

const videoCSS = css`
	/* border-radius: 10px; */
	width: 100%;
	margin-bottom: 24px;
	/* height: 70vh; */
`

const gradientCSS = css`
	width: 100%;
	height: 100%;
	position: absolute;
	/* background-color: red; */
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, #ffffff 90%);
`

export default QRScanner
