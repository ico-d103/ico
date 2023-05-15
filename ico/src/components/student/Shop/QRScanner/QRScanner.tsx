import React, { useEffect, useRef, useState } from "react"
import { BrowserQRCodeReader, Result } from "@zxing/library"
import { NotFoundException } from "@zxing/library"
import { css } from "@emotion/react"
import UseAnimations from "react-useanimations"
import loading from "react-useanimations/lib/loading"
import alertTriangle from "react-useanimations/lib/alertTriangle"
import useNavigate from "@/hooks/useNavigate"

const QRScanner: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isError, setIsError] = useState<boolean>(false)

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
				console.log("QR code detected:", result.getText())
			}
			if (error && !(error instanceof NotFoundException)) {
				console.error(error)
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
