import React from 'react'
import ShopCreate from '@/components/student/Shop/ShopCreate/ShopCreate'
import { postStudentProductsAPI } from '@/api/student/shop/postStudentProductsAPI'
import { useRouter } from 'next/router'
function create() {
	const router = useRouter()

	const submitHandler = (body: FormData) => {
		return postStudentProductsAPI({ body })
			.then((res) => {
				router.push("/student/shop/student")
				console.log(res)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<div>
			{/* <ShopCreate newSubmitHandler={submitHandler} /> */}
		</div>
	)
}

export default create