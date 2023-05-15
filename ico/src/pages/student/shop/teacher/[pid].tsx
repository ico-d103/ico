import { css } from "@emotion/react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import { useRouter } from "next/router"
import React, { useState, useEffect, useRef } from "react"
import { getTeacherProductDetailAPI } from "@/api/common/shop/getTeacherProductDetailAPI"
import { getTeacherProductDetailType } from "@/types/teacher/apiReturnTypes"
import useCompHandler from "@/hooks/useCompHandler"
import Modal from "@/components/common/Modal/Modal"
import QRScannerModal from "@/components/student/Shop/QRScanner/QRScannerModal"

function product() {
	const router = useRouter()
	const { pid } = router.query
	const [openComp, closeComp, compState] = useCompHandler()

	const [product, setProduct] = useState<getTeacherProductDetailType>({
		id: 0,
		title: "",
		amount: 0,
		images: [],
		count: 0,
		sold: 0,
		date: "",
		rental: true,
		detail: "",
	})

	useEffect(() => {
		if (typeof pid === "string") {
			getTeacherProductDetailAPI({ pid: pid })
				.then((res) => {
					setProduct(res)
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}, [pid])

	return (
		<div>
			<Modal compState={compState} closeComp={closeComp} transition={"scale"} content={<QRScannerModal />} />
			<PageHeader title={"상점"} />
			<button onClick={openComp}>qr 카메라</button>
			{product?.title}
		</div>
	)
}

export default product
