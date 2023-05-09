import React from "react"
import { css } from "@emotion/react"
import { getHomeCouponType } from "@/types/student/apiReturnTypes"
import { postHomeCouponAPI } from "@/api/student/home/postHomeCouponAPI"
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from '@tanstack/react-query';
// import { CLASS_ACCEPT, CLASS_DENY } from "../ClassIcons"

type HomeCouponListItemPropsType = getHomeCouponType

const SEND_ICON = (
	<svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M12 20V4M12 4L6 10M12 4L18 10"
			stroke="#0057FF"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)

function HomeCouponListItem({id, title, count, assigned }: HomeCouponListItemPropsType) {
	const updateMutation = useMutation((idx: number) => postHomeCouponAPI({idx}));
	const queryClient = useQueryClient();
	const assignOnClickHandler = () => {
		updateMutation.mutate(id, {
			onSuccess: formData => {
			  return queryClient.invalidateQueries(["student", "homeCouponList"]); // 'return' wait for invalidate
			}})
	}

	const waitingLabel = <div css={sSizeFontCSS}>승인을 기다리는 중이에요!</div>
	return (
		<div css={wrapperCSS}>
			<div css={leftWrapperCSS}>
				<div css={leftCSS}>
					<div
						css={[
							lSizeFontCSS,
							css`
								color: ${assigned && "rgba(0, 0, 0, 0.4)"};
							`,
						]}
					>
						{title} {count}장
					</div>
					{assigned && waitingLabel}
				</div>
				{/* <div css={rightCSS}>
					<h4>{mock.student}</h4>
					<div>
						<div></div>
						<h5>{mock.date}</h5>
					</div>
				</div> */}
			</div>
			<div css={rightWrapperCSS}>
				<div css={circleCSS}></div>
				<div css={buttonWrapperCSS}>
					<button onClick={assignOnClickHandler}>{SEND_ICON}</button>
				</div>

				{/* <button>{CLASS_ACCEPT}</button>
				<button>{CLASS_DENY}</button> */}
			</div>
		</div>
	)
}

const wrapperCSS = css`
	width: 100%;
	height: 150px;
	background: var(--common-back-color-2);
	border: 1px solid rgba(0, 0, 0, 0.1);
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	border-radius: 10px;

	display: flex;
	flex-direction: row;
	overflow: hidden;
	margin: 16px 0px;
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
	gap: 6px;
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
	/* gap: 60px; */
	position: relative;
`

const circleCSS = css`
	position: absolute;
	width: 38px;
	height: 38px;
	border-radius: 100%;
	background-color: var(--common-back-color-2);
	right: 60px;
`

const lSizeFontCSS = css`
	font-size: var(--student-h2);
	font-weight: 700;
	/* line-height: 120%; */
`

const sSizeFontCSS = css`
	font-size: var(--student-h4);
	color: rgba(0, 0, 0, 0.4);
`

const buttonWrapperCSS = css`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: end;
	padding: 16px;

	> button {
		background-color: var(--common-back-color-2);
		border: 1px solid var(--teacher-gray2-color);
		width: 38px;
		height: 38px;
		border-radius: 100%;
		transition: all 0.2s linear;
		display: flex;
		justify-content: center;
		align-items: center;

		:hover {
			transform: scale(1.2);
		}
	}
`

export default HomeCouponListItem
