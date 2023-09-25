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
import { SHOPPING_BASKET } from "@/components/student/Shop/Shop"
import useNavigate from "@/hooks/useNavigate"


function index() {
	const teacherProductsQueries = useQuery<getTeacherProductsType[]>(["teacherProducts"], getTeacherProductsAPI)
	const navigate = useNavigate()

	return (
		<div css={mainWrapperCSS}>
			<PageHeader title={"상점"} addComp={<TabMenu menus={ShopTabMenus()} selected={0}  />} rightButton={<div onClick={() => navigate('/student/shop/basket')}>{SHOPPING_BASKET}</div>} />
			<Shop query={teacherProductsQueries}/>
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
