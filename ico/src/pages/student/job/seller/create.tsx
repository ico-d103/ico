import React from 'react'
import ShopCreate from '@/components/student/Shop/ShopCreate/ShopCreate'
import { postStudentProductsAPI } from '@/api/student/shop/postStudentProductsAPI'
import { useRouter } from 'next/router'
import PageHeader from '@/components/student/layout/PageHeader/PageHeader'
import { css } from "@emotion/react"
import { postTeacherProductsAPI } from '@/api/teacher/shop/postTeacherProductsAPI'
import useNavigate from '@/hooks/useNavigate'
import { useQueryClient } from '@tanstack/react-query'

function create() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	
	const submitHandler = ({body}: {body: FormData}) => {
		return postTeacherProductsAPI({ body })
			.catch((err) => {
				console.log(err)
				throw err
			})
	}

	const ifSuccess = (res: any) => {
		queryClient.invalidateQueries(["teacherProducts"])
		navigate("/student/job/seller")
		console.log(res)
	}

	return (
		<div css={mainWrapperCSS}>
      <PageHeader title={"도매 상점 등록"}/>
			<ShopCreate newSubmitHandler={submitHandler} ifSuccess={ifSuccess} />
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