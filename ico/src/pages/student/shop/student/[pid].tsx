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
import React, { useState } from "react"
import ShowQR from "@/components/common/ShowQR/ShowQR"

function product() {
	const router = useRouter()
	const { pid } = router.query
	const [openShowQR, closeShowQR, showQRState] = useCompHandler()
	const [openScanQR, closeScanQR, scanQRState] = useCompHandler()
	const [time, setTime] = useState<number>(0)
	const productId = typeof pid === "string" ? pid : ""

	const { data } = useQuery<getStudentProductDetailType>(["product", productId], () =>
	getStudentProductDetailAPI({ pid: productId }),
	)

	const generateTime = () => {
		setTime(() => new Date().getTime())
	}


	return (
		<div>
			{data && (
				<React.Fragment>
<Modal
					compState={showQRState}
					closeComp={closeShowQR}
					transition={"scale"}
					content={
						<ShowQR type={'ico_purchase'} id={data.id} time={time} />
						// <QRScannerModal compState={compState} type={data.rental ? "ico_rental" : "ico_purchase"} id={data.id} />
					}
				/>

				<Modal
					compState={scanQRState}
					closeComp={closeScanQR}
					transition={"scale"}
					content={
						<QRScannerModal compState={scanQRState} type={"ico_purchase"} id={data.id} />
					}
				/>
				</React.Fragment>
				
			)}
			<PageHeader title={"상점"} />

			<button onClick={openScanQR}>qr 카메라</button>
			<button onClick={() => {generateTime(); openShowQR();}}>qr 코드</button>
		</div>
	)
}

const testCSS = css``

export default product
