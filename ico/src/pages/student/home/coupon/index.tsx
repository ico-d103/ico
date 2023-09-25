import React, {useEffect} from "react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import ContentWrapper from "@/components/student/common/ContentWrapper/ContentWrapper"

import { css } from "@emotion/react"
import HomeCouponList from "@/components/student/Home/Coupon/HomeCouponList"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getHomeCouponAPI } from "@/api/student/home/getHomeCouponAPI"
import { getHomeCouponType } from "@/types/student/apiReturnTypes"
import Loading from "@/components/student/common/Loading/Loading"
import QueryAdapter from "@/components/common/Adapter/QueryAdapter"




function coupon() {

	const couponQuery = useQuery<getHomeCouponType[]>(
		["student", "homeCouponList"],
		getHomeCouponAPI,
		// { staleTime: 200000 },
	)




	return (
		<div css={css`height: 100%; display: flex; flex-direction: column;`}>
			<PageHeader title={"쿠폰함"} />
			<div css={couponWrapperCSS}>
				<ContentWrapper cssProps={css`
						flex: 1;
						display: flex;
						flex-direction: column;
						
					`}>
					<QueryAdapter query={couponQuery} isEmpty={(couponQuery && couponQuery.data?.length === 0)} emptyLabel="쿠폰이 없어요!" fetchingLabel="쿠폰을 불러오는 중이에요!">
						{couponQuery.data && <HomeCouponList couponList={couponQuery.data}/>}
					</QueryAdapter>
				</ContentWrapper>
			</div>
		</div>
	)
}

export async function getServerSideProps() {
	return {
	  props: {},
	};
  }


const couponWrapperCSS = css`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
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
