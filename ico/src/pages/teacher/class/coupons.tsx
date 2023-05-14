import { css } from "@emotion/react"
import { CLASS_COUPON } from "@/components/teacher/Class/ClassIcons"
import CouponList from "@/components/teacher/Class/Coupon/ClassCouponList"
import { useQuery } from "@tanstack/react-query"
import { getCouponListAPI } from "@/api/teacher/class/getCouponListAPI"
import { getCouponListType } from "@/types/teacher/apiReturnTypes"

function coupons() {
	const { data } = useQuery<getCouponListType[]>(["couponList"], getCouponListAPI)

	return (
		<div css={wrapperCSS}>
			<h1>쿠폰</h1>
			<div css={titleCSS}>
				<div>{CLASS_COUPON}</div>
				<div>
					<b>{data?.length}개</b>의 쿠폰 사용 요청 목록이 있습니다.
				</div>
			</div>
			<CouponList list={data ? data : []} />
		</div>
	)
}

const wrapperCSS = css`
	flex: 1;
	display: flex;
	flex-direction: column;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;

	> h1 {
		font-size: var(--teacher-h1);
		font-weight: bold;
	}
`

const titleCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 30px;

	> div:nth-of-type(1) {
		margin-right: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	> div:nth-of-type(2) {
		font-size: var(--teacher-h2);

		> b {
			font-weight: bold;
			color: var(--teacher-main-color);
		}
	}
`

export default coupons
