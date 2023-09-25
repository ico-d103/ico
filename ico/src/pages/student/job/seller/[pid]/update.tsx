import React, { useState, useEffect } from "react"
import ShopCreate from "@/components/student/Shop/ShopCreate/ShopCreate"
import { postStudentProductsAPI } from "@/api/student/shop/postStudentProductsAPI"
import { useRouter } from "next/router"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import { css } from "@emotion/react"
import { postTeacherProductsAPI } from "@/api/teacher/shop/postTeacherProductsAPI"
import useNavigate from "@/hooks/useNavigate"
import { useQueryClient } from "@tanstack/react-query"
import { getTeacherProductDetailType } from "@/types/teacher/apiReturnTypes"
import { getTeacherProductsAPI } from "@/api/common/shop/getTeacherProductsAPI"
import { getTeacherProductDetailAPI } from "@/api/common/shop/getTeacherProductDetailAPI"
import { putTeacherProductsAPI } from "@/api/teacher/shop/putTeacherProductsAPI"
import { putTeacherProductsImageAPI } from "@/api/teacher/shop/putTeacherProductsImageAPI"

function update() {
	const router = useRouter()
	const { pid } = router.query
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const [editContent, setEditContent] = useState<getTeacherProductDetailType>()

	useEffect(() => {
		if (String(pid)) {
			getTeacherProductDetailAPI({ pid: String(pid) })
				.then((res) => {
					setEditContent(() => res)
					console.log(res)
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}, [pid])

	const editHandler = ({
		id,
		body,
	}: {
		id: number
		body: {
			title: string
			amount: number
			detail: string
			count: number
			isCoupon: boolean
		}
	}) => {
		return putTeacherProductsAPI({ id, body }).catch((err) => {
			console.log(err)
      throw err
		})
	}

	const editImageHandler = ({ id, body }: { id: number; body: FormData }) => {
		return putTeacherProductsImageAPI({ id, body }).catch((err) => {
			console.log(err)
      throw err
		})
	}

	const ifSuccess = (res: any) => {
		queryClient.invalidateQueries(["teacherProducts"])
    queryClient.invalidateQueries(["student", "job", "seller", "detail", `${editContent?.id}`])
    navigate(`/student/job/seller/${editContent?.id}`)
		console.log(res)
	}

	return (
		<div css={mainWrapperCSS}>
			<PageHeader title={"도매 상점 수정"} />
			{editContent && (
				<ShopCreate
					edit={editContent}
					editSubmitHandler={editHandler}
					editImageSubmitHandler={editImageHandler}
					ifSuccess={ifSuccess}
				/>
			)}
		</div>
	)
}

const mainWrapperCSS = css`
	padding-bottom: 16px;
	flex: 1;
	display: flex;
	flex-direction: column;
`

export default update
