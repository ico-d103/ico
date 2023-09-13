import React from "react"
import HomeCouponListItem from "./HomeCouponListItem"
import { getHomeCouponType } from "@/types/student/apiReturnTypes"
import { css } from "@emotion/react"
import useMediaQuery from "@/hooks/useMediaQuery"



type HomeCouponListProps = {
	couponList: getHomeCouponType[]
}

function HomeCouponList({ couponList }: HomeCouponListProps) {
	const isMobile = useMediaQuery("(max-width: 420px")
	const renderList = couponList.map((el) => {
		return <HomeCouponListItem {...el} />
	})

	return <div css={wrapperCSS({ isMobile })}>{renderList}</div>
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
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 16px;
`

const wrapperCSS = ({ isMobile }: { isMobile: boolean | null }) => {
	return css`
		/* flex: 1;  */
		/* display: flex; */
		/* flex-direction: column; */
		/* margin-top: ${isMobile ? "0px" : "16px"}; */
		/* place-items: center; */

		display: grid;
		grid-template-columns: ${isMobile
			? "repeat(auto-fill, minmax(45vw, 1fr))"
			: "repeat(auto-fill, minmax(260px, 1fr))"};
		grid-row-gap: ${isMobile ? "16px" : "32px"};
		grid-column-gap: 32px;
	`
}

export default HomeCouponList
