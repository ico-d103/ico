import { css } from "@emotion/react"
import { CLASS_ACCEPT, CLASS_DENY } from "../ClassIcons"
import { getCouponListType } from "@/types/teacher/apiReturnTypes"
import { postCouponAcceptAPI } from "@/api/teacher/class/postCouponAcceptAPI"
import { deleteCouponDenyAPI } from "@/api/teacher/class/deleteCouponDenyAPI"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

type CouponListItemPropsType = {
	coupon: getCouponListType
}

function CouponListItem({ coupon }: CouponListItemPropsType) {
	const noti = useNotification()
	const queryClient = useQueryClient()
	const postCouponAcceptMutation = useMutation((id: string) => postCouponAcceptAPI({ id }))
	const deleteCouponDenyMutation = useMutation((id: string) => deleteCouponDenyAPI({ id }))

	const acceptCouponHandler = () => {
		postCouponAcceptMutation.mutate(coupon.id, {
			onSuccess: () => {
				noti({
					content: <NotiTemplate type={"ok"} content={`쿠폰 사용을 승인했습니다.`} />,
					duration: 3000,
				})

				queryClient.invalidateQueries(["couponList"])
			},
			onError: () => {
				noti({
					content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
					duration: 3000,
				})
			},
		})
	}

	const denyCouponHandler = () => {
		deleteCouponDenyMutation.mutate(coupon.id, {
			onSuccess: () => {
				noti({
					content: <NotiTemplate type={"ok"} content={`쿠폰 사용을 반려했습니다.`} />,
					duration: 3000,
				})

				queryClient.invalidateQueries(["couponList"])
			},
			onError: () => {
				noti({
					content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
					duration: 3000,
				})
			},
		})
	}

	return (
		<div css={wrapperCSS}>
			<div css={leftWrapperCSS}>
				<div css={leftCSS}>
					<h3>{coupon.title}</h3>
				</div>
				<div css={rightCSS}>
					<h4>{coupon.name}</h4>
					<div>
						<div></div>
						<h5>{`${coupon.date.split(".")[0]}년 ${coupon.date.split(".")[1]}월 ${coupon.date.split(".")[2]}일`}</h5>
					</div>
				</div>
			</div>
			<div css={rightWrapperCSS}>
				<div></div>
				<button onClick={acceptCouponHandler}>{CLASS_ACCEPT}</button>
				<button onClick={denyCouponHandler}>{CLASS_DENY}</button>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	width: 300px;
	height: 170px;
	background: var(--common-back-color-2);
	border: 1px solid rgba(0, 0, 0, 0.1);
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	border-radius: 10px;

	display: flex;
	flex-direction: row;
	overflow: hidden;
`

const leftWrapperCSS = css`
	width: 270px;
	height: 100%;
	background-color: var(--common-back-color-2);
	padding: 25px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const leftCSS = css`
	display: flex;
	flex-direction: column;
	gap: 20px;

	> h3 {
		font-size: var(--teacher-h3);
		font-weight: bold;
	}
`

const rightCSS = css`
	display: flex;
	flex-direction: column;
	gap: 10px;

	> h4 {
		font-size: var(--teacher-h4);
		text-align: right;
	}

	> div {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: right;

		> div {
			width: 10px;
			height: 10px;
			background-color: var(--teacher-highlight-color);
			margin-right: 5px;
			border-radius: 100%;
		}

		> h5 {
			font-size: var(--teacher-h5);
		}
	}
`

const rightWrapperCSS = css`
	width: 80px;
	height: 100%;
	background-color: var(--teacher-coupon-color);

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 60px;
	position: relative;

	> div {
		position: absolute;
		width: 38px;
		height: 38px;
		border-radius: 100%;
		background-color: var(--common-back-color-2);
		right: 50px;
	}

	> button {
		background-color: var(--common-back-color-2);
		border: 1px solid var(--teacher-gray2-color);
		width: 38px;
		height: 38px;
		border-radius: 100%;
		transition: all 0.2s linear;

		:hover {
			transform: scale(1.2);
		}
	}
`

export default CouponListItem
