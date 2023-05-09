import React from "react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import ContentWrapper from "@/components/student/common/ContentWrapper/ContentWrapper"

import { css } from "@emotion/react"
import HomeCouponList from "@/components/student/Home/Coupon/HomeCouponList"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getHomeCouponAPI } from "@/api/student/home/getHomeCouponAPI"
import { getHomeCouponType } from "@/types/student/apiReturnTypes"




function coupon() {

	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getHomeCouponType[]>(
		["student", "homeCouponList"],
		getHomeCouponAPI,
		// { staleTime: 200000 },
	)


	return (
		<div>
			<PageHeader title={"쿠폰함"} />
			<div css={couponWrapperCSS}>
				<ContentWrapper>
					{data && <HomeCouponList couponList={data}/>}
				</ContentWrapper>
			</div>
		</div>
	)
}

const couponWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const lSizeFontCSS = css`
    font-size: var(--student-h1);
    font-weight: 700;
    line-height: 150%;

`

const sSizeFontCSS = css`
    font-size: var(--student-h4);
    color: rgba(0, 0, 0, 0.6);
`

export default coupon