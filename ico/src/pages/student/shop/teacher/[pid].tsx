import { css } from "@emotion/react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import { useRouter } from "next/router"

import Image from "next/image"

function product() {
	const router = useRouter()
	const { pid } = router.query	

	const product = {
		id: 1,
		image: "https://placehold.it/250x250",
		name: "헤드셋",
		number: 1,
		price: 4000,
		writer: "서재건",
		date: "2023년 4월 27일",
		approved: false,
		explanation: "상품에 대한 자세한 설명입니다.",
	}

	return (
		<div>
			<PageHeader title={"상점"} />
		</div>
	)
}

const testCSS = css``

export default product
