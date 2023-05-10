import React from "react"
import HomeCouponListItem from "./HomeCouponListItem"
import { getHomeCouponType } from "@/types/student/apiReturnTypes"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"
import { css } from "@emotion/react"


type HomeCouponListProps = {
    couponList : getHomeCouponType[]
}

function HomeCouponList({couponList}: HomeCouponListProps) {
    const renderList = couponList.map((el) => {
        return <HomeCouponListItem {...el} />
    })

	return (
    <div>
        {couponList.length === 0 ? (
				<div css={alertWrapperCSS}>
					<UseAnimations animation={alertCircle} size={128} />
					<div css={labelCSS}>쿠폰이 없어요!</div>
				</div>
			) : (
				renderList
			)}
  
    </div>
        )
}

const labelCSS = css`
	margin-top: 12px;
	font-size: 24px;
	font-weight: 500;
	color: rgba(0, 0, 0, 0.6);
`

const alertWrapperCSS = css`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 16px;
`

export default HomeCouponList
