import { css } from "@emotion/react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import { useRouter } from "next/router"
import React, { useState, useEffect, useRef } from "react"
import { getTeacherProductDetailAPI } from "@/api/common/shop/getTeacherProductDetailAPI"
import { getTeacherProductDetailType } from "@/types/teacher/apiReturnTypes"

function product() {
	const router = useRouter()
	const { pid } = router.query

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
			<PageHeader title={"상점"} />
			{product?.title}
		</div>
	)
}

export default product
