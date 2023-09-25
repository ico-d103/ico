import { css } from "@emotion/react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import Card from "@/components/common/Card/Card"
import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { ShopTabMenus } from "@/components/student/Shop/ShopTabMenus"
import { useQuery } from "@tanstack/react-query"
import { getTeacherProductsAPI } from "@/api/common/shop/getTeacherProductsAPI"
import { getTeacherProductsType } from "@/types/teacher/apiReturnTypes"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"
import useMediaQuery from "@/hooks/useMediaQuery"
import Shop from "@/components/student/Shop/Shop"
import React from 'react'

function index() {
	const teacherProductsQueries = useQuery<getTeacherProductsType[]>(["teacherProducts"], getTeacherProductsAPI)

	return (
		<div css={mainWrapperCSS}>
      <PageHeader title={"도매 상점"}/>
			<Shop query={teacherProductsQueries} uploadPageUrl={"/student/job/seller/create"} seller={"선생님"}/>
		</div>
	)
}

const mainWrapperCSS = css`
	padding-bottom: 16px;
	flex: 1;
	display: flex;
	flex-direction: column;
`

export default index