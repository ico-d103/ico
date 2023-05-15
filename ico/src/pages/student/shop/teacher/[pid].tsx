import { css } from "@emotion/react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import { useRouter } from "next/router"
import React, { useState, useEffect, useRef } from "react"
import { getTeacherProductDetailAPI } from "@/api/common/shop/getTeacherProductDetailAPI"
import { getTeacherProductDetailType } from "@/types/teacher/apiReturnTypes"
import { useQuery } from "@tanstack/react-query"
import ContentWrapper from "@/components/student/common/ContentWrapper/ContentWrapper"

function product() {
	const router = useRouter()
	const { pid } = router.query

	const productId = typeof pid === "string" ? pid : ""

	const { data } = useQuery<getTeacherProductDetailType>(["product", productId], () =>
		getTeacherProductDetailAPI({ pid: productId }),
	)

	return (
		<div>
			<PageHeader title={"상점"} />

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
