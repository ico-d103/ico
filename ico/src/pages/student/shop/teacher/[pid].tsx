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

function product() {
	const router = useRouter()
	const { pid } = router.query
	const [openComp, closeComp, compState] = useCompHandler()

	const productId = typeof pid === "string" ? pid : ""

	const { data } = useQuery<getTeacherProductDetailType>(["product", productId], () =>
		getTeacherProductDetailAPI({ pid: productId }),
	)

	return (
		<div>
			<Modal compState={compState} closeComp={closeComp} transition={"scale"} content={<QRScannerModal compState={compState} />} />
			<PageHeader title={"상점"} />

			<button onClick={openComp}>qr 카메라</button>



			<div css={shopWrapperCSS}>
				<ContentWrapper>{data?.amount}</ContentWrapper>
			</div>
		</div>
	)
}

const shopWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
`

export default product
