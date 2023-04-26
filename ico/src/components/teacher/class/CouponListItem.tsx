import React from "react"
import { css } from "@emotion/react"

type CouponListItemPropsType = {
	mock: {
		id: number
		title: string
		money: number
		student: string
		date: string
	}
}

function CouponListItem({ mock }: CouponListItemPropsType) {
	return <div css={wrapper}></div>
}

const wrapper = css`
	width: 350px;
	height: 220px;
	background: var(--common-back-color-2);
	border: 1px solid rgba(0, 0, 0, 0.1);
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
`

export default CouponListItem
