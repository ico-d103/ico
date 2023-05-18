import { css } from "@emotion/react"
import CouponListItem from "./ClassCouponListItem"
import { getCouponListType } from "@/types/teacher/apiReturnTypes"

type CouponListPropsType = {
	list: getCouponListType[]
}

function CouponList({ list }: CouponListPropsType) {
	return (
		<div css={wrapper}>
			{list.map((coupon) => (
				<CouponListItem key={coupon.id} coupon={coupon} />
			))}
		</div>
	)
}

const wrapper = css`
	margin-top: 40px;
	display: grid;
	place-items: center;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	grid-column-gap: 20px;
	grid-row-gap: 40px;
`

export default CouponList
