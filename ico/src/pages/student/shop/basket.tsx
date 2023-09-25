import useShopHandler from "@/components/student/Shop/useShopHandler"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import React, { useEffect, useState } from "react"
import { css } from "@emotion/react"
import ContentWrapper from "@/components/student/common/ContentWrapper/ContentWrapper"
import ShopBasket from "@/components/student/Shop/ShopBasket/ShopBasket"

function basket() {


	return (
		<div css={wrapperCSS}>
			<PageHeader title={"장바구니"} />

			<ShopBasket/>
		</div>
	)
}

const wrapperCSS = css`
	flex: 1;
	display: flex;
	flex-direction: column;
`

export default basket
