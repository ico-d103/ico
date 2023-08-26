import React from 'react'
import ShopCreate from '@/components/student/Shop/ShopCreate/ShopCreate'
import { postStudentProductsAPI } from '@/api/student/shop/postStudentProductsAPI'
import { useRouter } from 'next/router'
import PageHeader from '@/components/student/layout/PageHeader/PageHeader'
import { css } from "@emotion/react"

function create() {
	const router = useRouter()

	const submitHandler = (body: FormData) => {
		postStudentProductsAPI({ body })
			.then((res) => {
				router.push("/student/shop/student")
				console.log(res)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<div css={mainWrapperCSS}>
      <PageHeader title={"도매 상점 등록"}/>
			<ShopCreate submitHandler={submitHandler} />
		</div>
	)
}

const mainWrapperCSS = css`
	padding-bottom: 16px;
	flex: 1;
	display: flex;
	flex-direction: column;
`

export default create