import { css } from "@emotion/react"
import { useRouter } from "next/router"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import Card from "@/components/common/Card/Card"
import Button from "@/components/common/Button/Button"
import { useQuery } from "@tanstack/react-query"
import { getStudentProductsAPI } from "@/api/common/shop/getStudentProductsAPI"
import { getStudentProductsType } from "@/types/teacher/apiReturnTypes"
import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { ShopTabMenus } from "@/components/student/Shop/ShopTabMenus"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"
import useNavigate from "@/hooks/useNavigate"
import useMediaQuery from "@/hooks/useMediaQuery"
import Shop from "@/components/student/Shop/Shop"
import React from 'react'

function index() {
	const navigate = useNavigate()
	const studentProductsQueries = useQuery<getStudentProductsType[]>(["studentProducts"], getStudentProductsAPI)

	// const createProduct = () => {
	// 	navigate("/student/shop/create", "bottomToTop")
	// }

	return (
		<div css={mainWrapperCSS}>
			<PageHeader title={"상점"} addComp={<TabMenu menus={ShopTabMenus()} selected={1} />} />
			
			<Shop query={studentProductsQueries} uploadPageUrl={"/student/shop/create"}/>
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
